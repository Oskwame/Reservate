"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <html lang="en">
      <body>
        <main className="auth-shell">
          <section className="auth-card">
            <p className="eyebrow">Fatal error</p>
            <h1>The application could not load</h1>
            <p className="auth-intro">{error.message || "An unexpected error occurred."}</p>
            <div className="auth-actions">
              <button className="button" type="button" onClick={reset}>
                Reload
              </button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
