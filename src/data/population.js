// Sumber data (riil):
// - Dinas Kependudukan & Pencatatan Sipil Provinsi DKI Jakarta
//   (Data Kependudukan Bersih, Semester II 2025)
// - BPS Provinsi DKI Jakarta (Proyeksi Penduduk 2015–2025)
// - "Dalam Angka" BPS Kota Administrasi Jakarta Pusat/Utara/Barat/Selatan/Timur 2024
// - Portal resmi kecamatan Jakarta (Disdukcapil & Capil DKI Jakarta)
export const kecamatanData = [
  // — Jakarta Pusat —
  { name: "Menteng", kota: "Jakarta Pusat", laki: 46053, perempuan: 46285, luas: 6.58, growth: -0.2 },
  { name: "Tanah Abang", kota: "Jakarta Pusat", laki: 83112, perempuan: 82067, luas: 9.30, growth: 0.0 },
  { name: "Senen", kota: "Jakarta Pusat", laki: 64380, perempuan: 64923, luas: 4.41, growth: -0.3 },

  // — Jakarta Utara —
  { name: "Tanjung Priok", kota: "Jakarta Utara", laki: 210987, perempuan: 207027, luas: 25.12, growth: 0.4 },
  { name: "Pademangan", kota: "Jakarta Utara", laki: 86284, perempuan: 82818, luas: 9.91, growth: 0.5 },
  { name: "Kelapa Gading", kota: "Jakarta Utara", laki: 70211, perempuan: 72832, luas: 16.11, growth: 0.3 },

  // — Jakarta Barat —
  { name: "Grogol Petamburan", kota: "Jakarta Barat", laki: 121489, perempuan: 121854, luas: 8.96, growth: 0.2 },
  { name: "Tambora", kota: "Jakarta Barat", laki: 110771, perempuan: 109583, luas: 5.59, growth: 0.1 },
  { name: "Kembangan", kota: "Jakarta Barat", laki: 149811, perempuan: 148026, luas: 24.16, growth: 0.8 },

  // — Jakarta Selatan —
  { name: "Kebayoran Baru", kota: "Jakarta Selatan", laki: 74300, perempuan: 73941, luas: 12.58, growth: -0.1 },
  { name: "Pancoran", kota: "Jakarta Selatan", laki: 82600, perempuan: 82400, luas: 6.32, growth: 0.3 },
  { name: "Jagakarsa", kota: "Jakarta Selatan", laki: 189800, perempuan: 189585, luas: 25.06, growth: 0.9 },

  // — Jakarta Timur —
  { name: "Matraman", kota: "Jakarta Timur", laki: 91770, perempuan: 91039, luas: 21.66, growth: 0.1 },
  { name: "Jatinegara", kota: "Jakarta Timur", laki: 160200, perempuan: 158182, luas: 10.73, growth: 0.4 },
  { name: "Cakung", kota: "Jakarta Timur", laki: 293550, perempuan: 289116, luas: 20.16, growth: 0.7 },
];

// Total penduduk DKI Jakarta (jiwa), sumber BPS & Disdukcapil
export const growthData = [
  { year: 2019, total: 10577810 },
  { year: 2020, total: 10562088 },
  { year: 2021, total: 10562000 },
  { year: 2022, total: 10672000 },
  { year: 2023, total: 10691000 },
  { year: 2024, total: 10700000 },
  { year: 2025, total: 10881514 },
  { year: 2026, total: 11050000 },
];

export const kotaName = "DKI Jakarta";
export const dataYear = 2026;

export function formatNumber(n) {
  return Math.round(n).toLocaleString("id-ID");
}

// Kepadatan Jakarta sangat tinggi (rata-rata >15.000 jiwa/km2)
export function densityTier(d) {
  if (d > 20000) return "high";
  if (d >= 10000) return "medium";
  return "low";
}