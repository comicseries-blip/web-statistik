import { densityTier } from "../../data/population.js";
import "./DensityMap.css";

const tierStyle = {
  high: {
    bg: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    bgSolid: "#2563eb",
    text: "#ffffff",
    label: "Kepadatan tinggi",
    badge: "Tinggi",
  },
  medium: {
    bg: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    bgSolid: "#3b82f6",
    text: "#ffffff",
    label: "Kepadatan sedang",
    badge: "Sedang",
  },
  low: {
    bg: "linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%)",
    bgSolid: "#93c5fd",
    text: "#1e3a5f",
    label: "Kepadatan rendah",
    badge: "Rendah",
  },
};

export default function DensityMap({ data, selected, onSelect, formatter }) {
  return (
    <section id="persebaran" className="app-section">
      <div className="section-header">
        <div className="section-header-icon" style={{ background: "var(--warn-soft)", color: "var(--warn)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="9" height="9" rx="1" />
            <rect x="13" y="2" width="9" height="9" rx="1" />
            <rect x="2" y="13" width="9" height="9" rx="1" />
            <rect x="13" y="13" width="9" height="9" rx="1" />
          </svg>
        </div>
        <div className="section-header-text">
          <div className="section-title">Persebaran Penduduk</div>
          <div className="section-desc">Skema grid, bukan peta geografis. Warna menunjukkan kepadatan penduduk, klik untuk memfilter.</div>
        </div>
      </div>

      <div className="density-grid">
        {data.map((d) => {
          const total = d.laki + d.perempuan;
          const kepadatan = Math.round(total / d.luas);
          const tier = tierStyle[densityTier(kepadatan)];
          const isSelected = selected === d.name;

          return (
            <button
              key={d.name}
              className={`density-tile ${isSelected ? "density-tile--active" : ""}`}
              onClick={() => onSelect(isSelected ? "all" : d.name)}
              title={`${d.name}: ${formatter(total)} jiwa, kepadatan ${formatter(kepadatan)} jiwa/km\u00B2`}
            >
              <div className="density-tile-bg" style={{ background: tier.bg }} />
              <div className="density-tile-content">
                <div className="density-tile-badge" style={{ background: tier.bgSolid, color: tier.text }}>
                  {tier.badge}
                </div>
                <div className="density-tile-name">{d.name}</div>
                <div className="density-tile-kota">{d.kota}</div>
                <div className="density-tile-value num">{formatter(total)}</div>
                <div className="density-tile-density">
                  {formatter(kepadatan)} jiwa/km&sup2;
                </div>
                <div className="density-tile-bar">
                  <div
                    className="density-tile-bar-fill"
                    style={{
                      width: `${Math.min((kepadatan / 4000) * 100, 100)}%`,
                      background: tier.bgSolid,
                    }}
                  />
                </div>
              </div>
              {isSelected && (
                <div className="density-tile-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="density-legend">
        {Object.values(tierStyle).map((t) => (
          <div key={t.label} className="density-legend-item">
            <span className="density-legend-swatch" style={{ background: t.bgSolid }} />
            {t.label}
          </div>
        ))}
      </div>
    </section>
  );
}
