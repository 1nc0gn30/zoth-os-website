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
              label="ZOTHOS LINUX v3.2 • COSIGN VERIFIED"
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
              label="DEBIAN 13 + KALI + PARROT PARITY"
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
            <Chip
              label="KDE PLASMA 6.3 WAYLAND • 22 DAEMONS"
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
          </Box>
        </HeroItem>

        <HeroItem>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.35rem', sm: '3.5rem', md: '4.65rem' },
              color: textPrimary,
              lineHeight: 1.06,
              mb: 2.5,
            }}
          >
            Sovereign AI, Cryptographic Vault &amp;{' '}
            <Box component="span" className="text-gradient-gold">
              Offensive Security OS
            </Box>
          </Typography>
        </HeroItem>

        <HeroItem>
          <Typography
            sx={{
              color: textSecondary,
              fontSize: { xs: '1.02rem', md: '1.18rem' },
              lineHeight: 1.7,
              maxWidth: '64ch',
              mb: 4,
            }}
          >
            Bootable Linux distribution engineered on Debian 13 (Trixie) with surgical Kali Rolling &amp; Parrot OS dual parity, 9 pre-installed Frontier AI coding agents, 22 zero-egress loopback daemons, and the interactive 24K Gold KDE Plasma 6.3 Wayland desktop.
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
              to="/desktop"
              startIcon={<TerminalIcon />}
              sx={{ px: 3, py: 1.3, fontWeight: 800, fontFamily: mono, borderColor: goldBorder }}
            >
              Launch Live Desktop Simulator
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/daemons"
              startIcon={<HubIcon />}
              sx={{
                px: 2.8,
                py: 1.3,
                fontWeight: 750,
                fontFamily: mono,
                color: textPrimary,
                borderColor: isDark ? 'rgba(255,255,255,0.16)' : '#D0D5DD',
              }}
            >
              Inspect 22 Loopback Daemons
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
            $ git clone https://github.com/1nc0gn30/zoth-os.git &amp;&amp; cd zoth-os &amp;&amp; sudo ./build_iso.sh
          </Typography>
        </Box>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            copyCmd(
              'git clone https://github.com/1nc0gn30/zoth-os.git && cd zoth-os && sudo ./build_iso.sh',
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
