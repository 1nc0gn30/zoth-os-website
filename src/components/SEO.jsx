import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META = {
  '/': {
    title: 'ZothOS Linux v3.2 // The Sovereign AI, Cryptographic Vault & Offensive Security OS',
    desc: 'Bootable Debian 13 Trixie + Kali & Parrot Dual-Parity Linux OS with KDE Plasma 6.3 Wayland, 9 Frontier AI Coding Agents, and 22 Loopback Daemons.',
  },
  '/desktop': {
    title: 'Zoth-Pill Live Desktop & KVM Simulator // ZothOS Linux v3.2',
    desc: 'Experience the interactive ZothOS KDE Plasma 6.3 Wayland desktop, 4 Reality Pill modes (zoth-mode), and live KVM kernel terminal in your browser.',
  },
  '/daemons': {
    title: '22 Loopback Enclave Daemons & 9 Frontier AI Agents // ZothOS Linux v3.2',
    desc: 'Explore the 22 zero-egress localhost daemons (:8094–:8120, :9393, :8787) and 9 pre-installed coding agents powering ZothOS v3.2.',
  },
  '/security': {
    title: '175+ Cyber Arsenal, Ghostmode Tor & Zoth Vault // ZothOS Linux v3.2',
    desc: 'Dual Kali Rolling + Parrot OS offensive security parity, Argon2id + ChaCha20 memory-only secrets vault, and 1-click NullAI Ghostmode Tor routing.',
  },
  '/download': {
    title: 'Download ISO, Cosign Verification & Custom Live-Build Studio // ZothOS Linux v3.2',
    desc: 'Download ZothOS Linux v3.2 Hybrid UEFI ISO or QEMU/KVM image, verify Sigstore cosign signatures, and generate custom live-build recipes.',
  },
  '/docs': {
    title: 'System Codex, Tri-Repo APT Pinning & Thermal Invariants // ZothOS Linux v3.2',
    desc: 'Complete technical specification for ZothOS Linux v3.2: Debian 13 + Kali/Parrot APT pinning, <55.0°C zero-RPM thermal governance, and FAQs.',
  },
};

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const clean = pathname.replace(/\/$/, '') || '/';
    const meta = ROUTE_META[clean] || ROUTE_META['/'];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.desc);
  }, [pathname]);

  return null;
}
