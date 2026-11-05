import { APP_NAME } from "@htms/config";
import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">{APP_NAME}</p>
        <h1>Reset your password</h1>
        <p className="auth-intro">Enter your work email and we will send reset instructions.</p>

        <ForgotPasswordForm />

        <p className="auth-note">
          Password reset is not wired yet.{" "}
          <Link className="text-link" href="/login">
            Back to sign in
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
