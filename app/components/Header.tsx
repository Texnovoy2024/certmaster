"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px 0' }}>
      <div className="container flex justify-between items-center" style={{ position: 'relative' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 2L4 8V20C4 28.837 10.716 37.028 19 38C27.284 37.028 34 28.837 34 20V8L19 2Z" fill="url(#shieldGrad2)"/>
            <path d="M19 4L6 9.5V20C6 27.9 12.2 35.2 19 36C25.8 35.2 32 27.9 32 20V9.5L19 4Z" fill="url(#shieldInner2)" opacity="0.6"/>
            <polygon points="19,9 20.8,14.5 26.5,14.5 21.9,17.8 23.7,23.3 19,20 14.3,23.3 16.1,17.8 11.5,14.5 17.2,14.5" fill="#FFD700"/>
            <ellipse cx="11" cy="25" rx="3.5" ry="2" fill="#B8860B" opacity="0.7" transform="rotate(-30 11 25)"/>
            <ellipse cx="27" cy="25" rx="3.5" ry="2" fill="#B8860B" opacity="0.7" transform="rotate(30 27 25)"/>
            <defs>
              <linearGradient id="shieldGrad2" x1="4" y1="2" x2="34" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e40af"/><stop offset="100%" stopColor="#1e3a8a"/>
              </linearGradient>
              <linearGradient id="shieldInner2" x1="6" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93c5fd"/><stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#1d4ed8' }}>Cert</span><span style={{ color: '#b8860b' }}>Master</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav flex items-center gap-6" style={{ fontSize: '14px', fontWeight: 500 }}>
          <Link href="/dashboard" style={{ color: 'var(--text-primary)' }}>Baza</Link>
          <Link href="/editor" style={{ color: 'var(--text-primary)' }}>Muharrir</Link>
          <Link href="/verify" style={{ color: 'var(--text-primary)' }}>Tekshirish</Link>
          <Link href="/legal" style={{ color: 'var(--text-secondary)' }}>Offerta</Link>
          <Link href="/editor" className="btn btn-primary" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Boshlash
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ display: 'block', width: 20, height: 2, background: menuOpen ? 'var(--primary-color)' : 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}/>
          <span style={{ display: 'block', width: 20, height: 2, background: 'white', opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }}/>
          <span style={{ display: 'block', width: 20, height: 2, background: menuOpen ? 'var(--primary-color)' : 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}/>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(10, 12, 20, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: '8px',
          zIndex: 100,
        }}>
          {[
            { href: '/dashboard', label: 'Baza (Dashboard)' },
            { href: '/editor', label: 'Muharrir' },
            { href: '/verify', label: 'Tekshirish' },
            { href: '/legal', label: 'Ommaviy Offerta' },
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 16px', borderRadius: '10px',
              color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px',
              transition: 'background 0.2s',
              background: 'rgba(255,255,255,0.04)',
            }}>
              {item.label}
            </Link>
          ))}
          <Link href="/editor" onClick={() => setMenuOpen(false)} className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '8px', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
            Boshlash
          </Link>
        </div>
      )}
    </header>
  );
}
