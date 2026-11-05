import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keyLength: number,
) => Promise<Buffer>;

const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_SCHEME = "scrypt";
const ENCRYPTION_ALGORITHM = "aes-256-gcm";
const ENCRYPTION_VERSION = "v1";
const IV_LENGTH = 12;
const MIN_SECRET_LENGTH = 16;

function assertSecret(secret: string): void {
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new RangeError(`Secret must be at least ${MIN_SECRET_LENGTH} characters`);
  }
}

function deriveEncryptionKey(secret: string): Buffer {
  assertSecret(secret);
  return createHash("sha256").update(secret, "utf8").digest();
}

export function randomToken(bytes = 32): string {
  if (!Number.isInteger(bytes) || bytes < 16) {
    throw new RangeError("Token size must be an integer of at least 16 bytes");
  }

  return randomBytes(bytes).toString("base64url");
}

export function hashToken(token: string, secret: string): string {
  assertSecret(secret);
  return createHmac("sha256", secret).update(token, "utf8").digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, PASSWORD_KEY_LENGTH);
  return `${PASSWORD_SCHEME}$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [scheme, salt, hash] = storedHash.split("$");

  if (scheme !== PASSWORD_SCHEME || !salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const derived = await scryptAsync(password, salt, PASSWORD_KEY_LENGTH);

  if (expected.length !== derived.length) {
    return false;
  }

  return timingSafeEqual(expected, derived);
}

export function encryptText(plaintext: string, secret: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, deriveEncryptionKey(secret), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    ENCRYPTION_VERSION,
    iv.toString("base64url"),
    tag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(".");
}

export function decryptText(payload: string, secret: string): string {
  const [version, ivText, tagText, ciphertextText] = payload.split(".");

  if (version !== ENCRYPTION_VERSION || !ivText || !tagText || !ciphertextText) {
    throw new Error("Invalid encrypted payload");
  }

  const decipher = createDecipheriv(
    ENCRYPTION_ALGORITHM,
    deriveEncryptionKey(secret),
    Buffer.from(ivText, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(tagText, "base64url"));

  try {
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(ciphertextText, "base64url")),
      decipher.final(),
    ]);

    return plaintext.toString("utf8");
  } catch {
    throw new Error("Unable to decrypt payload");
  }
}
