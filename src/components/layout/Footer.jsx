import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>Dashboard Statistik Kependudukan &middot; Sumber: Disdukcapil DKI Jakarta &amp; BPS</span>
      </div>
      <span className="footer-copy">&copy; {new Date().getFullYear()}</span>
    </footer>
  );
}
