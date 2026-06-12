import prisma from "@/lib/prisma";
import Link from "next/link";
import CertificatePreview from "@/components/CertificatePreview";

export default async function VerifyCertificatePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cert = await prisma.certificate.findUnique({
    where: { id: params.id }
  });

  if (!cert) {
    return (
      <div className="container flex flex-col items-center justify-center text-center mt-20">
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--danger-color)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Sertifikat Topilmadi!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Kiritilgan xavfsizlik ID kodiga ega hujjat bazadan o'chirilgan yoki umuman yaroqsiz.</p>
        <Link href="/verify" className="btn btn-primary">Boshqa ID tekshirish</Link>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center mt-10 mb-20">
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '700px', width: '100%', textAlign: 'center' }}>
        {/* Success badge */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, margin: '0 auto 24px', color: 'var(--success-color)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        
        <h1 style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--success-color)' }}>Sertifikat Haqiqiy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Ushbu sertifikat rasman tasdiqlangan va bizning bazada saqlanadi.</p>

        {/* Visual Certificate Preview */}
        {cert.templateUrl && (
          <div style={{ marginBottom: '32px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(16,185,129,0.2)', boxShadow: '0 0 40px rgba(16,185,129,0.08)' }}>
            <CertificatePreview templateUrl={cert.templateUrl} elementsData={cert.elementsData} certId={cert.id} />
          </div>
        )}
        
        {/* Info block */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'left', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Berilgan shaxs:</span>
            <div style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>{cert.recipient}</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Beruvchi tashkilot:</span>
            <div style={{ fontSize: '18px', color: 'white' }}>{cert.issuer}</div>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Berilgan sana:</span>
            <div style={{ fontSize: '16px', color: 'white' }}>{cert.createdAt.toLocaleDateString('uz-UZ')}</div>
          </div>
        </div>
        
        <Link href="/verify" className="btn btn-secondary">Yangi tekshiruv</Link>
      </div>
    </div>
  );
}
