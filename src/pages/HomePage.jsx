import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TerminalIcon from '@mui/icons-material/Terminal';
import DownloadIcon from '@mui/icons-material/Download';
import SecurityIcon from '@mui/icons-material/Security';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HubIcon from '@mui/icons-material/Hub';
import ProductHuntBadges from '../components/ProductHuntBadges';
import {
  HeroReveal,
  HeroItem,
  GlowLine,
  StaggerChildren,
  StaggerItem,
} from '../components/MotionReveal';
import { ProFunnelBanner } from '../context/ProLicenseContext';
import InteractiveDesktopPreview from '../components/InteractiveDesktopPreview';
import SovereignFunnel from '../components/SovereignFunnel';
import UncommonTelemetryDeck from '../components/UncommonTelemetryDeck';
import {
  CORE_PILLARS,
  AGENT_SECURITY_RINGS,
  DESKTOP_SCREENSHOTS,
  COMPARISON_ROWS,
} from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

export default function HomePage() {
  const [toast, setToast] = useState(null);
  const [activePill, setActivePill] = useState('gold');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const gold = isDark ? '#D4AF37' : '#8A6508';
  const goldSoft = isDark ? '#F5E6AB' : '#8A6A09';
  const goldWash = isDark ? 'rgba(212, 175, 55, 0.12)' : '#FEF9E7';
  const goldBorder = isDark ? 'rgba(212, 175, 55, 0.35)' : '#E2CE82';
  const textPrimary = isDark ? '#F1F5F9' : '#101828';
  const textSecondary = isDark ? '#94A3B8' : '#475467';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';

  const copyCmd = (text, label) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setToast(`Copied ${label} to clipboard!`);
    }
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Mandatory Above-The-Fold High-Converting Sales Funnel Banner */}
      <ProFunnelBanner />

      {/* Hero Section */}
      <HeroReveal>
        <HeroItem>
          <GlowLine color={gold} glowColor="rgba(212, 175, 55, 0.45)" />
        </HeroItem>

        <HeroItem>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mt: 3, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label="AGENT-NATIVE LINUX v3.3.0 + ZOTHOS-LITE v1.0 • RING 0–3 ENFORCED"
              size="small"
              sx={{
                bgcolor: goldWash,
                color: goldSoft,
                border: `1px solid ${goldBorder}`,
                fontWeight: 800,
                fontFamily: mono,
                fontSize: '0.72rem',
              }}
            />
            <Chip
              label="163 MCP CATALOG (ALL OFF) • ZOTH-RELAY (:8765) • 23 DAEMONS"
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(52, 211, 153, 0.12)' : '#ECFDF3',
                color: isDark ? '#34D399' : '#047857',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                fontWeight: 800,
                fontFamily: mono,
                fontSize: '0.72rem',
              }}
            />
            <Chip
              label="KDE PLASMA 6.3 WAYLAND • DEBIAN 13.7 + KALI + PARROT"
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
                color: isDark ? '#FCA5A5' : '#B91C1C',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                fontWeight: 800,
                fontFamily: mono,
                fontSize: '0.72rem',
              }}
            />
          </Box>
        </HeroItem>

        <HeroItem>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.25rem', sm: '3.35rem', md: '4.4rem' },
              color: textPrimary,
              lineHeight: 1.06,
              mb: 2.5,
            }}
          >
            The Operating System Built for AI Agents —{' '}
            <Box component="span" className="text-gradient-gold">
              And the Humans Who Command Them
            </Box>
          </Typography>
        </HeroItem>

        <HeroItem>
          <Typography
            sx={{
              color: textSecondary,
              fontSize: { xs: '1.02rem', md: '1.16rem' },
              lineHeight: 1.72,
              maxWidth: '68ch',
              mb: 4,
            }}
          >
            Standard Linux was designed for a single human typing into bash.{' '}
            <strong>ZothOS Linux v3.3.0 & ZothOS-Lite v1.0</strong> is a Debian 13-based distro built as a{' '}
            <strong>permission-ringed, self-healing habitat for autonomous AI agents</strong> (
            <code>zoth-agent-os</code>, 163 pre-registered MCP servers, <code>zoth-relay</code> Landlock multi-agent bridge,{' '}
            <code>zoth-vault</code> RAM secret injection, and 22 loopback daemons)—while giving{' '}
            <strong>human operators</strong> a flagship 24K Gold KDE Plasma 6.3 Wayland workstation with Debian 13.7 (Trixie), Kali Rolling, and Parrot Security dual parity.
          </Typography>
        </HeroItem>

        <HeroItem>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center', mb: 5 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/download"
              startIcon={<DownloadIcon />}
              sx={{ px: 3.2, py: 1.3, fontWeight: 800, fontFamily: mono }}
            >
              Download ISO & Custom Builder →
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/mcp"
              startIcon={<HubIcon />}
              sx={{ px: 3, py: 1.3, fontWeight: 800, fontFamily: mono, borderColor: goldBorder }}
            >
              Explore MCP & Agent Hub (/mcp)
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/desktop"
              startIcon={<TerminalIcon />}
              sx={{
                px: 2.8,
                py: 1.3,
                fontWeight: 750,
                fontFamily: mono,
                color: textPrimary,
                borderColor: isDark ? 'rgba(255,255,255,0.16)' : '#D0D5DD',
              }}
            >
              Live Desktop & Kernel Simulator
            </Button>
            <ProductHuntBadges />
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/NullAITech/zoth-os"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              sx={{
                px: 2.6,
                py: 1.3,
                fontWeight: 750,
                fontFamily: mono,
                color: textPrimary,
                borderColor: isDark ? 'rgba(255,255,255,0.16)' : '#D0D5DD',
              }}
            >
              GitHub Repo
            </Button>
          </Box>
        </HeroItem>
      </HeroReveal>

      {/* Live Unicode U+2800 Braille + Bayer 8x8 Dither Telemetry Deck */}
      <Box sx={{ mb: 6 }}>
        <UncommonTelemetryDeck />
      </Box>

      {/* Live Interactive Zoth-Pill Desktop & Cursor Constellation Showcase */}
      <InteractiveDesktopPreview activePillId={activePill} onSelectPill={setActivePill} />

      {/* Quick Clone & Live-Build Strip */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 8,
          borderRadius: 3,
          bgcolor: isDark ? '#08080B' : '#F8FAFC',
          border: `1px solid ${goldBorder}`,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <TerminalIcon sx={{ color: gold, flexShrink: 0 }} />
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: '0.84rem',
              color: goldSoft,
              fontWeight: 700,
              overflowWrap: 'anywhere',
            }}
          >
            $ git clone https://github.com/NullAITech/zoth-os.git && cd zoth-os && sudo ./build/build-iso.sh
          </Typography>
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            copyCmd(
              'git clone https://github.com/NullAITech/zoth-os.git && cd zoth-os && sudo ./build/build-iso.sh',
              'ZothOS ISO build command',
            )
          }
          startIcon={<ContentCopyIcon />}
          sx={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: '0.76rem',
            color: gold,
            borderColor: goldBorder,
            whiteSpace: 'nowrap',
          }}
        >
          Copy Build Command
        </Button>
      </Paper>

      {/* Dual-Sovereignty Manifesto: For AI Agents First × For Human Operators */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          00 / 04 · DUAL-SOVEREIGNTY PARADIGM
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 1.5 }}>
          Built for <span className="text-gradient-gold">Autonomous AI Agents</span> — Loved by Human Operators
        </Typography>
        <Typography sx={{ color: textSecondary, maxWidth: '72ch', mb: 4, lineHeight: 1.7 }}>
          On conventional operating systems, AI agents either run blind inside sterile containers or run unbridled with root access to your SSH keys and cloud credentials. ZothOS solves both sides of the equation with two purpose-built execution planes sharing one Debian 13.7 + Linux 6.12 kernel.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3.5,
              borderRadius: 3.5,
              bgcolor: cardBg,
              border: `1.5px solid ${gold}`,
            }}
          >
            <Chip
              label="PRIMARY INHABITANTS • FOR AUTONOMOUS AI AGENTS"
              size="small"
              sx={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: goldWash,
                color: goldSoft,
                border: `1px solid ${goldBorder}`,
                mb: 2,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: textPrimary, mb: 1.5 }}>
              Deterministic Ring-Gated Agent Substrate
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                'zoth-agent-os & 4 Security Rings: Hardware/OS-enforced Ring 0 (SOVEREIGN) through Ring 3 (SPECTRE) governing filesystem paths, cgroups/Firejail/Landlock isolation, and LLM token budgets.',
                'Chain of Thoughts (zoth-cot) Working Memory DAG: True multi-turn /api/chat context assembly, automatic semantic fact extraction (IDENTITY, MEMORY, MISSION, SECRET), and cryptographic SHA-256 Merkle thought chains (N00 -> N01 -> N02...).',
                '152 Pre-Registered MCP Servers: /etc/zothos/mcp-servers.json ships with 16 air-gapped local servers and deterministic CLI fallbacks managed via zoth-mcp.',
                'zoth-relay Multi-Agent Bridge (127.0.0.1:8765): Lets Antigravity, Claude, Cursor, Grok, Muse Code, and GPT Actions work concurrently with 288-bit tokens and isolated ~/agent-workspace/<name> directories.',
                'Zero-Disk Secret Injection (:8787): zoth-vault run -- <agent> injects decrypted API keys directly into child process RAM so agents never see plaintext keys on disk.',
                'Autonomous Self-Healing: zoth-sentinel + zoth-heal continuously repair APT locks, compositors, DNS, and zombie threads so 24/7 agent runs never stall.',
              ].map((bullet) => (
                <Box key={bullet} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: gold, mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.6 }}>
                    {bullet}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3.5,
              borderRadius: 3.5,
              bgcolor: cardBg,
              border: `1.5px solid ${isDark ? 'rgba(52, 211, 153, 0.4)' : '#10B981'}`,
            }}
          >
            <Chip
              label="HUMAN COMMAND DECK • FOR SOVEREIGN ENGINEERS"
              size="small"
              sx={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: isDark ? 'rgba(52, 211, 153, 0.14)' : '#ECFDF3',
                color: isDark ? '#34D399' : '#047857',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                mb: 2,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: textPrimary, mb: 1.5 }}>
              24K Gold KDE Plasma 6.3 Wayland Workstation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                'Bespoke 24K Celtic Gold Desktop: KDE Plasma 6.3 Wayland with Zoth-Hermetic 3D glass icons, 60 FPS interactive QML wallpaper (zoth-pill), and the All-Seeing Eye cursor companion (zoth-desktop-pet).',
                'zoth-cockpit Operations Center: Flagship Electron dashboard + curses TUI (--tui) with rolling 60s hardware waveforms, 21-Agent Pantheon dispatch, and live daemon log inspection.',
                'Debian 13.7 + Kali + Parrot Parity: Surgical APT pinning (900 Debian Trixie, 400 Kali/Parrot) gives human red-teamers Kali and Parrot security tools without rolling-release breakage.',
                '71 Studio tools (54 in-browser + 17 local CLI; 59 with public repos) and 43 workstations pre-installed for offline engineering.',
                '4 Instant Reality Modes & Whisper-Quiet Hardware: Flip between gold, ghost (transparent Tor), matrix, and win11 decoy mode while keeping CPU < 55.0°C at 0 RPM.',
              ].map((bullet) => (
                <Box key={bullet} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#10B981', mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.6 }}>
                    {bullet}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* 4 Hardware/OS Agent Security Rings (/etc/zothos/agent-permissions.json) */}
        <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.78rem', color: gold, letterSpacing: '0.12em', mb: 1.5 }}>
          HARDWARE & KERNEL ENFORCED • /ETC/ZOTHOS/AGENT-PERMISSIONS.JSON (RINGS 0–3)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {AGENT_SECURITY_RINGS.map((r) => (
            <Paper
              key={r.ring}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: cardBg,
                border: `1px solid ${r.accent}66`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip
                  label={r.ring}
                  size="small"
                  sx={{
                    fontFamily: mono,
                    fontWeight: 900,
                    fontSize: '0.68rem',
                    bgcolor: `${r.accent}20`,
                    color: r.accent,
                    border: `1px solid ${r.accent}`,
                  }}
                />
                <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 700, color: textSecondary, fontSize: '0.66rem' }}>
                  {r.ramCap}
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem', color: r.accent, mb: 0.4 }}>
                {r.layer}
              </Typography>
              <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.92rem', color: textPrimary, mb: 1 }}>
                {r.title}
              </Typography>
              <Typography variant="body2" sx={{ color: textSecondary, fontSize: '0.78rem', lineHeight: 1.55, flex: 1, mb: 1.5 }}>
                {r.desc}
              </Typography>
              <Box sx={{ pt: 1, borderTop: `1px dashed ${isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0'}` }}>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: mono, fontSize: '0.66rem', color: textSecondary }}>
                  <strong>Sandbox:</strong> {r.isolation}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: mono, fontSize: '0.66rem', color: textSecondary }}>
                  <strong>Budget:</strong> {r.tokenBudget}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* 6 Core OS Pillars Grid */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          01 / 04 · ARCHITECTURAL FOUNDATION
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Six Sovereign Pillars of <span className="text-gradient-gold">ZothOS Linux v3.3.0 & ZothOS-Lite v1.0</span>
        </Typography>

        <StaggerChildren>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {CORE_PILLARS.map((p) => (
              <StaggerItem key={p.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3.5,
                    bgcolor: cardBg,
                    border: `1px solid ${isDark ? 'rgba(212, 175, 55, 0.22)' : '#EAECF0'}`,
                    transition: 'transform 0.25s ease, border-color 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: p.accent,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <SecurityIcon sx={{ color: p.accent, fontSize: 28 }} />
                    <Chip
                      label={p.badge}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.64rem',
                        fontFamily: mono,
                        fontWeight: 800,
                        bgcolor: `${p.accent}18`,
                        color: p.accent,
                        border: `1px solid ${p.accent}55`,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontFamily: mono, fontWeight: 800, color: textPrimary, fontSize: '1.04rem', mb: 1.2 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.68, flex: 1 }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </StaggerItem>
            ))}
          </Box>
        </StaggerChildren>
      </Box>

      {/* Visual System Tour & Authentic Screenshots */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          02 / 04 · VISUAL SYSTEM TOUR
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Inside the <span className="text-gradient-gold">24K Gold Workstation Suite</span>
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {DESKTOP_SCREENSHOTS.map((shot) => (
            <Paper
              key={shot.title}
              elevation={0}
              sx={{
                borderRadius: 3.5,
                overflow: 'hidden',
                bgcolor: cardBg,
                border: `1px solid ${goldBorder}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                component="img"
                src={shot.src}
                alt={shot.title}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  borderBottom: `1px solid ${goldBorder}`,
                }}
              />
              <Box sx={{ p: 3 }}>
                <Chip
                  label={shot.badge}
                  size="small"
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    bgcolor: goldWash,
                    color: goldSoft,
                    mb: 1,
                  }}
                />
                <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '1.05rem', color: textPrimary, mb: 0.8 }}>
                  {shot.title}
                </Typography>
                <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.65 }}>
                  {shot.desc}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* ZothOS-Lite v1.0 & Chain of Thoughts (zoth-cot) Monotone Showcase */}
      <Box
        sx={{
          mb: 10,
          p: { xs: 2.5, md: 4 },
          bgcolor: '#000000',
          color: '#FFFFFF',
          border: '2px solid #FFFFFF',
          boxShadow: '6px 6px 0px #D4AF37',
          fontFamily: mono,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
            pb: 2,
            mb: 3,
            borderBottom: '1px solid #FFFFFF',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box
              sx={{
                px: 1.2,
                py: 0.4,
                bgcolor: '#FFFFFF',
                color: '#000000',
                fontWeight: 900,
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
              }}
            >
              ▓▒░ ZOTHOS-LITE v1.0 + CHAIN OF THOUGHTS (zoth-cot) ░▒▓
            </Box>
            <Typography sx={{ fontFamily: mono, fontSize: '0.76rem', color: '#FFFFFF', letterSpacing: '0.06em' }}>
              AMNESIC RAM-ONLY OS • AZOTH BRAILLE AI • KOKORO 82M ONNX VOICE • MERKLE WORKING MEMORY DAG
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              component="a"
              href="https://github.com/NullAITech/chain-of-thoughts"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#FFFFFF',
                color: '#000000',
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.72rem',
                borderRadius: 0,
                border: '1px solid #FFFFFF',
                px: 1.8,
                '&:hover': { bgcolor: '#D4AF37', color: '#000000' },
              }}
            >
              [ ◈ CHAIN OF THOUGHTS REPO ↗ ]
            </Button>
            <Button
              component="a"
              href="https://github.com/NullAITech/zothos-lite"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#000000',
                color: '#FFFFFF',
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.72rem',
                borderRadius: 0,
                border: '1px solid #FFFFFF',
                px: 1.8,
                '&:hover': { bgcolor: '#FFFFFF', color: '#000000' },
              }}
            >
              [ ZOTHOS-LITE v1.0 REPO ↗ ]
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
          <Box>
            <Typography sx={{ fontFamily: mono, fontWeight: 900, fontSize: { xs: '1.15rem', md: '1.4rem' }, color: '#FFFFFF', mb: 1, textTransform: 'uppercase' }}>
              Amnesic Monotone Workstation (`toram noswap`) + Cryptographic Working Memory DAG
            </Typography>
            <Typography sx={{ fontFamily: mono, fontSize: '0.82rem', color: '#E2E8F0', lineHeight: 1.65, mb: 2.5 }}>
              ZothOS-Lite v1.0 boots an amnesic RAM-only Debian/Kali/Parrot substrate (`:8145`) featuring <strong>AZOTH</strong> (Embodied `U+2800` Braille AI Agent with 6 mood rigs & real-time phoneme lip-sync), <strong>Kokoro 82M ONNX Neural TTS + Full-Duplex Mic STT</strong>, a <strong>3D Perspective Tunnel Matrix</strong>, the <strong>Sovereign Horology Niche Clock</strong> (`[⠅⠉] ⠴ @264.9 • 0x3925 • UTC`), and <strong>Chain of Thoughts (`zoth-cot`)</strong> — our multi-turn working memory & SHA-256 Merkle thought chain engine.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.2 }}>
              {[
                { code: 'COT-DAG', name: '◈ Chain of Thoughts (zoth-cot)', desc: 'Multi-turn /api/chat context, auto semantic fact extraction & SHA-256 Merkle chain (N00 -> N01...)' },
                { code: 'AZOTH-AI', name: 'AZOTH Embodied Braille AI', desc: '6 full-body mood rigs, real-time mouth phoneme lip-sync & 8 LLM provider connectors' },
                { code: 'KOKORO', name: 'Kokoro 82M ONNX Voice + Mic STT', desc: 'Offline 24kHz neural voice synthesis (af_bella, am_adam) + full-duplex microphone speech-to-text' },
                { code: 'HOROLOGY', name: 'Sovereign Horology Niche Clock', desc: '8-dot U+2800 Braille BCD matrix, 16-bit Hex-Chron, Swatch .beats, GMST Sidereal & Julian Date' },
              ].map((item) => (
                <Box key={item.code} sx={{ p: 1.4, border: '1px solid #FFFFFF', bgcolor: '#050505' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography sx={{ fontFamily: mono, fontSize: '0.74rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ px: 0.6, bgcolor: '#FFFFFF', color: '#000000', fontSize: '0.62rem', fontWeight: 900 }}>
                      {item.code}
                    </Box>
                  </Box>
                  <Typography sx={{ fontFamily: mono, fontSize: '0.7rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 2, border: '1px solid #FFFFFF', bgcolor: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontFamily: mono, fontSize: '0.74rem', fontWeight: 800, color: '#D4AF37', mb: 1, letterSpacing: '0.08em' }}>
                ┌─ CHAIN OF THOUGHTS (zoth-cot) TERMINAL ─┐
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 1.5,
                  border: '1px solid #FFFFFF',
                  bgcolor: '#000000',
                  color: '#FFFFFF',
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  lineHeight: 1.55,
                  overflowX: 'auto',
                }}
              >
{`$ zoth-cot status
[◈] CHAIN OF THOUGHTS // WORKING MEMORY DAG
[◈] Active Session : zoth-cot-default
[◈] Thought Nodes  : 2 (N00 -> N01 -> N02)
[◈] Pinned Facts   : 4 ([IDENTITY] codename: FALCON-7)

$ zoth-cot pin TARGET_HOST "10.0.2.15 (QEMU Bridge)"
[+] Pinned fact [MEMORY] TARGET_HOST = "10.0.2.15"

$ zoth-cot recall FALCON-7
[✓] Node N01 (hash: 93d81fa8c410) -> codename FALCON-7`}
              </Box>
            </Box>
            <Box sx={{ mt: 1.5, pt: 1.2, borderTop: '1px dashed #FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography sx={{ fontFamily: mono, fontSize: '0.68rem', color: '#FFFFFF' }}>
                ⣿ [⠅⠉] ⠴ @264.9 • 0x3925 • 100% OPEN ACCESS
              </Typography>
              <Typography sx={{ fontFamily: mono, fontSize: '0.68rem', fontWeight: 800, color: '#D4AF37' }}>
                75+ KALI & PARROT CLI TOOLS
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Feature Comparison Matrix */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          03 / 04 · DISTRO BENCHMARK MATRIX
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Why Engineers Switch to <span className="text-gradient-gold">ZothOS v3.3.0</span>
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${goldBorder}`,
            bgcolor: cardBg,
            overflowX: 'auto',
          }}
        >
          <Table sx={{ minWidth: 660 }}>
            <TableHead sx={{ bgcolor: isDark ? 'rgba(212, 175, 55, 0.08)' : '#FEF9E7' }}>
              <TableRow>
                <TableCell sx={{ fontFamily: mono, fontWeight: 800, color: textPrimary }}>Capability</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 900, color: gold }}>ZothOS Linux v3.3.0</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 700, color: textSecondary }}>Kali Linux</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 700, color: textSecondary }}>Parrot OS</TableCell>
                <TableCell sx={{ fontFamily: mono, fontWeight: 700, color: textSecondary }}>Ubuntu LTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {COMPARISON_ROWS.map((row) => (
                <TableRow key={row.feature} hover>
                  <TableCell sx={{ fontWeight: 700, color: textPrimary, fontSize: '0.86rem' }}>{row.feature}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: gold, fontFamily: mono, fontSize: '0.8rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: gold }} />
                      {row.zoth}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: textSecondary, fontSize: '0.8rem', fontFamily: mono }}>{row.kali}</TableCell>
                  <TableCell sx={{ color: textSecondary, fontSize: '0.8rem', fontFamily: mono }}>{row.parrot}</TableCell>
                  <TableCell sx={{ color: textSecondary, fontSize: '0.8rem', fontFamily: mono }}>{row.ubuntu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Sovereign Ecosystem Funnel */}
      <SovereignFunnel
        title="Deploy ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 & Sovereign Ecosystem"
        subtitle="Flash ZothOS v3.3.0 to bare metal or KVM, launch the Zoth Studio v2 web cockpit, or build a custom live-build ISO tailored to your agent swarm."
        toolTitle="Option 1: ZothOS Linux v3.3.0 & ZothOS-Lite v1.0 ISO"
        toolTag="HYBRID UEFI ISO"
        toolDescription="Bootable Debian 13 + Kali/Parrot dual-parity Linux OS with KDE Plasma 6.3 Wayland and 22 loopback enclaves."
        toolRepo="https://github.com/NullAITech/zoth-os"
        toolCommand="git clone https://github.com/NullAITech/zoth-os.git && cd zoth-os"
        studioRepo="https://github.com/NullAITech/zoth-studio-v2"
        osRepo="https://github.com/NullAITech/zoth-os"
      />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Container>
  );
}
