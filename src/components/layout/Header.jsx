import ThemeToggle from "../ui/ThemeToggle.jsx";
import "./Header.css";

export default function Header({ dateLabel, kabupatenName, theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-title">Statistik Kependudukan</h1>
        <div className="header-divider" />
        <span className="header-subtitle">{kabupatenName}</span>
      </div>
      <div className="header-right">
        <div className="header-date-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{dateLabel}</span>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
