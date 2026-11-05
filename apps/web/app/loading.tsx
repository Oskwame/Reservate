export default function Loading() {
  return (
    <div className="loading-shell" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>Loading…</span>
    </div>
  );
}
