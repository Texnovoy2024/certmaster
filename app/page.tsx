import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-8 mb-4" style={{ maxWidth: '800px' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          background: 'rgba(29, 78, 216, 0.1)',
          border: '1px solid rgba(29, 78, 216, 0.3)',
          borderRadius: '30px',
          color: '#93c5fd',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          Yangi Avlod Platformasi ✨
        </div>
        
        <h1 className="hero-h1" style={{ fontSize: '56px', lineHeight: 1.1, marginBottom: '24px', textWrap: 'balance' }}>
          <span style={{ color: '#1d4ed8' }}>Cert</span><span style={{ color: '#b8860b' }}>Master</span> bilan <br/>
          <span className="text-gradient">chiroyli sertifikatlar yarating</span>
        </h1>
        
        <p className="hero-p" style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
          Tashkilotingiz uchun sertifikat, diplom yoki faxriy yorliqlarni osongina tayyorlang. Maxsus dizaynlar yarating va noyob QR kod orqali haqiqiylikni ta'minlang.
        </p>
        
        <div className="flex gap-4 hero-cta">
          <Link href="/editor" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 28px', borderRadius: '12px' }}>
            Muharrirga O'tish
          </Link>
          <Link href="/verify" className="btn btn-secondary" style={{ fontSize: '16px', padding: '14px 28px', borderRadius: '12px' }}>
            Sertifikatni Tekshirish
          </Link>
        </div>
      </section>
 
      {/* Features Section */}
      <section className="w-full mt-8 features-grid" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(79, 70, 229, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'white' }}>Moslashuvchan Muharrir</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>O'zingizning shabloningizni yuklang va ism, sana kabi ma'lumotlarni rasm ustiga avtomatik joylashtiring.</p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--secondary-color)' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'white' }}>QR Kod Bilan Xavfsiz</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>Har bir yaratilgan sertifikatga unikal QR kod biriktiriladi. Tekshirish sahifasida uning soxta emasligi tasdiqlanadi.</p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--success-color)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'white' }}>Yuridik Kafolat</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>Platformamiz tashkilotlar bilan ommaviy offerta asosida ishlaydi. Ma'lumotlaringiz xavfsizligi ehtiyot qilinadi.</p>
        </div>

      </section>

    </div>
  );
}
