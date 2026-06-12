export default function DashboardLoading() {
  return (
    <div className="container mt-10 mb-20">
      <div className="flex justify-between items-center mb-8">
        <div style={{ width: 220, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: 180, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: 80 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="glass-panel" style={{ padding: 24, aspectRatio: '1.414/1', borderRadius: 16, background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }`}</style>
    </div>
  );
}
