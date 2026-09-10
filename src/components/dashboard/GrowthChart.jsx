import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  boxShadow: "var(--shadow-lg)",
  fontSize: 13,
  padding: "10px 14px",
};

export default function GrowthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <AreaChart data={data} margin={{ top: 12, right: 20, left: 8, bottom: 8 }}>
        <defs>
          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--growth)" stopOpacity={0.3} />
            <stop offset="50%" stopColor="var(--growth)" stopOpacity={0.1} />
            <stop offset="100%" stopColor="var(--growth)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--line)" vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
          axisLine={{ stroke: "var(--line)" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => v.toLocaleString("id-ID")}
          tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
          domain={["auto", "auto"]}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(v) => v.toLocaleString("id-ID")}
          contentStyle={tooltipStyle}
          cursor={{ stroke: "var(--growth)", strokeDasharray: "6 4", strokeWidth: 1.5 }}
        />
        <Area
          type="monotone"
          dataKey="total"
          name="Total penduduk"
          stroke="var(--growth)"
          strokeWidth={2.5}
          fill="url(#growthGrad)"
          dot={{ r: 4, fill: "var(--growth)", stroke: "var(--surface)", strokeWidth: 2 }}
          activeDot={{ r: 6, stroke: "var(--surface)", strokeWidth: 2, fill: "var(--growth)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
