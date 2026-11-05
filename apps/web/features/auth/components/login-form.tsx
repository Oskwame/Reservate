import Link from "next/link";

export function LoginForm() {
  return (
    <form className="auth-form">
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" placeholder="you@hotel.com" />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </label>

      <div className="auth-meta">
        <label className="checkbox">
          <input type="checkbox" name="remember" />
          Remember me
        </label>
        <Link className="text-link" href="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <button className="button button-block" type="button">
        Sign in
      </button>
    </form>
  );
}
