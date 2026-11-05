"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Unexpected error</p>
        <h1>Something went wrong</h1>
        <p className="auth-intro">{error.message || "An unexpected error occurred."}</p>
        <div className="auth-actions">
          <button className="button" type="button" onClick={reset}>
            Try again
          </button>
          <Link className="button button-secondary" href="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
