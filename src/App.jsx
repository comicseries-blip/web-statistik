import { useEffect, useState, useCallback } from "react";
import Header from "./components/layout/Header.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Footer from "./components/layout/Footer.jsx";
import KpiCard from "./components/dashboard/KpiCard.jsx";
import PopulationChart from "./components/dashboard/PopulationChart.jsx";
import GrowthChart from "./components/dashboard/GrowthChart.jsx";
import GenderChart from "./components/dashboard/GenderChart.jsx";
import DensityMap from "./components/dashboard/DensityMap.jsx";
import DataTable from "./components/dashboard/DataTable.jsx";
import {
  kecamatanData,
  growthData,
  formatNumber,
  kotaName,
  dataYear,
} from "./data/population.js";
import "./App.css";

const today = new Date();
const dateLabel = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const sections = [
  { id: "top", label: "Ikhtisar" },
  { id: "populasi", label: "Populasi" },
  { id: "pertumbuhan", label: "Pertumbuhan" },
  { id: "komposisi", label: "Komposisi" },
  { id: "persebaran", label: "Persebaran" },
  { id: "tabel", label: "Tabel Data" },
];

export default function App() {
  const [selectedKec, setSelectedKec] = useState("all");
  const [activeSection, setActiveSection] = useState("top");
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 120;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(sections[i].id);
        return;
      }
    }
    setActiveSection("top");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const rows = selectedKec === "all"
    ? kecamatanData
    : kecamatanData.filter((d) => d.name === selectedKec);

  const totalPenduduk = rows.reduce((s, d) => s + d.laki + d.perempuan, 0);
  const totalLaki = rows.reduce((s, d) => s + d.laki, 0);
  const totalPerempuan = rows.reduce((s, d) => s + d.perempuan, 0);
  const kotaTotal = kecamatanData.reduce((s, d) => s + d.laki + d.perempuan, 0);
  const share = selectedKec === "all" ? null : ((totalPenduduk / kotaTotal) * 100).toFixed(1);
  const avgGrowth = kecamatanData.reduce((s, d) => s + d.growth, 0) / kecamatanData.length;

  return (
    <div className="app-shell">
      <Sidebar active={activeSection} />

      <div className="app-main">
        <Header
          dateLabel={dateLabel}
          kabupatenName={kotaName}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        />

        <main className="app-content">
          {/* ===== OVERVIEW SECTION ===== */}
          <section id="top" className="app-section">
            <div className="filter-bar">
              <label className="filter-label" htmlFor="kec-filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
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
                  <option key={d.name} value={d.name}>{d.name} — {d.kota}</option>
                ))}
              </select>
              {selectedKec !== "all" && (
                <span className="filter-hint">
                  {selectedKec}, {kecamatanData.find(d => d.name === selectedKec)?.kota} ({share}% dari total)
                </span>
              )}
            </div>

            <div className="kpi-grid">
              <KpiCard
                label="Total Penduduk"
                value={totalPenduduk}
                icon="users"
                color="var(--accent)"
                colorSoft="var(--accent-soft)"
                sub={share ? `${share}% dari total Jakarta` : `${kecamatanData.length} kecamatan · 5 kota administrasi`}
              />
              <KpiCard
                label="Laki-laki"
                value={totalLaki}
                icon="male"
                color="var(--male)"
                colorSoft="var(--male-soft)"
                sub={`${((totalLaki / totalPenduduk) * 100).toFixed(1)}% dari populasi ini`}
              />
              <KpiCard
                label="Perempuan"
                value={totalPerempuan}
                icon="female"
                color="var(--female)"
                colorSoft="var(--female-soft)"
                sub={`${((totalPerempuan / totalPenduduk) * 100).toFixed(1)}% dari populasi ini`}
              />
              <KpiCard
                label="Rata-rata Pertumbuhan"
                value={`${avgGrowth.toFixed(1)}%`}
                icon="growth"
                color="var(--growth)"
                colorSoft="var(--growth-soft)"
                sub="Tahunan, seluruh kecamatan"
              />
            </div>
          </section>

          {/* ===== POPULATION CHART ===== */}
          <section id="populasi" className="app-section">
            <div className="section-header">
              <div className="section-header-icon" style={{ background: "var(--male-soft)", color: "var(--male)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="12" width="4" height="8" rx="1" />
                  <rect x="10" y="8" width="4" height="12" rx="1" />
                  <rect x="17" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
              <div className="section-header-text">
                <div className="section-title">Populasi per Kecamatan</div>
                <div className="section-desc">Kecamatan terpilih ditampilkan penuh, yang lain diredupkan.</div>
              </div>
            </div>
            <div className="chart-card">
              <PopulationChart selected={selectedKec} data={kecamatanData} />
            </div>
          </section>

          {/* ===== GROWTH CHART ===== */}
          <section id="pertumbuhan" className="app-section">
            <div className="section-header">
              <div className="section-header-icon" style={{ background: "var(--growth-soft)", color: "var(--growth)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div className="section-header-text">
                <div className="section-title">Tren Pertumbuhan Penduduk</div>
                <div className="section-desc">Total seluruh kecamatan, 2019 sampai {dataYear}.</div>
              </div>
            </div>
            <div className="chart-card">
              <GrowthChart data={growthData} />
            </div>
          </section>

          {/* ===== GENDER COMPOSITION ===== */}
          <section id="komposisi" className="app-section">
            <div className="section-header">
              <div className="section-header-icon" style={{ background: "var(--female-soft)", color: "var(--female)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.15" />
                </svg>
              </div>
              <div className="section-header-text">
                <div className="section-title">Komposisi Jenis Kelamin</div>
                <div className="section-desc">Proporsi penduduk laki-laki dan perempuan terpilih.</div>
              </div>
            </div>
            <div className="chart-card">
              <GenderChart
                label="Total"
                laki={totalLaki}
                perempuan={totalPerempuan}
                total={totalPenduduk}
              />
            </div>
          </section>

          {/* ===== DENSITY MAP ===== */}
          <DensityMap
            data={kecamatanData}
            selected={selectedKec}
            onSelect={setSelectedKec}
            formatter={formatNumber}
          />

          {/* ===== DATA TABLE ===== */}
          <DataTable data={rows} formatter={formatNumber} selected={selectedKec} />

          <div className="footer-note">
            Sumber data riil: Dinas Kependudukan &amp; Pencatatan Sipil Provinsi DKI
            Jakarta (Data Kependudukan Bersih, Semester II {dataYear - 1}) dan BPS.
            Perbarui angka di <code>src/data/population.js</code> sesuai rilis terbaru.
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
