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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProductHuntBadges from '../components/ProductHuntBadges';
import { safeCopyText } from '../utils/clipboard';
import {
  HeroReveal,
  HeroItem,
  GlowLine,
  StaggerChildren,
  StaggerItem,
} from '../components/MotionReveal';
import InteractiveDesktopPreview from '../components/InteractiveDesktopPreview';
import SovereignFunnel from '../components/SovereignFunnel';
import UncommonTelemetryDeck from '../components/UncommonTelemetryDeck';
import EditionBootAdvisor from '../components/EditionBootAdvisor';
import ZothosAsciiLogo from '../components/ZothosAsciiLogo';
import { resolveTone } from '../theme';
import {
  CORE_PILLARS,
  AGENT_SECURITY_RINGS,
  DESKTOP_SCREENSHOTS,
  COMPARISON_ROWS,
  ECOSYSTEM_SURFACES,
} from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

export default function HomePage() {
  const [toast, setToast] = useState(null);
  const [activePill, setActivePill] = useState('gold');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const gold = isDark ? '#D4AF37' : '#8A6508';
  const goldSoft = isDark ? '#F5E6AB' : '#785706';
  const goldWash = isDark ? 'rgba(212, 175, 55, 0.12)' : '#FEF9E7';
  const goldBorder = isDark ? 'rgba(212, 175, 55, 0.35)' : '#D9C26C';
  const textPrimary = isDark ? '#F1F5F9' : '#0A0D14';
  const textSecondary = isDark ? '#94A3B8' : '#475467';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';

  const copyCmd = async (text, label) => {
    await safeCopyText(text);
    setToast(`Copied ${label} to clipboard!`);
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <HeroReveal>
        <HeroItem>
          <GlowLine color={gold} glowColor="rgba(212, 175, 55, 0.45)" />
        </HeroItem>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
            gap: { xs: 4, lg: 5 },
            alignItems: 'center',
            mt: 3,
            mb: 5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <HeroItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  label="ZOTHOS v3.4.0 • DEBIAN 13 TRIXIE + KDE PLASMA 6 WAYLAND"
                  size="small"
                  sx={{
                    height: 'auto',
                    maxWidth: '100%',
                    bgcolor: goldWash,
                    color: goldSoft,
                    border: `1px solid ${goldBorder}`,
                    fontWeight: 800,
                    fontFamily: mono,
                    fontSize: '0.68rem',
                    '& .MuiChip-label': { whiteSpace: 'normal', py: 0.4 },
                  }}
                />
                <Chip
                  label="80 SOVEREIGN TOOLS (56 WEB/WEBGPU + 24 CLI • 79 REPOS)"
                  size="small"
                  sx={{
                    height: 'auto',
                    maxWidth: '100%',
                    bgcolor: isDark ? 'rgba(52, 211, 153, 0.12)' : '#ECFDF5',
                    color: isDark ? '#34D399' : '#047857',
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    fontWeight: 800,
                    fontFamily: mono,
                    fontSize: '0.68rem',
                    '& .MuiChip-label': { whiteSpace: 'normal', py: 0.4 },
                  }}
                />
                <Chip
                  label="ZOTHOS-LITE v1.2 • TORAM LIVE USB • 56 MODELS • SPHINX MIXNET"
                  size="small"
                  sx={{
                    height: 'auto',
                    maxWidth: '100%',
                    bgcolor: isDark ? '#F7F7F4' : '#0A0D14',
                    color: isDark ? '#000000' : '#F7F7F4',
                    fontWeight: 800,
                    fontFamily: mono,
                    fontSize: '0.68rem',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      py: 0.4,
                      color: isDark ? '#000000 !important' : '#F7F7F4 !important',
                    },
                  }}
                />
              </Box>
            </HeroItem>

            <HeroItem>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.15rem', sm: '3.05rem', md: '3.65rem' },
                  color: textPrimary,
                  lineHeight: 1.05,
                  mb: 2.2,
                }}
              >
                Sovereign AI Operating System —{' '}
                <Box component="span" className="text-gradient-gold">
                  Built for Agents &amp; Operators
                </Box>
              </Typography>
            </HeroItem>

            <HeroItem>
              <Typography
                sx={{
                  color: textSecondary,
                  fontSize: { xs: '0.96rem', md: '1.05rem' },
                  lineHeight: 1.68,
                  maxWidth: '64ch',
                  mb: 3.2,
                }}
              >
                <strong>ZothOS v3.4.0</strong> transforms Debian 13 (Trixie) + KDE Plasma 6 Wayland into a permission-ringed AI workstation shipping <strong>23+ loopback daemons</strong> (Sovereign Agent Bridge <code>:8102</code>, STDP Neuro-Memory <code>:8094</code>, Vaēlor L1 <code>:8140</code>), the <strong>Hermes-Zoth</strong> orchestrator, and <strong>80 preloaded sovereign tools</strong> (56 Web/WebGPU + 24 CLI across 79 public GitHub repos). Need zero-trace field mobility? Boot <strong>ZothOS-Lite v1.2</strong> completely in RAM (<code>toram</code>) with 56 curated models across 8 providers and ZothNet&apos;s 3-hop Sphinx mixnet.
              </Typography>
            </HeroItem>

            <HeroItem>
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/download"
                  startIcon={<DownloadIcon />}
                  sx={{ px: 2.6, py: 1.15, fontWeight: 800, fontFamily: mono, minHeight: 44 }}
                >
                  Download ISO &amp; Builder →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://zothos-lite.nullai.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    px: 2.4,
                    py: 1.15,
                    fontWeight: 800,
                    fontFamily: mono,
                    minHeight: 44,
                    color: textPrimary,
                    borderColor: isDark ? '#F7F7F4' : '#0A0D14',
                  }}
                >
                  ZothOS-Lite v1.2 Live OS
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/mcp"
                  startIcon={<HubIcon />}
                  sx={{ px: 2.4, py: 1.15, fontWeight: 800, fontFamily: mono, minHeight: 44, borderColor: goldBorder }}
                >
                  MCP &amp; AX Hub (/mcp)
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/desktop"
                  startIcon={<TerminalIcon />}
                  sx={{
                    px: 2.3,
                    py: 1.15,
                    fontWeight: 700,
                    fontFamily: mono,
                    minHeight: 44,
                    color: textPrimary,
                    borderColor: isDark ? 'rgba(255,255,255,0.18)' : '#C8C3B8',
                  }}
                >
                  Desktop Simulator
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://github.com/1nc0gn30/zoth-os"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{
                    px: 2.2,
                    py: 1.15,
                    fontWeight: 700,
                    fontFamily: mono,
                    minHeight: 44,
                    color: textPrimary,
                    borderColor: isDark ? 'rgba(255,255,255,0.18)' : '#C8C3B8',
                  }}
                >
                  GitHub
                </Button>
                <ProductHuntBadges />
              </Box>
            </HeroItem>
          </Box>

          {/* Right Column: Monumental 60fps Interactive ZOTHOS 3D Braille / Lattice / Dither Emblem */}
          <Box sx={{ minWidth: 0, width: '100%' }}>
            <HeroItem>
              <ZothosAsciiLogo size="hero" />
            </HeroItem>
          </Box>
        </Box>
      </HeroReveal>

      {/* Live Unicode U+2800 Braille + Bayer 8x8 Dither Telemetry Deck */}
      <Box sx={{ mb: 7 }}>
        <UncommonTelemetryDeck />
      </Box>

      {/* Flagship Interactive Edition & Hardware Boot Advisor + CLI/Daemon Inspector */}
      <EditionBootAdvisor />

      {/* Live Interactive Zoth-Pill Desktop & Cursor Constellation Showcase */}
      <InteractiveDesktopPreview activePillId={activePill} onSelectPill={setActivePill} />

      {/* Quick Clone & Live-Build Strip */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 9,
          borderRadius: 3,
          bgcolor: isDark ? '#08080B' : '#FFFFFF',
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
            $ git clone https://github.com/1nc0gn30/zoth-os.git &amp;&amp; cd zoth-os &amp;&amp; sudo ./build/build-iso.sh
          </Typography>
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            copyCmd(
              'git clone https://github.com/1nc0gn30/zoth-os.git && cd zoth-os && sudo ./build/build-iso.sh',
              'ZothOS ISO build command',
            )
          }
          startIcon={<ContentCopyIcon />}
          sx={{
            fontFamily: mono,
            fontWeight: 800,
            fontSize: '0.75rem',
            color: gold,
            borderColor: goldBorder,
            whiteSpace: 'nowrap',
            minHeight: 40,
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
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          01 / 05 · DUAL-SOVEREIGNTY PARADIGM
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 1.5 }}>
          Engineered for <span className="text-gradient-gold">Autonomous AI Agents</span> — Commanded by Humans
        </Typography>
        <Typography sx={{ color: textSecondary, maxWidth: '72ch', mb: 4, lineHeight: 1.7 }}>
          On conventional Linux distros, AI agents either run blind inside isolated containers or run unbridled with full access to your SSH keys. ZothOS unifies both worlds across one Debian 13 (Trixie) + Linux 6.12 substrate.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3, mb: 5 }}>
          <Paper
            elevation={0}
            className="card-border-beam"
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3.5,
              bgcolor: cardBg,
              border: `1.5px solid ${gold}`,
              minWidth: 0,
            }}
          >
            <Chip
              label="PRIMARY INHABITANTS • AUTONOMOUS AI AGENTS"
              size="small"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: goldWash,
                color: goldSoft,
                border: `1px solid ${goldBorder}`,
                mb: 2,
                '& .MuiChip-label': { whiteSpace: 'normal', py: 0.35 },
              }}
            />
            <Typography variant="h4" sx={{ color: textPrimary, mb: 1.5 }}>
              Ring-Gated Agent Bridge (:8102) &amp; Memory Mesh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                'Sovereign Agent Bridge (:8102) & Hermes-Zoth Orchestrator: Coordinates multi-agent tool calls with Ed25519 capability leases and Ring 0–3 kernel isolation.',
                'STDP Neuro-Memory (:8094) + Chain of Thoughts (zoth-cot): Spike-Timing-Dependent Plasticity vector cortex paired with SHA-256 Merkle thought chains.',
                'Vaēlor L1 (:8140) Consensus Ledger: 100-Agent Proof-of-Useful-Work (PoUW) DAG blockchain with BLAKE2b state verification.',
                '163 Pre-Registered MCP Catalog & zoth-relay (:8765): Landlock multi-agent bridge with 288-bit scoped tokens and isolated workspaces.',
                'Zero-Disk Secret Injection (:8787): zoth-vault run -- <agent> injects Argon2id + ChaCha20 keys directly into child process RAM.',
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
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3.5,
              bgcolor: cardBg,
              border: `1.5px solid ${resolveTone('#10B981', isDark)}`,
              minWidth: 0,
            }}
          >
            <Chip
              label="HUMAN COMMAND DECK • SOVEREIGN WORKSTATION"
              size="small"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: isDark ? 'rgba(52, 211, 153, 0.14)' : '#ECFDF5',
                color: resolveTone('#34D399', isDark),
                border: '1px solid rgba(52, 211, 153, 0.35)',
                mb: 2,
                '& .MuiChip-label': { whiteSpace: 'normal', py: 0.35 },
              }}
            />
            <Typography variant="h4" sx={{ color: textPrimary, mb: 1.5 }}>
              KDE Plasma 6 Wayland + 80 Sovereign Tools
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              {[
                '24K Celtic Gold KDE Plasma 6 Wayland Desktop: Zoth-Hermetic 3D glass icons, 60 FPS interactive QML wallpaper (:9989), and zoth-cockpit TUI/GUI.',
                '80 Preloaded Sovereign Tools: 56 in-browser/WebGPU workstations + 24 CLI/daemon engines backed by 79 public GitHub repositories.',
                'Debian 13 (Trixie) + Kali + Parrot Parity: Surgical APT pinning (900 Debian, 400 Kali/Parrot) delivers offensive security tools with zero dependency breakage.',
                'ZothOS-Lite v1.2 Companion USB: Tails-style Monotone (#F7F7F4 / #000000) toram Live OS with 56 curated models across 8 providers & ZothNet Sphinx mixnet.',
                'Whisper-Quiet Self-Healing Hardware: zoth-sentinel + zoth-heal maintain < 55.0°C CPU ceiling at 0 RPM fan noise.',
              ].map((bullet) => (
                <Box key={bullet} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: resolveTone('#10B981', isDark), mt: 0.3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.6 }}>
                    {bullet}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* 4 Hardware/OS Agent Security Rings (/etc/zothos/agent-permissions.json) */}
        <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.76rem', color: gold, letterSpacing: '0.12em', mb: 1.5 }}>
          HARDWARE &amp; KERNEL ENFORCED • /ETC/ZOTHOS/AGENT-PERMISSIONS.JSON (RINGS 0–3)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {AGENT_SECURITY_RINGS.map((r) => {
            const ringTone = resolveTone(r.accent, isDark);
            return (
              <Paper
                key={r.ring}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: cardBg,
                  border: `1px solid ${ringTone}66`,
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
                      bgcolor: `${ringTone}18`,
                      color: ringTone,
                      border: `1px solid ${ringTone}`,
                    }}
                  />
                  <Typography variant="caption" sx={{ fontFamily: mono, fontWeight: 700, color: textSecondary, fontSize: '0.66rem' }}>
                    {r.ramCap}
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem', color: ringTone, mb: 0.4 }}>
                  {r.layer}
                </Typography>
                <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.92rem', color: textPrimary, mb: 1 }}>
                  {r.title}
                </Typography>
                <Typography variant="body2" sx={{ color: textSecondary, fontSize: '0.78rem', lineHeight: 1.55, flex: 1, mb: 1.5 }}>
                  {r.desc}
                </Typography>
                <Box sx={{ pt: 1, borderTop: `1px dashed ${isDark ? 'rgba(255,255,255,0.12)' : '#D0D5DD'}` }}>
                  <Typography variant="caption" sx={{ display: 'block', fontFamily: mono, fontSize: '0.66rem', color: textSecondary }}>
                    <strong>Sandbox:</strong> {r.isolation}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', fontFamily: mono, fontSize: '0.66rem', color: textSecondary }}>
                    <strong>Budget:</strong> {r.tokenBudget}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Box>

      {/* 6 Core OS Pillars Grid */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          02 / 05 · ARCHITECTURAL FOUNDATION
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Six Pillars of <span className="text-gradient-gold">ZothOS v3.4.0 &amp; ZothOS-Lite v1.2</span>
        </Typography>

        <StaggerChildren>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>
            {CORE_PILLARS.map((p) => {
              const pillarTone = resolveTone(p.accent, isDark);
              return (
                <StaggerItem key={p.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3.2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3.5,
                      bgcolor: cardBg,
                      border: `1px solid ${isDark ? 'rgba(212, 175, 55, 0.22)' : '#DDD9CE'}`,
                      transition: 'transform 0.25s ease, border-color 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: pillarTone,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 2 }}>
                      <SecurityIcon sx={{ color: pillarTone, fontSize: 26, flexShrink: 0 }} />
                      <Chip
                        label={p.badge}
                        size="small"
                        sx={{
                          height: 'auto',
                          fontSize: '0.62rem',
                          fontFamily: mono,
                          fontWeight: 800,
                          bgcolor: `${pillarTone}16`,
                          color: pillarTone,
                          border: `1px solid ${pillarTone}55`,
                          '& .MuiChip-label': { whiteSpace: 'normal', py: 0.3 },
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ color: textPrimary, fontSize: '1.08rem', mb: 1 }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textSecondary, lineHeight: 1.66, flex: 1 }}>
                      {p.desc}
                    </Typography>
                  </Paper>
                </StaggerItem>
              );
            })}
          </Box>
        </StaggerChildren>
      </Box>

      {/* ZothOS-Lite v1.2 (#F7F7F4 / #000000) & ZothNet Sphinx Mixnet Monotone Showcase */}
      <Box
        className="card-border-beam-lite"
        sx={{
          mb: 10,
          p: { xs: 2.2, sm: 3, md: 4 },
          borderRadius: 3.5,
          bgcolor: '#000000',
          color: '#F7F7F4',
          border: '2px solid #F7F7F4',
          boxShadow: '0 18px 44px -12px rgba(0,0,0,0.55)',
          fontFamily: mono,
          maxWidth: '100%',
          width: '100%',
          boxSizing: 'border-box',
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
            borderBottom: '1px solid rgba(247, 247, 244, 0.35)',
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexWrap: 'wrap', minWidth: 0 }}>
            <Box
              sx={{
                px: 1.2,
                py: 0.45,
                bgcolor: '#F7F7F4',
                color: '#000000',
                fontWeight: 900,
                fontSize: { xs: '0.68rem', sm: '0.74rem' },
                letterSpacing: '0.08em',
              }}
            >
              ▓▒░ ZOTHOS-LITE v1.2 • #F7F7F4 / #000000 MONOTONE LIVE OS ░▒▓
            </Box>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                color: '#F7F7F4',
                letterSpacing: '0.04em',
                overflowWrap: 'anywhere',
              }}
            >
              TORAM ZERO-TRACE BOOT • 56 MODELS (8 PROVIDERS) • ZOTHNET 3-HOP SPHINX MIXNET
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              component="a"
              href="https://zothos-lite.nullai.tech"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#F7F7F4',
                color: '#000000',
                fontFamily: mono,
                fontWeight: 900,
                fontSize: '0.72rem',
                borderRadius: 1,
                border: '1px solid #F7F7F4',
                px: 1.6,
                minHeight: 36,
                '&:hover': { bgcolor: '#D4AF37', color: '#000000' },
              }}
            >
              zothos-lite.nullai.tech ↗
            </Button>
            <Button
              component="a"
              href="https://zothnet.nullai.tech"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                bgcolor: '#000000',
                color: '#F7F7F4',
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.72rem',
                borderRadius: 1,
                border: '1px solid #F7F7F4',
                px: 1.6,
                minHeight: 36,
                '&:hover': { bgcolor: '#F7F7F4', color: '#000000' },
              }}
            >
              ZothNet Sphinx Mixnet ↗
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
            gap: { xs: 2.5, md: 3 },
            minWidth: 0,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#F7F7F4',
                mb: 1.2,
                overflowWrap: 'anywhere',
              }}
            >
              Tails-Style Amnesic Live USB/ISO (`toram`) on Universal x86_64 Hardware
            </Typography>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.8rem',
                color: '#E2E8F0',
                lineHeight: 1.65,
                mb: 2.5,
              }}
            >
              Engineered in crisp Tails-style Monotone (<code>#F7F7F4</code> Alabaster Paper &amp; <code>#000000</code> Obsidian Ink), <strong>ZothOS-Lite v1.2</strong> loads 100% into volatile RAM (<code>toram noswap</code>) so zero forensic artifacts touch host drives. Includes <strong>56 curated AI models across 8 providers</strong>, <strong>ZothNet 3-hop Sphinx mixnet</strong> onion transport, <strong>AZOTH</strong> embodied <code>U+2800</code> Braille voice agent, and optional USB/cloud encrypted persistence (<code>zoth-lite-storage</code>).
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 1.2,
              }}
            >
              {[
                { code: '56-MODELS', name: '8-Provider Model Router', desc: 'Ollama Local, Hermes/Nous (DeepSeek Flash), DeepSeek, OpenRouter, OpenAI, Anthropic, Gemini & Groq' },
                { code: 'SPHINX-3H', name: 'ZothNet 3-Hop Mixnet', desc: 'Constant-size Sphinx encrypted cells, decoy cover traffic & zero-cloud P2P relay' },
                { code: 'TORAM', name: 'Zero-Trace Live USB Boot', desc: 'Universal x86_64 UEFI/BIOS Live ISO (~400 MB) running strictly inside volatile RAM' },
                { code: 'VAULT-SYNC', name: 'Optional Encrypted Persistence', desc: 'Opt-in LUKS2 / ChaCha20 USB partition or encrypted cloud sync via zoth-lite-storage' },
              ].map((item) => (
                <Box
                  key={item.code}
                  sx={{
                    p: 1.4,
                    border: '1px solid rgba(247, 247, 244, 0.55)',
                    bgcolor: '#08080A',
                    borderRadius: 1.5,
                    minWidth: 0,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.6, mb: 0.5 }}>
                    <Typography sx={{ fontFamily: mono, fontSize: '0.73rem', fontWeight: 800, color: '#F7F7F4' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ px: 0.6, py: 0.1, bgcolor: '#F7F7F4', color: '#000000', fontSize: '0.6rem', fontWeight: 900, flexShrink: 0 }}>
                      {item.code}
                    </Box>
                  </Box>
                  <Typography sx={{ fontFamily: mono, fontSize: '0.69rem', color: '#CBD5E1', lineHeight: 1.45 }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 1.6, sm: 2 },
              border: '1px solid rgba(247, 247, 244, 0.55)',
              borderRadius: 2,
              bgcolor: '#070709',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minWidth: 0,
            }}
          >
            <Box>
              <Typography sx={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 800, color: '#D4AF37', mb: 1 }}>
                ┌─ ZOTHOS-LITE v1.2 + SPHINX MIXNET SHELL ─┐
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 1.5,
                  border: '1px solid rgba(247, 247, 244, 0.35)',
                  borderRadius: 1.5,
                  bgcolor: '#000000',
                  color: '#F7F7F4',
                  fontFamily: mono,
                  fontSize: { xs: '0.66rem', sm: '0.71rem' },
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}
              >
{`$ zoth-lite-models --list
[✓] 56 Curated Models Across 8 Providers Ready
[★] Active: hermes/deepseek-flash + ollama/qwen2.5-coder

$ zothnet status --hops 3 --sphinx
[✓] 3-Hop Sphinx Circuit Established (0 DNS Leaks)

$ zoth-cot status
[◈] Merkle DAG: N00 -> N01 -> N02 (SHA-256 Verified)`}
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1.5,
                pt: 1.2,
                borderTop: '1px dashed rgba(247, 247, 244, 0.45)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Typography sx={{ fontFamily: mono, fontSize: '0.66rem', color: '#F7F7F4' }}>
                ⣿ MONOTONE #F7F7F4 / #000000 • 100% OPEN ACCESS
              </Typography>
              <Button
                size="small"
                href="https://github.com/1nc0gn30/zothos-lite"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<GitHubIcon sx={{ fontSize: 14 }} />}
                sx={{ fontFamily: mono, fontSize: '0.68rem', fontWeight: 800, color: '#D4AF37', p: 0 }}
              >
                Source Repo
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Sovereign Ecosystem Cross-Surface Constellation */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          03 / 05 · SOVEREIGN ECOSYSTEM CONSTELLATION
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 1.2 }}>
          Connected Across the <span className="text-gradient-gold">NullAI Sovereign Mesh</span>
        </Typography>
        <Typography sx={{ color: textSecondary, maxWidth: '70ch', mb: 4, lineHeight: 1.65 }}>
          ZothOS v3.4.0 and ZothOS-Lite v1.2 interoperate natively with every NullAI research platform, browser workstation, mixnet relay, and field kit.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 2.5,
          }}
        >
          {ECOSYSTEM_SURFACES.map((surface) => {
            const tone = resolveTone(surface.accent, isDark);
            return (
              <Paper
                key={surface.url}
                component="a"
                href={surface.url}
                target="_blank"
                rel="noopener noreferrer"
                elevation={0}
                sx={{
                  p: 2.8,
                  borderRadius: 3,
                  bgcolor: cardBg,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#DDD9CE'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform 0.22s ease, border-color 0.22s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: tone,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1.2 }}>
                  <Chip
                    label={surface.badge}
                    size="small"
                    sx={{
                      fontFamily: mono,
                      fontWeight: 800,
                      fontSize: '0.62rem',
                      bgcolor: `${tone}16`,
                      color: tone,
                      border: `1px solid ${tone}55`,
                    }}
                  />
                  <OpenInNewIcon sx={{ fontSize: 16, color: tone }} />
                </Box>
                <Typography variant="h5" sx={{ color: textPrimary, mb: 0.4 }}>
                  {surface.name}
                </Typography>
                <Typography sx={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 700, color: gold, mb: 1 }}>
                  {surface.domain}
                </Typography>
                <Typography variant="body2" sx={{ color: textSecondary, fontSize: '0.83rem', lineHeight: 1.6, flex: 1 }}>
                  {surface.desc}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>

      {/* Visual System Tour & Authentic Screenshots */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          04 / 05 · VISUAL SYSTEM TOUR
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Inside the <span className="text-gradient-gold">24K Gold Workstation Suite</span>
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}>
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
                <Typography variant="h5" sx={{ fontSize: '1.08rem', color: textPrimary, mb: 0.8 }}>
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

      {/* Feature Comparison Matrix */}
      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            fontFamily: mono,
            color: gold,
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          05 / 05 · DISTRO BENCHMARK MATRIX
        </Typography>
        <Typography variant="h2" sx={{ color: textPrimary, mb: 4 }}>
          Why Engineers Switch to <span className="text-gradient-gold">ZothOS v3.4.0</span>
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
                <TableCell sx={{ fontFamily: mono, fontWeight: 900, color: gold }}>ZothOS v3.4.0 + Lite v1.2</TableCell>
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
                      <CheckCircleIcon sx={{ fontSize: 16, color: gold, flexShrink: 0 }} />
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
        title="Deploy ZothOS v3.4.0, ZothOS-Lite v1.2 & Sovereign Studio"
        subtitle="100% Free & Open-Access: Flash ZothOS v3.4.0 to NVMe/KVM, boot ZothOS-Lite v1.2 in RAM off any USB stick, or run all 80 sovereign tools inside Zoth Studio v2."
        toolTitle="Option 1: ZothOS-Lite v1.2 Live USB"
        toolTag="TORAM • 56 MODELS"
        toolDescription="Amnesic Monotone (#F7F7F4 / #000000) Live USB/ISO OS with toram zero-trace boot, 56 curated models across 8 providers, and ZothNet 3-hop Sphinx mixnet."
        toolRepo="https://github.com/1nc0gn30/zothos-lite"
        toolCommand="git clone https://github.com/1nc0gn30/zothos-lite.git && cd zothos-lite"
        studioRepo="https://github.com/1nc0gn30/zoth-studio-v2"
        osRepo="https://github.com/1nc0gn30/zoth-os"
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
