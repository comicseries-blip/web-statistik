export default function SectionTitle({ title, desc }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div className="section-title">{title}</div>
      {desc && <div className="section-desc">{desc}</div>}
    </div>
  );
}
