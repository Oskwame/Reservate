export function ForgotPasswordForm() {
  return (
    <form className="auth-form">
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" placeholder="you@hotel.com" />
      </label>

      <button className="button button-block" type="button">
        Send reset link
      </button>
    </form>
  );
}
