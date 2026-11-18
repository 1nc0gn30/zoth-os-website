import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link, Chip, Stack, Button, Unstable_Grid2 as Grid, useTheme } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import TerminalIcon from '@mui/icons-material/Terminal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ZothosAsciiLogo from './ZothosAsciiLogo';
import ProductHuntBadges from './ProductHuntBadges';
import { safeCopyText } from '../utils/clipboard';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';
const SOLANA_TIP = 'GG2eQbVh8ut1BK6j1A2tz7pSySdLpD38BgyEhGcxdXoK';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const linkColor = isDark ? '#94A3B8' : '#334155';
  const [copiedSol, setCopiedSol] = useState(false);

  const handleCopySol = async () => {
    await safeCopyText(SOLANA_TIP);
    setCopiedSol(true);
    setTimeout(() => setCopiedSol(false), 2000);
  };

  const osSections = [
    { label: 'ZothOS v3.4.0 & Lite v1.2 Overview', to: '/' },
    { label: 'Zoth-Pill Live Desktop & Shell', to: '/desktop' },
    { label: '23+ Loopback Daemons (:8102, :8094, :8140)', to: '/daemons' },
    { label: 'Kali + Parrot Arsenal & Zoth Vault (:8787)', to: '/security' },
    { label: 'MCP (163 Catalog) & AX Playground', to: '/mcp' },
    { label: 'Download ISO & Custom Live-Build Studio', to: '/download' },
    { label: 'System Codex & APT Pinning Specs', to: '/docs' },
  ];

  const ecosystemLinks = [
    { label: 'NullAI Platform (nullai.tech)', href: 'https://nullai.tech' },
    { label: 'Zoth Studio v2 — 80 Sovereign Tools (zoth.nullai.tech)', href: 'https://zoth.nullai.tech' },
    { label: 'ZothOS-Lite v1.2 Live OS (zothos-lite.nullai.tech)', href: 'https://zothos-lite.nullai.tech' },
    { label: 'Zoth Civilization — 23 Pantheon Agents', href: 'https://zoth-civilization.netlify.app' },
    { label: 'ZothNet — 3-Hop Sphinx Mixnet (zothnet.nullai.tech)', href: 'https://zothnet.nullai.tech' },
    { label: 'FieldKit — Offline Field Ops (nullai.tech/fieldkit)', href: 'https://nullai.tech/fieldkit' },
    { label: '1nc0gn30 Hub (1nc0gn30.si)', href: 'https://1nc0gn30.si' },
    { label: 'ZothOS Portal Repo (1nc0gn30/zoth-os-website)', href: 'https://github.com/1nc0gn30/zoth-os-website' },
  ];

  const trustAndStandards = [
    { label: 'Terms of Service', href: '/terms.html' },
    { label: 'Zero-Egress Privacy Policy', href: '/privacy.html' },
    { label: 'Operator Support & FAQ Hub', href: '/support.html' },
    { label: 'MCP Manifest (.well-known/mcp.json)', href: '/.well-known/mcp.json' },
    { label: 'A2A Agent Card (.well-known/agent.json)', href: '/.well-known/agent.json' },
    { label: 'LLM Context (llms.txt)', href: '/llms.txt' },
    { label: 'LLM Deep Corpus (llms-full.txt)', href: '/llms-full.txt' },
    { label: 'Sitemap Index (sitemap.xml)', href: '/sitemap.xml' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: `1px solid ${isDark ? '#26262F' : 'rgba(138, 101, 8, 0.32)'}`,
        bgcolor: isDark ? '#06070B' : '#EFECE6',
        pt: { xs: 6, md: 8 },
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* 100% Open-Access & Buy Us a Coffee Support Strip */}
        <Box
          sx={{
            p: { xs: 2.2, md: 2.8 },
            mb: 5,
            borderRadius: 3,
            bgcolor: isDark ? '#0C0E16' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(212,175,55,0.32)' : '#D9C26C'}`,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.72rem', color: gold, letterSpacing: '0.1em', mb: 0.4 }}>
              100% FREE &amp; OPEN-ACCESS SOVEREIGN INFRASTRUCTURE • ZERO PAYWALLS
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#CBD5E1' : '#334155', lineHeight: 1.55 }}>
              ZothOS v3.4.0, ZothOS-Lite v1.2, all 80 preloaded sovereign tools, and the custom ISO synthesis studio are unlocked forever. Support independent open-source engineering:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, alignItems: 'center', flexShrink: 0 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              href="https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.75rem', minHeight: 38 }}
            >
              ☕ Buy Us a Coffee
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCopySol}
              startIcon={copiedSol ? <CheckIcon sx={{ fontSize: 15 }} /> : <ContentCopyIcon sx={{ fontSize: 15 }} />}
              sx={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: '0.72rem',
                minHeight: 38,
                color: gold,
                borderColor: gold,
              }}
            >
              {copiedSol ? 'Copied Solana Tip!' : 'Copy SOL: GG2eQb...dXoK'}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid xs={12} md={4.5}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2.2 }}>
              <ZothosAsciiLogo size="md" />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: linkColor,
                maxWidth: 440,
                lineHeight: 1.7,
                mb: 2.5,
                borderLeft: `2px solid ${gold}`,
                pl: 2,
              }}
            >
              Debian 13 (Trixie) + KDE Plasma 6 Wayland Sovereign AI Workstation shipping 23+ localhost daemons (:8102 Agent Bridge, :8094 STDP Neuro-Memory, :8140 Vaēlor L1), Hermes-Zoth orchestrator, 80 preloaded sovereign tools (56 Web/WebGPU + 24 CLI across 79 public GitHub repos), and companion ZothOS-Lite v1.2 Amnesic toram Live OS.
            </Typography>

            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<TerminalIcon sx={{ fontSize: '0.88rem !important', color: `${isDark ? '#34D399' : '#047857'} !important` }} />}
                label="23+ DAEMONS • 80 TOOLS"
                size="small"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  bgcolor: isDark ? 'rgba(52,211,153,0.1)' : '#ECFDF5',
                  color: isDark ? '#34D399' : '#047857',
                  border: `1px solid ${isDark ? 'rgba(52,211,153,0.35)' : '#A7F3D0'}`,
                }}
              />
              <Chip
                icon={<ShieldIcon sx={{ fontSize: '0.88rem !important', color: `${gold} !important` }} />}
                label="< 55.0°C • ZERO TELEMETRY"
                size="small"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  bgcolor: isDark ? 'rgba(212,175,55,0.1)' : '#FEF9E7',
                  color: gold,
                  border: `1px solid ${gold}`,
                }}
              />
            </Stack>
            <Box sx={{ mt: 2.5 }}>
              <ProductHuntBadges />
            </Box>
          </Grid>

          <Grid xs={12} sm={4} md={2.5}>
            <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem', color: gold, letterSpacing: '0.12em', mb: 2 }}>
              ZOTHOS PLATFORM
            </Typography>
            <Stack spacing={1.1}>
              {osSections.map((item) => (
                <Link
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{ color: linkColor, fontSize: '0.84rem', textDecoration: 'none', '&:hover': { color: gold } }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid xs={12} sm={4} md={3}>
            <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem', color: gold, letterSpacing: '0.12em', mb: 2 }}>
              SOVEREIGN ECOSYSTEM
            </Typography>
            <Stack spacing={1.1}>
              {ecosystemLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: linkColor,
                    fontSize: '0.83rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': { color: gold },
                  }}
                >
                  {item.label}
                  <OpenInNewIcon sx={{ fontSize: '0.72rem', opacity: 0.6, flexShrink: 0 }} />
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid xs={12} sm={4} md={2}>
            <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem', color: gold, letterSpacing: '0.12em', mb: 2 }}>
              LEGAL &amp; INDEXATION
            </Typography>
            <Stack spacing={1.1}>
              {trustAndStandards.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  sx={{ color: linkColor, fontSize: '0.84rem', textDecoration: 'none', '&:hover': { color: gold } }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            fontFamily: mono,
            fontSize: '0.75rem',
            color: linkColor,
          }}
        >
          <Box>
            Engineered by{' '}
            <Link href="https://1nc0gn30.si" target="_blank" rel="noopener noreferrer" sx={{ color: gold, textDecoration: 'none', fontWeight: 800 }}>
              Neal Frazier Tech
            </Link>{' '}
            (
            <Link href="https://github.com/1nc0gn30/zoth-os-website" target="_blank" rel="noopener noreferrer" sx={{ color: gold, textDecoration: 'none', fontWeight: 800 }}>
              @1nc0gn30
            </Link>
            ) •{' '}
            <Link href="https://nullai.tech" target="_blank" rel="noopener noreferrer" sx={{ color: gold, textDecoration: 'none', fontWeight: 800 }}>
              NullAI Platform
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: gold, fontWeight: 800, textDecoration: 'none' }}
            >
              ☕ Buy Us a Coffee
            </Link>
            <Link
              href={`solana:${SOLANA_TIP}`}
              sx={{ color: linkColor, textDecoration: 'none', overflowWrap: 'anywhere' }}
            >
              SOL: <code>{SOLANA_TIP}</code>
            </Link>
            <Link href="/terms.html" sx={{ color: linkColor, textDecoration: 'none' }}>Terms</Link>
            <Link href="/privacy.html" sx={{ color: linkColor, textDecoration: 'none' }}>Privacy</Link>
            <Link href="/support.html" sx={{ color: linkColor, textDecoration: 'none' }}>Support</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
