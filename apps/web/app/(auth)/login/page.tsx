import { APP_NAME } from "@htms/config";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">{APP_NAME}</p>
        <h1>Welcome back</h1>
        <p className="auth-intro">Sign in to manage arrivals, rooms, and daily operations.</p>

        <LoginForm />

        <p className="auth-note">
          Authentication is scaffolded only.{" "}
          <Link className="text-link" href="/dashboard">
            Continue to the dashboard
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
