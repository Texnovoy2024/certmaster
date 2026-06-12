import prisma from "../../lib/prisma";
import Link from "next/link";
import ClearHistoryButton from "./ClearHistoryButton";
import CertificatePreview from "@/components/CertificatePreview";
import { Eye, Edit3, Calendar, User } from "lucide-react";

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
        <div className="glass-panel mb-10" style={{ padding: '24px', border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', color: '#fca5a5' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Ma&apos;lumotlar Bazasida Xatolik</h3>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>{errorMsg}</p>
          <p style={{ fontSize: '14px' }}>Iltimos, Vercel sozlamalarida <b>DATABASE_URL</b> to&apos;g&apos;ri ko&apos;rsatilganligini tekshiring.</p>
        </div>
      )}

      {/* SHABLONLAR QISMI */}
      <div className="flex justify-between items-center mb-8">
        <h2 style={{ fontSize: '32px' }} className="text-gradient">Tayyor Shablonlar</h2>
        <Link href="/editor" className="btn btn-primary">Yangi Sertifikat Yaratish</Link>
      </div>

      {templates.length === 0 ? (
        <div className="glass-panel text-center mb-16" style={{ padding: '60px', color: 'var(--text-secondary)' }}>
          Hali shablonlar kiritilmagan.
        </div>
      ) : (
        <div className="templates-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {templates.map((cert: any) => (
            <div key={cert.id} className="glass-panel cert-history-card" style={{ padding: '24px', border: '1px solid rgba(79, 70, 229, 0.3)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Edit3 size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>{cert.issuer}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Dizayn namunasi</div>
                </div>
              </div>

              <div style={{ width: '100%', marginBottom: '16px' }}>
                {/* Shablonlar uchun faqat toza fon ko'rsatiladi, elementlar yo'q */}
                <CertificatePreview templateUrl={cert.templateUrl} elementsData="[]" />
              </div>

              <Link href={`/editor?load=${cert.id}`} className="btn btn-secondary w-full justify-center" style={{ backdropFilter: 'none' }}>
                Olib Tahrirlash
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* YARATILGAN SERTIFIKATLAR */}
      <div className="flex justify-between items-center mb-8">
        <h2 style={{ fontSize: '32px' }} className="text-gradient">Yaratilgan Sertifikatlar Tarixi</h2>
        {userCerts.length > 0 && <ClearHistoryButton />}
      </div>

      {userCerts.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '80px 40px', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '56px', marginBottom: '24px', opacity: 0.6 }}>📜</div>
          <p style={{ fontSize: '20px', color: 'white', marginBottom: '12px', fontWeight: 600 }}>Hozircha tarix bo&apos;sh</p>
          <p style={{ marginBottom: '32px', fontSize: '15px', maxWidth: '450px', margin: '0 auto 32px' }}>
            Siz yaratgan va saqlagan sertifikatlar ushbu bo&apos;limda vizual ko&apos;rinishda saqlanadi.
          </p>
          <Link href="/editor" className="btn btn-primary" style={{ padding: '14px 28px' }}>Yangi Sertifikat Yaratish</Link>
        </div>
      ) : (
        <div className="certs-grid" style={{ display: 'grid', gap: '24px' }}>
          {userCerts.map((cert: any) => (
            <div key={cert.id} className="glass-panel cert-history-card" style={{ padding: '24px' }}>
              {/* Visual Preview */}
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <CertificatePreview templateUrl={cert.templateUrl} elementsData={cert.elementsData} certId={cert.id} />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white font-semibold" style={{ fontSize: '18px' }}>
                  <User size={16} className="text-sky-400" /> {cert.recipient}
                </div>

                <div className="flex items-center gap-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(cert.createdAt).toLocaleDateString('uz-UZ')}</div>
                  <div className="flex items-center gap-1.5"><Edit3 size={13} /> {cert.issuer}</div>
                </div>

                <div style={{ fontSize: '11px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                  ID: {cert.id}
                </div>

                <div className="flex gap-3 mt-2">
                  <Link href={`/verify/${cert.id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: '13px', background: 'rgba(14, 165, 233, 0.1)', borderColor: 'rgba(14, 165, 233, 0.2)', color: '#7dd3fc' }}>
                    <Eye size={16} /> Tekshirish
                  </Link>
                  <Link href={`/editor?load=${cert.id}`} className="btn btn-secondary" style={{ flex: 1, fontSize: '13px' }}>
                    <Edit3 size={16} /> Tahrirlash
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
