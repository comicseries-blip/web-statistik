import "./KpiCard.css";

const icons = {
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  male: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="14" r="5" />
      <line x1="21" y1="3" x2="13.5" y2="10.5" />
      <line x1="16" y1="3" x2="21" y2="3" />
      <line x1="21" y1="3" x2="21" y2="8" />
    </svg>
  ),
  female: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <line x1="12" y1="13" x2="12" y2="21" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  growth: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

export default function KpiCard({ label, value, sub, icon, color, colorSoft }) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: colorSoft, color }}>
          {icons[icon] || icons.users}
        </div>
        <div className="kpi-label">{label}</div>
      </div>
      <div className="kpi-value num" style={{ color }}>
        {typeof value === "number" ? value.toLocaleString("id-ID") : value}
      </div>
      {sub && <div className="kpi-sub">{sub}</div>}
      <div className="kpi-bar" style={{ background: colorSoft }}>
        <div className="kpi-bar-fill" style={{ background: color, width: "100%" }} />
      </div>
    </div>
  );
}
