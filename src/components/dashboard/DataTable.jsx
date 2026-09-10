import "./DataTable.css";

export default function DataTable({ data, formatter, selected }) {
  return (
    <section id="tabel" className="app-section">
      <div className="section-header">
        <div className="section-header-icon" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </div>
        <div className="section-header-text">
          <div className="section-title">Data Kecamatan</div>
          <div className="section-desc">Data lengkap seluruh kecamatan yang tersedia.</div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kecamatan</th>
              <th>Kota Administrasi</th>
              <th>Laki-laki</th>
              <th>Perempuan</th>
              <th>Total</th>
              <th>Luas (km&sup2;)</th>
              <th>Kepadatan</th>
              <th>Pertumbuhan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              const total = d.laki + d.perempuan;
              const kepadatan = Math.round(total / d.luas);
              return (
                <tr
                  key={d.name}
                  className={selected === d.name ? "row-selected" : ""}
                >
                  <td className="cell-num">{i + 1}</td>
                  <td className="cell-name">{d.name}</td>
                  <td className="cell-kota">{d.kota}</td>
                  <td className="num">{formatter(d.laki)}</td>
                  <td className="num">{formatter(d.perempuan)}</td>
                  <td className="num cell-total">{formatter(total)}</td>
                  <td className="num">{d.luas.toFixed(1)}</td>
                  <td className="num">{formatter(kepadatan)}</td>
                  <td className="num cell-growth">
                    <span className="growth-badge">+{d.growth.toFixed(1)}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
