import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = ["var(--male)", "var(--female)"];
const COLORS_BG = ["var(--male-soft)", "var(--female-soft)"];

const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  boxShadow: "var(--shadow-lg)",
  fontSize: 13,
  padding: "10px 14px",
};

export default function GenderChart({ label, laki, perempuan, total }) {
  const data = [
    { name: "Laki-laki", value: laki },
    { name: "Perempuan", value: perempuan },
  ];

  const lakiPct = ((laki / total) * 100).toFixed(1);
  const perempuanPct = ((perempuan / total) * 100).toFixed(1);
  const pcts = [lakiPct, perempuanPct];

  return (
    <div className="gender-chart-wrap">
      <div className="gender-chart-left">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => v.toLocaleString("id-ID")}
              contentStyle={tooltipStyle}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="gender-chart-center">
          <div className="gender-chart-center-label">{label}</div>
          <div className="gender-chart-center-value num">{total.toLocaleString("id-ID")}</div>
        </div>
      </div>

      <div className="gender-chart-right">
        {data.map((d, i) => (
          <div key={d.name} className="gender-chart-legend-item">
            <div className="gender-chart-legend-top">
              <span className="gender-chart-swatch" style={{ background: COLORS[i] }} />
              <span className="gender-chart-legend-name">{d.name}</span>
              <span className="gender-chart-legend-pct">{pcts[i]}%</span>
            </div>
            <div className="gender-chart-bar-track" style={{ background: COLORS_BG[i] }}>
              <div
                className="gender-chart-bar-fill"
                style={{ background: COLORS[i], width: `${pcts[i]}%` }}
              />
            </div>
            <div className="gender-chart-legend-value num">
              {d.value.toLocaleString("id-ID")} jiwa
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
