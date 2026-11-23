export default function SavedBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="admin-banner" role="status">
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2l-1.5-1.5z" />
      </svg>
      Saved
    </div>
  );
}
