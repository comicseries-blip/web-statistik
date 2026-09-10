import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = {
  ink: "#1C2B45",
  inkSoft: "#57647A",
  male: "#2E6F8E",
  female: "#A6543D",
  growth: "#4C8C6B",
  kec: "#7A5A2E",
  line: "#D8DEE3",
  bg: "#F4F6F5",
  surface: "#FFFFFF",
};

const kecamatanData = [
  { name: "Sukamaju Kota", laki: 24380, perempuan: 24895, luas: 12.4, growth: 1.8 },
  { name: "Sukamaju Barat", laki: 15210, perempuan: 15480, luas: 18.7, growth: 1.5 },
  { name: "Sukamaju Timur", laki: 13870, perempuan: 14025, luas: 21.3, growth: 1.3 },
  { name: "Cempaka Jaya", laki: 9840, perempuan: 9765, luas: 27.6, growth: 0.9 },
  { name: "Tanjung Harapan", laki: 11230, perempuan: 11490, luas: 34.1, growth: 1.1 },
  { name: "Mekar Sari", laki: 8460, perempuan: 8590, luas: 15.9, growth: 2.1 },
  { name: "Bukit Damai", laki: 7120, perempuan: 7040, luas: 41.2, growth: 0.7 },
  { name: "Wonorejo", laki: 10560, perempuan: 10715, luas: 19.8, growth: 1.6 },
];

const growthData = [
  { year: 2019, total: 181400 },
  { year: 2020, total: 184300 },
  { year: 2021, total: 187300 },
  { year: 2022, total: 190300 },
  { year: 2023, total: 193300 },
  { year: 2024, total: 196400 },
  { year: 2025, total: 199500 },
  { year: 2026, total: 202670 },
];

const fmt = (n) => Math.round(n).toLocaleString("id-ID");

function densityTier(d) {
  if (d > 2000) return "high";
  if (d >= 800) return "medium";
  return "low";
}

const tierStyle = {
  high: { bg: "#7A5A2E", text: "#FBF7EF", label: "Kepadatan tinggi" },
  medium: { bg: "#B99A5B", text: "#2A2115", label: "Kepadatan sedang" },
  low: { bg: "#E7D9B8", text: "#5B4A2A", label: "Kepadatan rendah" },
};

function KpiCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: COLORS.surface,
      borderLeft: `4px solid ${color}`,
      padding: "16px 18px",
      minWidth: 0,
    }}>
      <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "Georgia, 'Iowan Old Style', serif", fontSize: 30, color: COLORS.ink, lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12.5, color: COLORS.inkSoft, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

export default function PopulationDashboard() {
  const [selectedKec, setSelectedKec] = useState("all");

  const rows = selectedKec === "all"
    ? kecamatanData
    : kecamatanData.filter((d) => d.name === selectedKec);

  const totalPenduduk = rows.reduce((s, d) => s + d.laki + d.perempuan, 0);
  const totalLaki = rows.reduce((s, d) => s + d.laki, 0);
  const totalPerempuan = rows.reduce((s, d) => s + d.perempuan, 0);
  const kabupatenTotal = kecamatanData.reduce((s, d) => s + d.laki + d.perempuan, 0);
  const share = selectedKec === "all" ? null : ((totalPenduduk / kabupatenTotal) * 100).toFixed(1);

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: COLORS.bg,
      minHeight: "100%",
      color: COLORS.ink,
    }}>
      <style>{`
        .psd-select { font-family: inherit; font-size: 14px; padding: 8px 12px; border: 1px solid ${COLORS.line}; background: ${COLORS.surface}; color: ${COLORS.ink}; border-radius: 2px; }
        .psd-grid-kpi { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1px; background: ${COLORS.line}; }
        .psd-grid-charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px; margin-top: 24px; }
        .psd-chart-card { background: ${COLORS.surface}; border: 1px solid ${COLORS.line}; padding: 18px 20px 8px; }
        .psd-map-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
        .psd-tile { padding: 14px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.15s ease; }
        .psd-tile:hover { border-color: ${COLORS.ink}; }
        table.psd-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        table.psd-table th { text-align: left; padding: 10px 12px; border-bottom: 2px solid ${COLORS.ink}; font-weight: 600; color: ${COLORS.inkSoft}; }
        table.psd-table td { padding: 10px 12px; border-bottom: 1px solid ${COLORS.line}; }
        table.psd-table tr.selected td { background: #EFEAE0; }
      `}</style>

      <div style={{ background: COLORS.ink, color: "#F4F1E8", padding: "28px 28px 24px" }}>
        <div style={{ fontFamily: "Georgia, 'Iowan Old Style', serif", fontSize: 30 }}>
          Statistik Kependudukan
        </div>
        <div style={{ fontSize: 14, opacity: 0.75, marginTop: 6 }}>
          Kabupaten Sukamaju. Data ilustrasi untuk keperluan demo, per akhir 2026.
        </div>
      </div>

      <div style={{ padding: "20px 28px 40px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <label style={{ fontSize: 14, color: COLORS.inkSoft }} htmlFor="kec-filter">
            Filter kecamatan
          </label>
          <select
            id="kec-filter"
            className="psd-select"
            value={selectedKec}
            onChange={(e) => setSelectedKec(e.target.value)}
          >
            <option value="all">Semua kecamatan</option>
            {kecamatanData.map((d) => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="psd-grid-kpi">
          <KpiCard label="Total penduduk" value={fmt(totalPenduduk)} color={COLORS.ink}
            sub={share ? `${share}% dari total kabupaten` : `${kecamatanData.length} kecamatan`} />
          <KpiCard label="Laki-laki" value={fmt(totalLaki)} color={COLORS.male}
            sub={`${((totalLaki / totalPenduduk) * 100).toFixed(1)}% dari populasi ini`} />
          <KpiCard label="Perempuan" value={fmt(totalPerempuan)} color={COLORS.female}
            sub={`${((totalPerempuan / totalPenduduk) * 100).toFixed(1)}% dari populasi ini`} />
          <KpiCard label="Jumlah kecamatan" value={kecamatanData.length} color={COLORS.kec}
            sub="Struktur wilayah kabupaten" />
        </div>

        <div className="psd-grid-charts">
          <div className="psd-chart-card">
            <div style={{ fontSize: 15, marginBottom: 4 }}>Populasi per kecamatan</div>
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 }}>
              Kecamatan terpilih ditampilkan penuh, yang lain diredupkan.
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kecamatanData} margin={{ top: 4, right: 8, left: 0, bottom: 60 }}>
                <CartesianGrid stroke={COLORS.line} vertical={false} />
                <XAxis dataKey="name" angle={-35} textAnchor="end" height={80} interval={0} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => v.toLocaleString("id-ID")} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => v.toLocaleString("id-ID")} />
                <Legend wrapperStyle={{ fontSize: 12.5 }} />
                <Bar dataKey="laki" name="Laki-laki" fill={COLORS.male} radius={[3, 3, 0, 0]}>
                  {kecamatanData.map((d, i) => (
                    <Cell key={i} fillOpacity={selectedKec === "all" || selectedKec === d.name ? 1 : 0.25} />
                  ))}
                </Bar>
                <Bar dataKey="perempuan" name="Perempuan" fill={COLORS.female} radius={[3, 3, 0, 0]}>
                  {kecamatanData.map((d, i) => (
                    <Cell key={i} fillOpacity={selectedKec === "all" || selectedKec === d.name ? 1 : 0.25} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="psd-chart-card">
            <div style={{ fontSize: 15, marginBottom: 4 }}>Tren pertumbuhan penduduk</div>
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 }}>
              Total kabupaten, 2019 sampai 2026.
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData} margin={{ top: 4, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={COLORS.line} vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => v.toLocaleString("id-ID")} tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                <Tooltip formatter={(v) => v.toLocaleString("id-ID")} />
                <Line type="monotone" dataKey="total" name="Total penduduk" stroke={COLORS.growth} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Peta persebaran penduduk</div>
          <div style={{ fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 12 }}>
            Skema grid, bukan peta geografis. Warna menunjukkan kepadatan penduduk, klik untuk memfilter.
          </div>
          <div className="psd-map-grid">
            {kecamatanData.map((d) => {
              const total = d.laki + d.perempuan;
              const kepadatan = Math.round(total / d.luas);
              const tier = tierStyle[densityTier(kepadatan)];
              const isSelected = selectedKec === d.name;
              return (
                <div
                  key={d.name}
                  className="psd-tile"
                  onClick={() => setSelectedKec(isSelected ? "all" : d.name)}
                  title={`${d.name}: ${fmt(total)} jiwa, kepadatan ${fmt(kepadatan)} jiwa per km2`}
                  style={{
                    background: tier.bg,
                    color: tier.text,
                    borderColor: isSelected ? COLORS.ink : "transparent",
                  }}
                >
                  <div style={{ fontSize: 13, marginBottom: 4 }}>{d.name}</div>
                  <div style={{ fontFamily: "Georgia, 'Iowan Old Style', serif", fontSize: 18 }}>{fmt(total)}</div>
                  <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{fmt(kepadatan)} jiwa/km2</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}>
            {Object.values(tierStyle).map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.inkSoft }}>
                <span style={{ width: 12, height: 12, background: t.bg, display: "inline-block" }} />
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 15, marginBottom: 12 }}>Data kecamatan</div>
          <div style={{ overflowX: "auto", background: COLORS.surface, border: `1px solid ${COLORS.line}` }}>
            <table className="psd-table">
              <thead>
                <tr>
                  <th>Kecamatan</th>
                  <th>Laki-laki</th>
                  <th>Perempuan</th>
                  <th>Total</th>
                  <th>Luas (km2)</th>
                  <th>Kepadatan (jiwa/km2)</th>
                  <th>Pertumbuhan</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const total = d.laki + d.perempuan;
                  const kepadatan = Math.round(total / d.luas);
                  return (
                    <tr key={d.name} className={selectedKec === d.name ? "selected" : ""}>
                      <td>{d.name}</td>
                      <td>{fmt(d.laki)}</td>
                      <td>{fmt(d.perempuan)}</td>
                      <td>{fmt(total)}</td>
                      <td>{d.luas.toFixed(1)}</td>
                      <td>{fmt(kepadatan)}</td>
                      <td style={{ color: COLORS.growth }}>+{d.growth.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 12.5, color: COLORS.inkSoft, borderTop: `1px solid ${COLORS.line}`, paddingTop: 14 }}>
          Data pada dashboard ini adalah contoh. Untuk versi produksi, ganti kedua array data
          (kecamatanData, growthData) dengan hasil query dari PostgreSQL melalui API route
          Next.js, misalnya lewat node-postgres atau Prisma.
        </div>
      </div>
    </div>
  );
}
