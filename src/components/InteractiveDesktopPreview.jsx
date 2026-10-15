import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, Button, Chip, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TerminalIcon from '@mui/icons-material/Terminal';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import HubIcon from '@mui/icons-material/Hub';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DownloadIcon from '@mui/icons-material/Download';
import { REALITY_PILL_MODES } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const LETTERS = [
  { id: 'Z', src: '/wallpaper/letter_z.png', alt: 'ZothOS 3D Letter Z', w: '15.5%' },
  { id: 'O1', src: '/wallpaper/letter_o1.png', alt: 'ZothOS 3D Letter O', w: '17.2%' },
  { id: 'T', src: '/wallpaper/letter_t.png', alt: 'ZothOS 3D Letter T', w: '14.8%' },
  { id: 'H', src: '/wallpaper/letter_h.png', alt: 'ZothOS 3D Letter H', w: '17.2%' },
  { id: 'O2', src: '/wallpaper/letter_o2.png', alt: 'ZothOS 3D Letter O2', w: '17.6%' },
  { id: 'S', src: '/wallpaper/letter_s.png', alt: 'ZothOS 3D Letter S', w: '14.0%' },
];

export default function InteractiveDesktopPreview({ activePillId = 'gold', onSelectPill }) {
  const [internalPill, setInternalPill] = useState(activePillId);
  const currentPillId = onSelectPill ? activePillId : internalPill;
  const setPill = onSelectPill || setInternalPill;
  const activeMode = REALITY_PILL_MODES.find((m) => m.id === currentPillId) || REALITY_PILL_MODES[0];

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mouseRel, setMouseRel] = useState({ x: 0.5, y: 0.5, active: false });
  const [clockStr, setClockStr] = useState('00:35:00');
  const navigate = useNavigate();

  // Clock updater
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockStr(now.toTimeString().slice(0, 8));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // 60 FPS Constellation, Comet Ribbon, Sacred Reticle & Shockwave Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let rafId = null;
    let width = 960;
    let height = 520;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = Math.max(300, rect.width);
      height = Math.max(320, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // 28 constellation star-nodes
    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: ((i * 137.5) % width),
      y: ((i * 293.7) % height),
      vx: Math.cos(i * 1.7) * 0.35,
      vy: Math.sin(i * 2.3) * 0.35,
      r: 1.5 + (i % 3) * 0.65,
      phase: (i * 0.85) % 6.28,
    }));

    const sparks = [];
    const ripples = [];
    let pointer = { x: width * 0.5, y: height * 0.46, tx: width * 0.5, ty: height * 0.46, trailX: width * 0.5, trailY: height * 0.46, speed: 0, userInside: false };
    let phase = 0;

    const hexToRgb = (hex) => {
      const h = (hex || '#D4AF37').replace('#', '');
      const n = parseInt(h, 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };

    const spawnSparks = (x, y, count, boost = 1) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (0.6 + Math.random() * 2.8) * boost;
        sparks.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.3,
          life: 1.0,
          decay: 0.018 + Math.random() * 0.022,
          size: 2.0 + Math.random() * 3.5,
          white: Math.random() > 0.65,
        });
      }
      if (sparks.length > 90) sparks.splice(0, sparks.length - 90);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      const d = Math.hypot(nx - pointer.tx, ny - pointer.ty);
      pointer.tx = nx;
      pointer.ty = ny;
      pointer.speed = Math.min(1, d / 24);
      pointer.userInside = true;
      if (d > 2) spawnSparks(nx, ny, Math.min(4, Math.ceil(d / 6)), 1);
      if (d > 48 && ripples.length < 4) {
        ripples.push({ x: nx, y: ny, life: 1.0, maxR: 150 });
      }
      setMouseRel({ x: nx / Math.max(1, width), y: ny / Math.max(1, height), active: true });
    };

    const onLeave = () => {
      pointer.userInside = false;
      setMouseRel({ x: 0.5, y: 0.5, active: false });
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      ripples.push({ x: nx, y: ny, life: 1.0, maxR: 220 });
      spawnSparks(nx, ny, 20, 1.6);
    };

    const hostEl = containerRef.current;
    if (hostEl) {
      hostEl.addEventListener('pointermove', onMove);
      hostEl.addEventListener('pointerleave', onLeave);
      hostEl.addEventListener('pointerdown', onClick);
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      phase += 0.035;

      // Gentle figure-8 autonomous cursor orbit when user pointer isn't inside
      if (!pointer.userInside) {
        pointer.tx = width * (0.5 + 0.28 * Math.cos(phase * 0.55));
        pointer.ty = height * (0.45 + 0.18 * Math.sin(phase * 1.1));
        pointer.speed = 0.35;
        if (Math.random() < 0.28) spawnSparks(pointer.x, pointer.y, 1, 0.7);
      } else {
        pointer.speed *= 0.94;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.22;
      pointer.y += (pointer.ty - pointer.y) * 0.22;
      pointer.trailX += (pointer.x - pointer.trailX) * 0.11;
      pointer.trailY += (pointer.y - pointer.trailY) * 0.11;

      ctx.clearRect(0, 0, width, height);
      const rgb = hexToRgb(activeMode.accent);

      // 1. Update & draw constellation nodes + cursor ley-lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        const dmx = pointer.x - a.x;
        const dmy = pointer.y - a.y;
        const dm = Math.hypot(dmx, dmy);
        if (dm > 16 && dm < 220) {
          const pull = (1 - dm / 220) * 0.42;
          a.x += (dmx / dm) * pull - (dmy / dm) * pull * 0.6;
          a.y += (dmy / dm) * pull + (dmx / dm) * pull * 0.6;

          const cAlpha = (1 - dm / 220) * (0.28 + pointer.speed * 0.35);
          ctx.strokeStyle = `rgba(${rgb}, ${cAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        if (a.x < 0) a.x += width;
        if (a.x > width) a.x -= width;
        if (a.y < 0) a.y += height;
        if (a.y > height) a.y -= height;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > 150 || Math.abs(dy) > 150) continue;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            ctx.strokeStyle = `rgba(${rgb}, ${((1 - d / 150) * 0.16).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const boost = dm < 220 ? 1 - dm / 220 : 0;
        ctx.fillStyle = `rgba(${rgb}, ${(0.3 + boost * 0.6).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + boost * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Comet ribbon
      const tailDist = Math.hypot(pointer.x - pointer.trailX, pointer.y - pointer.trailY);
      if (tailDist > 1.5) {
        const grad = ctx.createLinearGradient(pointer.trailX, pointer.trailY, pointer.x, pointer.y);
        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(1, `rgba(${rgb}, ${(0.35 + pointer.speed * 0.4).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4 + pointer.speed * 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(pointer.trailX, pointer.trailY);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }

      // 3. Radial cursor bloom & counter-rotating sacred reticle
      const auraGrad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 85);
      auraGrad.addColorStop(0, `rgba(${rgb}, 0.34)`);
      auraGrad.addColorStop(0.4, `rgba(${rgb}, 0.12)`);
      auraGrad.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 85, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(pointer.x, pointer.y);
      ctx.rotate(phase * 0.9);
      ctx.strokeStyle = `rgba(${rgb}, 0.42)`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.arc(0, 0, 24 + pointer.speed * 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Shockwave ripples
      for (let i = 0; i < ripples.length; i++) {
        const rp = ripples[i];
        rp.life *= 0.92;
        if (rp.life < 0.02) {
          ripples.splice(i, 1);
          i--;
          continue;
        }
        const rad = (1 - rp.life) * rp.maxR;
        ctx.strokeStyle = `rgba(${rgb}, ${(rp.life * 0.65).toFixed(3)})`;
        ctx.lineWidth = Math.max(1, rp.life * 2.8);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Floating sparks
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          i--;
          continue;
        }
        ctx.fillStyle = s.white
          ? `rgba(255, 250, 225, ${(s.life * 0.85).toFixed(3)})`
          : `rgba(${rgb}, ${(s.life * 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (hostEl) {
        hostEl.removeEventListener('pointermove', onMove);
        hostEl.removeEventListener('pointerleave', onLeave);
        hostEl.removeEventListener('pointerdown', onClick);
      }
    };
  }, [activeMode]);

  const dockItems = [
    { label: 'AGY IDE', icon: <SmartToyIcon sx={{ fontSize: 18 }} />, route: '/daemons' },
    { label: 'Zoth Terminal', icon: <TerminalIcon sx={{ fontSize: 18 }} />, route: '/desktop' },
    { label: 'HexStrike Sec', icon: <SecurityIcon sx={{ fontSize: 18 }} />, route: '/security' },
    { label: 'Zoth Vault', icon: <LockIcon sx={{ fontSize: 18 }} />, route: '/security' },
    { label: '22 Daemons', icon: <HubIcon sx={{ fontSize: 18 }} />, route: '/daemons' },
    { label: 'Get ISO', icon: <DownloadIcon sx={{ fontSize: 18 }} />, route: '/download' },
  ];

  return (
    <Box sx={{ mb: 8 }}>
      {/* Reality Pill Selector Bar */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="LIVE INTERACTIVE DESKTOP (zoth-pill)"
            size="small"
            sx={{
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.7rem',
              bgcolor: 'rgba(212,175,55,0.14)',
              color: activeMode.accent,
              border: `1px solid ${activeMode.accent}`,
            }}
          />
          <Typography variant="caption" sx={{ fontFamily: mono, color: 'text.secondary' }}>
            Move cursor or click inside screen to trigger 60 FPS constellation ley-lines &amp; 3D letter tilt
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {REALITY_PILL_MODES.map((pill) => {
            const selected = pill.id === activeMode.id;
            return (
              <Button
                key={pill.id}
                size="small"
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => setPill(pill.id)}
                sx={{
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  px: 1.6,
                  py: 0.6,
                  borderRadius: 999,
                  bgcolor: selected ? pill.accent : 'transparent',
                  color: selected ? '#08080B' : pill.accent,
                  borderColor: pill.accent,
                  '&:hover': {
                    bgcolor: selected ? pill.accent : `${pill.accent}22`,
                    borderColor: pill.accent,
                  },
                }}
              >
                {pill.glyph} {pill.name.split(' ')[0]} Pill
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Simulated KDE Plasma 6.3 Monitor Frame */}
      <Paper
        ref={containerRef}
        elevation={0}
        sx={{
          position: 'relative',
          height: { xs: 360, sm: 440, md: 510 },
          borderRadius: 3.5,
          overflow: 'hidden',
          bgcolor: '#050508',
          border: `1.5px solid ${activeMode.accent}88`,
          boxShadow: `0 24px 64px -12px rgba(0,0,0,0.85), 0 0 40px -8px ${activeMode.bgGlow}`,
          cursor: 'crosshair',
          userSelect: 'none',
        }}
      >
        {/* Base Obsidian Wallpaper Image */}
        <Box
          component="img"
          src="/wallpaper/bg.png"
          alt="ZothOS KDE Plasma 6.3 Obsidian Wallpaper Background"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.88,
            transform: `translate(${(0.5 - mouseRel.x) * 12}px, ${(0.5 - mouseRel.y) * 12}px) scale(1.04)`,
            transition: 'transform 0.15s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* Rotating Sacred Hermetic Seal & Ring Behind 3D Title */}
        <Box
          sx={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 220, sm: 320, md: 410 },
            height: { xs: 220, sm: 320, md: 410 },
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="/wallpaper/ring.png"
            alt="Sacred Alchemical Outer Ring"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.22,
              animation: 'zoth-spin-rev 42s linear infinite',
            }}
          />
          <Box
            component="img"
            src="/wallpaper/seal.png"
            alt="ZothOS Hermetic Seal"
            sx={{
              position: 'absolute',
              width: '68%',
              height: '68%',
              opacity: 0.18,
              animation: 'zoth-spin 56s linear infinite',
            }}
          />
        </Box>

        {/* Interactive 60 FPS Constellation & Cursor Aura Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Top KDE Plasma Status Strip inside the virtual monitor */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 4,
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'rgba(6, 7, 11, 0.78)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${activeMode.accent}33`,
            fontFamily: mono,
            fontSize: '0.72rem',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box sx={{ color: activeMode.accent, fontWeight: 800 }}>
              {activeMode.glyph} zoth-pill.local
            </Box>
            <Box sx={{ color: 'rgba(255,255,255,0.55)', display: { xs: 'none', sm: 'inline' } }}>
              KDE Plasma 6.3 Wayland • Kernel 6.12-amd64
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ color: '#34D399', fontWeight: 700, display: { xs: 'none', md: 'inline' } }}>
              CPU 41.2°C (0 RPM) • 22/22 Daemons UP
            </Box>
            <Box
              sx={{
                px: 1,
                py: 0.2,
                borderRadius: 1,
                bgcolor: `${activeMode.accent}22`,
                color: activeMode.accent,
                border: `1px solid ${activeMode.accent}66`,
                fontWeight: 800,
              }}
            >
              {activeMode.pillLabel}
            </Box>
            <Box sx={{ color: '#EDEFF2', fontWeight: 700 }}>{clockStr}</Box>
          </Box>
        </Box>

        {/* Center 3D Tilting Metallic ZOTHOS Letters + Subtitle */}
        <Box
          sx={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '88%', sm: '76%', md: '66%' },
            maxWidth: 740,
            zIndex: 3,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              perspective: '900px',
            }}
          >
            {LETTERS.map((item, idx) => {
              const letterCenter = (idx + 0.5) / LETTERS.length;
              const dx = mouseRel.x - letterCenter;
              const dy = mouseRel.y - 0.45;
              const rotY = dx * 28;
              const rotX = -dy * 24;
              const dist = Math.hypot(dx, dy);
              const scale = 1 + Math.max(0, 0.08 * (1 - dist * 1.4));
              return (
                <Box
                  key={item.id}
                  component="img"
                  src={item.src}
                  alt={item.alt}
                  sx={{
                    width: item.w,
                    height: 'auto',
                    display: 'block',
                    filter: `drop-shadow(0 8px 22px ${activeMode.bgGlow})`,
                    transform: `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
                    transition: 'transform 0.12s ease-out',
                  }}
                />
              );
            })}
          </Box>

          <Box
            component="img"
            src="/wallpaper/subtitle.png"
            alt="ZothOS Sovereign Intelligence Subtitle Plate"
            sx={{
              width: '76%',
              maxWidth: 520,
              mt: 1.5,
              opacity: 0.92,
              filter: `drop-shadow(0 4px 14px ${activeMode.bgGlow})`,
            }}
          />
        </Box>

        {/* Bottom Floating Obsidian KDE Dock */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.6, sm: 1 },
            px: { xs: 1.2, sm: 2 },
            py: 0.9,
            borderRadius: 999,
            bgcolor: 'rgba(8, 9, 14, 0.84)',
            backdropFilter: 'blur(18px)',
            border: `1px solid ${activeMode.accent}55`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.75)',
            maxWidth: '94%',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {dockItems.map((item) => (
            <Tooltip key={item.label} title={`Open ${item.label}`}>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(item.route);
                }}
                startIcon={item.icon}
                sx={{
                  fontFamily: mono,
                  fontSize: { xs: '0.66rem', sm: '0.72rem' },
                  fontWeight: 700,
                  color: '#EDEFF2',
                  px: { xs: 1, sm: 1.4 },
                  py: 0.5,
                  minWidth: 0,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  '&:hover': {
                    color: '#08080B',
                    bgcolor: activeMode.accent,
                    borderColor: activeMode.accent,
                  },
                }}
              >
                {item.label}
              </Button>
            </Tooltip>
          ))}
        </Box>
      </Paper>

      {/* Active Reality Pill Posture Strip */}
      <Paper
        elevation={0}
        sx={{
          mt: 1.5,
          p: 2,
          borderRadius: 2.5,
          bgcolor: 'rgba(11, 12, 18, 0.9)',
          border: `1px solid ${activeMode.accent}44`,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.82rem', color: activeMode.accent }}>
            $ {activeMode.cmd} — {activeMode.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#A6A8B4', fontSize: '0.82rem', mt: 0.25 }}>
            {activeMode.desc}
          </Typography>
        </Box>
        <Chip
          label={activeMode.posture}
          size="small"
          sx={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: '0.68rem',
            bgcolor: `${activeMode.accent}18`,
            color: activeMode.secondary,
            border: `1px solid ${activeMode.accent}44`,
            maxWidth: '100%',
            height: 'auto',
            '& .MuiChip-label': { whiteSpace: 'normal', py: 0.4 },
          }}
        />
      </Paper>
    </Box>
  );
}
