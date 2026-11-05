export interface UploadFileInput {
  key: string;
  contentType: string;
  body: Uint8Array;
}

export interface StoredFile {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

export interface StorageProvider {
  name: string;
  upload(input: UploadFileInput): Promise<StoredFile>;
  remove(key: string): Promise<void>;
  healthCheck(): Promise<boolean>;
}
