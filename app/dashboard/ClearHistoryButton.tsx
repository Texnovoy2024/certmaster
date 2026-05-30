"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClearHistoryButton() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClear = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificate/clear", {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowModal(false);
        router.refresh();
      } else {
        alert(data.error || "Xatolik yuz berdi");
      }
    } catch (err) {
      alert("Server bilan bog'lanishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="btn btn-secondary" 
        style={{ 
          fontSize: '13px', 
          backgroundColor: 'rgba(239, 68, 68, 0.08)', 
          borderColor: 'rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        Tarixni Tozalash
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '420px',
            width: '100%',
            padding: '32px',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px',
              color: '#ef4444'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </div>

            <h3 style={{ fontSize: '22px', marginBottom: '12px', color: 'white', fontFamily: 'Outfit, sans-serif' }}>Tarixni tozalamoqchimisiz?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              Barcha yaratilgan sertifikatlar tarixi butunlay o'chirib tashlanadi. Tayyor shablonlaringizga zarar yetmaydi. Bu amalni qaytarib bo'lmaydi.
            </p>

            <div className="flex gap-4" style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowModal(false)}
                className="btn btn-secondary" 
                style={{ flex: 1, height: '44px' }}
                disabled={loading}
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleClear}
                className="btn" 
                style={{ 
                  flex: 1, 
                  height: '44px',
                  backgroundColor: '#ef4444', 
                  color: 'white',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' 
                }}
                disabled={loading}
              >
                {loading ? "Tozalanmoqda..." : "Ha, o'chirilsin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
