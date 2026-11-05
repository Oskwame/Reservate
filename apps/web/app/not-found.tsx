import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">404</p>
        <h1>That page is not on the floor plan</h1>
        <p className="auth-intro">The page you requested does not exist or has moved.</p>
        <div className="auth-actions">
          <Link className="button" href="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
