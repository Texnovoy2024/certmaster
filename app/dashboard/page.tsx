import prisma from "../../lib/prisma";
import Link from "next/link";
import ClearHistoryButton from "./ClearHistoryButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let certificates: any[] = [];
  let errorMsg = null;

  try {
    certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      take: 40
    });
  } catch (err: any) {
    console.error("Dashboard DB Error:", err);
    errorMsg = err.message || "Ma'lumotlar bazasiga ulanishda xatolik yuz berdi.";
  }

  const templates = certificates.filter((c: any) => c.isTemplate);
  const userCerts = certificates.filter((c: any) => !c.isTemplate);

  return (
    <div className="container mt-10 mb-20">
      
      {errorMsg && (
        <div className="glass-panel p-6 mb-10 border border-red-500/50 bg-red-900/20" style={{ color: '#ff8888' }}>
          <h3 className="text-xl font-bold mb-2">Ma'lumotlar Bazasida Xatolik</h3>
          <p className="opacity-80 mb-4 text-sm font-mono" style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px' }}>{errorMsg}</p>
          <p className="text-sm">Iltimos, Vercel sozlamalarida <b>DATABASE_URL</b> to'g'ri ko'rsatilganligini va bazaga ruxsat borligini tekshiring.</p>
        </div>
      )}

      {/* SHABLONLAR QISMI */}
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ fontSize: '28px' }}>Tayyor Shablonlar</h2>
        <Link href="/editor" className="btn btn-primary">Yangi Bo'sh Yaratish</Link>
      </div>

      {templates.length === 0 ? (
        <div className="glass-panel text-center mb-10" style={{ padding: '60px', color: 'var(--text-secondary)' }}>
          Hali shablonlar kiritilmagan.
        </div>
      ) : (
        <div className="templates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {templates.map(cert => (
            <div key={cert.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid rgba(79, 70, 229, 0.4)' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>{cert.issuer}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Sertifikat namunasi</div>
              <div style={{ width: '100%', height: '140px', background: cert.templateUrl ? `url(${cert.templateUrl}) center/cover` : '#333', borderRadius: '8px', marginTop: '8px' }}></div>
              <Link href={`/editor?load=${cert.id}`} className="btn btn-secondary mt-2 w-full justify-center">Olib Tahrirlash</Link>
            </div>
          ))}
        </div>
      )}

      {/* YARATILGAN SERTIFIKATLAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ fontSize: '28px' }}>Yaratilgan Sertifikatlar Tarixi</h2>
        {userCerts.length > 0 && <ClearHistoryButton />}
      </div>
      {userCerts.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '80px 40px', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}>📜</div>
          <p style={{ fontSize: '18px', color: 'white', marginBottom: '12px' }}>Hozircha tarix bo'sh</p>
          <p style={{ marginBottom: '24px', fontSize: '14px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Siz yaratgan sertifikatlar ushbu bo'limda saqlanadi. Hali birorta ham sertifikat yaratmagansiz.
          </p>
          <Link href="/editor" className="btn btn-primary">Yangi Sertifikat Yaratish</Link>
        </div>
      ) : (
        <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {userCerts.map(cert => (
            <div key={cert.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>{cert.recipient}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Beruvchi: {cert.issuer}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sana: {new Date(cert.createdAt).toLocaleDateString('uz-UZ')}</div>
              <div style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                ID: {cert.id}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Link href={`/verify/${cert.id}`} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: '13px' }}>Tekshirish</Link>
                <Link href={`/editor?load=${cert.id}`} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: '13px' }}>Tahrirlash</Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
