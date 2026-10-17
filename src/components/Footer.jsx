import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link, Chip, Stack, Unstable_Grid2 as Grid, useTheme } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import TerminalIcon from '@mui/icons-material/Terminal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ZothosAsciiLogo from './ZothosAsciiLogo';
import ProductHuntBadges from './ProductHuntBadges';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const linkColor = isDark ? '#94A3B8' : '#1E293B';

  const osSections = [
    { label: 'ZothOS v3.2 Overview', to: '/' },
    { label: 'Zoth-Pill Live Desktop & Terminal', to: '/desktop' },
    { label: '22 Loopback Daemons & 9 AI Agents', to: '/daemons' },
    { label: '175+ Security Arsenal & Zoth Vault', to: '/security' },
    { label: 'MCP & Agent Experience (AX) Hub', to: '/mcp' },
    { label: 'ISO Download & Custom Builder', to: '/download' },
    { label: 'System Codex & APT Architecture', to: '/docs' },
  ];

  const ecosystemLinks = [
    { label: 'Zoth Studio v2 (zoth.nullai.tech)', href: 'https://zoth.nullai.tech' },
    { label: 'ZothOS GitHub Repository', href: 'https://github.com/1nc0gn30/zoth-os' },
    { label: 'NullAI Tech Organization', href: 'https://github.com/NullAITech/zoth-os' },
    { label: 'Neal Frazier Tech Hub', href: 'https://nealfrazier.tech' },
    { label: 'NullAI Platform & Research', href: 'https://nullai.tech' },
    { label: '757 Tech Pro', href: 'https://757tech.pro' },
  ];

  const trustAndStandards = [
    { label: 'Terms of Service', href: '/terms.html' },
    { label: 'Zero-Egress Privacy Policy', href: '/privacy.html' },
    { label: 'Operator Support & FAQ Hub', href: '/support.html' },
    { label: 'MCP Manifest (.well-known/mcp.json)', href: '/.well-known/mcp.json' },
    { label: 'A2A Agent Card (.well-known/agent.json)', href: '/.well-known/agent.json' },
    { label: 'LLM Context (llms-full.txt)', href: '/llms-full.txt' },
    { label: 'Sitemap Index (sitemap.xml)', href: '/sitemap.xml' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: `1px solid ${isDark ? '#26262F' : 'rgba(212, 175, 55, 0.38)'}`,
        bgcolor: isDark ? '#06070B' : '#FFFFFF',
        pt: { xs: 6, md: 8 },
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid xs={12} md={5}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2.2 }}>
              <ZothosAsciiLogo size="md" showTag />
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
              Bootable Debian 13 (Trixie) + Kali Rolling &amp; Parrot OS dual-parity operating system featuring KDE Plasma 6.3 Wayland, 9 pre-installed Frontier AI coding agents, 22 localhost loopback daemons, and Argon2id hardware secrets.
            </Typography>

            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<TerminalIcon sx={{ fontSize: '0.88rem !important', color: `${isDark ? '#34D399' : '#047857'} !important` }} />}
                label="22 LOOPBACK DAEMONS"
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

          <Grid xs={12} sm={4} md={2.5}>
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
                    fontSize: '0.84rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': { color: gold },
                  }}
                >
                  {item.label}
                  <OpenInNewIcon sx={{ fontSize: '0.72rem', opacity: 0.6 }} />
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
            fontSize: '0.76rem',
            color: linkColor,
          }}
        >
          <Box>
            Engineered by <strong>Neal Frazier Tech</strong> (
            <Link href="https://github.com/1nc0gn30/zoth-os" target="_blank" rel="noopener noreferrer" sx={{ color: gold, textDecoration: 'none', fontWeight: 700 }}>
              @1nc0gn30
            </Link>
            ) •{' '}
            <Link href="https://nullai.tech" target="_blank" rel="noopener noreferrer" sx={{ color: gold, textDecoration: 'none', fontWeight: 700 }}>
              NullAI Platform
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link href="/terms.html" sx={{ color: linkColor, textDecoration: 'none' }}>Terms</Link>
            <Link href="/privacy.html" sx={{ color: linkColor, textDecoration: 'none' }}>Privacy</Link>
            <Link href="/support.html" sx={{ color: linkColor, textDecoration: 'none' }}>Support</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
