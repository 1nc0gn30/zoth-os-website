/**
 * Route → motion-edit intro map for ZothOS Linux v3.2 Public Website.
 */

export const ACCENTS = {
  gold: '#D4AF37',
  emerald: '#34D399',
  crimson: '#EF4444',
  cyan: '#00F0FF',
  purple: '#C084FC',
  sky: '#38BDF8',
};

const ROUTES = [
  { match: /^\/$/, clip: 'zoth-os', label: 'ZothOS Linux 3.2', kicker: 'Sovereign AI & Security OS', accent: 'gold' },
  { match: /^\/desktop\/?$/, clip: 'home', label: 'Zoth-Pill Desktop', kicker: 'KDE Plasma 6.3 Wayland & KVM Lab', accent: 'gold' },
  { match: /^\/daemons\/?$/, clip: 'bridges', label: '22 Loopback Daemons', kicker: '127.0.0.1 Enclave Mesh & 9 AI Agents', accent: 'emerald' },
  { match: /^\/security\/?$/, clip: 'hexstrike', label: 'Cyber Arsenal & Vault', kicker: 'Kali + Parrot Parity & Argon2id Vault', accent: 'crimson' },
  { match: /^\/download\/?$/, clip: 'arsenal', label: 'ISO & Custom Builder', kicker: 'UEFI Live-Build & Cosign Verification', accent: 'cyan' },
  { match: /^\/docs\/?$/, clip: 'docs', label: 'System Codex', kicker: 'Architecture, APT Pinning & Invariants', accent: 'gold' },
];

const EARLY_HANDOFF_CLIPS = new Set(['bridges']);
const DEFAULT_HANDOFF_LEAD_S = 0.62;
const EARLY_HANDOFF_LEAD_S = 1.55;

export const INTRO_CLIPS = Array.from(new Set(ROUTES.map((r) => r.clip)));

export function resolveRouteIntro(pathname) {
  const path = pathname || '/';
  const idx = ROUTES.findIndex((r) => r.match.test(path));
  if (idx === -1) return null;
  const route = ROUTES[idx];
  return {
    key: path.replace(/\/$/, '') || '/',
    clip: route.clip,
    label: route.label,
    kicker: route.kicker || 'ZothOS Linux v3.2',
    index: String(idx + 1).padStart(2, '0'),
    total: String(ROUTES.length).padStart(2, '0'),
    accent: ACCENTS[route.accent] || ACCENTS.gold,
    handoffLead: EARLY_HANDOFF_CLIPS.has(route.clip) ? EARLY_HANDOFF_LEAD_S : DEFAULT_HANDOFF_LEAD_S,
  };
}

export function clipSources(clip, cut) {
  return [
    { src: `/intros/${clip}-${cut}.webm`, type: 'video/webm' },
    { src: `/intros/${clip}-${cut}.mp4`, type: 'video/mp4' },
  ];
}
