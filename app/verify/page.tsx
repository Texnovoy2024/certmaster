"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifySearchPage() {
  const [certId, setCertId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim().length > 0) {
      router.push(`/verify/${certId.trim()}`);
    }
  };

  return (
    <div className="container flex flex-col items-center mt-20">
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Haqiqiylikni Tekshirish</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px', lineHeight: 1.6 }}>
          Sertifikatdagi QR kodni skaner qiling yoki uning ostida joylashgan yagona xavfsizlik ID kodini kiriting.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Masalan: 123e4567-e89b-12d3... yoki ID" 
              className="input-field"
              style={{ padding: '16px', fontSize: '16px', textAlign: 'center' }}
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '16px' }}>
             Verifikatsiyadan o'tkazish
          </button>
        </form>
      </div>
    </div>
  );
}
