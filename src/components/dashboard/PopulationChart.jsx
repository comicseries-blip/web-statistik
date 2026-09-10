import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const MALE = "var(--male)";
const FEMALE = "var(--female)";

const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  boxShadow: "var(--shadow-lg)",
  fontSize: 13,
  padding: "10px 14px",
};

const legendStyle = {
  fontSize: 12.5,
  paddingTop: 8,
};

export default function PopulationChart({ selected, data }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 12, right: 16, left: 8, bottom: 65 }} barCategoryGap="20%">
        <defs>
          <linearGradient id="barMale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--male)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--male)" stopOpacity={0.75} />
          </linearGradient>
          <linearGradient id="barFemale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--female)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--female)" stopOpacity={0.75} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--line)" vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          angle={-40}
          textAnchor="end"
          height={85}
          interval={0}
          tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
          axisLine={{ stroke: "var(--line)" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => v.toLocaleString("id-ID")}
          tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(v) => v.toLocaleString("id-ID")}
          contentStyle={tooltipStyle}
          cursor={{ fill: "var(--accent-soft)", opacity: 0.4 }}
        />
        <Legend wrapperStyle={legendStyle} />
        <Bar
          dataKey="laki"
          name="Laki-laki"
          fill="url(#barMale)"
          radius={[5, 5, 0, 0]}
          maxBarSize={40}
        >
          {data.map((d, i) => (
            <Cell
              key={i}
              fillOpacity={selected === "all" || selected === d.name ? 1 : 0.18}
            />
          ))}
        </Bar>
        <Bar
          dataKey="perempuan"
          name="Perempuan"
          fill="url(#barFemale)"
          radius={[5, 5, 0, 0]}
          maxBarSize={40}
        >
          {data.map((d, i) => (
            <Cell
              key={i}
              fillOpacity={selected === "all" || selected === d.name ? 1 : 0.18}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
