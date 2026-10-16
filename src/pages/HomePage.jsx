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
              label="AGENT-NATIVE LINUX v3.2 • RING 0–3 ENFORCED"
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
              label="152 MCP SERVERS • ZOTH-RELAY (:8765) • 22 DAEMONS"
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
            <strong>ZothOS Linux v3.2</strong> is engineered from Ring 0 up as a{' '}
            <strong>permission-ringed, self-healing habitat for autonomous AI agents</strong> (
            <code>zoth-agent-os</code>, 152 pre-registered MCP servers, <code>zoth-relay</code> Landlock multi-agent bridge,{' '}
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
              Download ISO &amp; Custom Builder →
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
              Explore MCP &amp; Agent Hub (/mcp)
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
              Live Desktop &amp; Kernel Simulator
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/1nc0gn30/zoth-os"
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
                'Debian 13.7 + Kali + Parrot Parity: Surgical APT pinning (900 Debian Trixie, 400 Kali/Parrot) gives human red-teamers 175+ offensive security tools without rolling-release breakage.',
                '59 Zoth Studio Workstations (/opt/zoth-studio): 28 In-Browser WebGPU/Client studios + 31 Sovereign Loopback Enclaves pre-installed for offline engineering.',
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
          HARDWARE &amp; KERNEL ENFORCED • /ETC/ZOTHOS/AGENT-PERMISSIONS.JSON (RINGS 0–3)
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
          Six Sovereign Pillars of <span className="text-gradient-gold">ZothOS Linux v3.2</span>
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
          Why Engineers Switch to <span className="text-gradient-gold">ZothOS v3.2</span>
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
                <TableCell sx={{ fontFamily: mono, fontWeight: 900, color: gold }}>ZothOS Linux 3.2</TableCell>
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
        title="Deploy ZothOS Linux v3.2 & Sovereign Ecosystem"
        subtitle="Flash ZothOS v3.2 to bare metal or KVM, launch the Zoth Studio v2 web cockpit, or build a custom live-build ISO tailored to your agent swarm."
        toolTitle="Option 1: ZothOS Linux v3.2 ISO"
        toolTag="HYBRID UEFI ISO"
        toolDescription="Bootable Debian 13 + Kali/Parrot dual-parity Linux OS with KDE Plasma 6.3 Wayland and 22 loopback enclaves."
        toolRepo="https://github.com/1nc0gn30/zoth-os"
        toolCommand="git clone https://github.com/1nc0gn30/zoth-os.git && cd zoth-os"
        studioRepo="https://github.com/NullAITech/zoth-studio-v2"
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
