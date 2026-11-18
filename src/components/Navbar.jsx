import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  InputBase,
  useTheme,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ZothosAsciiLogo from './ZothosAsciiLogo';
import { LOOPBACK_DAEMONS, FRONTIER_AGENTS, ECOSYSTEM_SURFACES } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const PRIMARY_NAV = [
  { label: 'Overview', path: '/' },
  { label: 'Desktop Lab', path: '/desktop', badge: 'LIVE' },
  { label: 'Daemons', path: '/daemons', badge: '23+' },
  { label: 'Security Vault', path: '/security', badge: 'Kali+Parrot' },
  { label: 'MCP & AX', path: '/mcp', badge: '163' },
  { label: 'Download ISO', path: '/download', badge: 'v3.4' },
  { label: 'Codex', path: '/docs' },
];

export default function Navbar({ onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  const goldAccent = dark ? '#D4AF37' : '#8A6508';
  const brandColor = dark ? '#F5E6AB' : '#0A0D14';
  const navIdle = dark ? '#9CA3AF' : '#1E293B';
  const navActive = dark ? '#D4AF37' : '#0A0D14';

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const matchedDaemons = LOOPBACK_DAEMONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.port.toLowerCase().includes(query.toLowerCase()) ||
      d.desc.toLowerCase().includes(query.toLowerCase()),
  ).slice(0, 6);

  const matchedAgents = FRONTIER_AGENTS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.cmd.toLowerCase().includes(query.toLowerCase()),
  ).slice(0, 4);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        background: dark
          ? 'linear-gradient(180deg, rgba(14, 15, 22, 0.92) 0%, rgba(8, 8, 11, 0.88) 100%)'
          : 'rgba(247, 247, 244, 0.95)',
        backdropFilter: 'blur(24px) saturate(180%)',
        zIndex: 1100,
        borderBottom: `1px solid ${dark ? 'rgba(212, 175, 55, 0.24)' : 'rgba(138, 101, 8, 0.32)'}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 74, gap: 1 }}>
          {/* Brand Emblem */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Box
              component={RouterLink}
              to="/"
              aria-label="ZOTHOS Home"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <ZothosAsciiLogo size="sm" />
            </Box>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.25, flexShrink: 1, minWidth: 0 }}>
            {PRIMARY_NAV.map((item) => {
              const active =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  size="small"
                  sx={{
                    px: { lg: 1, xl: 1.25 },
                    py: 0.65,
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                    color: active ? navActive : navIdle,
                    fontWeight: active ? 800 : 600,
                    fontSize: { lg: '0.78rem', xl: '0.82rem' },
                    bgcolor: active ? (dark ? 'rgba(212,175,55,0.12)' : '#FEF9E7') : 'transparent',
                    border: active ? `1px solid ${dark ? 'rgba(212,175,55,0.35)' : '#D9C26C'}` : '1px solid transparent',
                    '&:hover': {
                      color: navActive,
                      bgcolor: dark ? 'rgba(212,175,55,0.08)' : '#FEF9E7',
                    },
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        display: { xs: 'none', xl: 'inline-flex' },
                        ml: 0.6,
                        height: 17,
                        fontSize: '0.6rem',
                        fontFamily: mono,
                        fontWeight: 800,
                        bgcolor: dark ? 'rgba(212,175,55,0.18)' : '#FEF9E7',
                        color: goldAccent,
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>

          {/* Right Actions: Search, Lite Link, Theme Pill Toggle, Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65, flexShrink: 0 }}>
            <Tooltip title="Search Daemons, Agents & Ecosystem (⌘K)">
              <Button
                size="small"
                variant="outlined"
                onClick={() => setPaletteOpen(true)}
                startIcon={<SearchIcon sx={{ fontSize: 15 }} />}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  px: 1.1,
                  py: 0.5,
                  minWidth: 0,
                  whiteSpace: 'nowrap',
                  borderColor: dark ? 'rgba(255,255,255,0.16)' : '#C8C3B8',
                  color: 'text.secondary',
                }}
              >
                ⌘K
              </Button>
            </Tooltip>

            <Button
              size="small"
              variant="outlined"
              href="https://zothos-lite.nullai.tech"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
              sx={{
                display: { xs: 'none', xl: 'inline-flex' },
                fontFamily: mono,
                fontSize: '0.7rem',
                fontWeight: 800,
                px: 1.2,
                py: 0.5,
                whiteSpace: 'nowrap',
                borderColor: dark ? '#F7F7F4' : '#0A0D14',
                color: dark ? '#F7F7F4' : '#0A0D14',
              }}
            >
              ZothOS-Lite v1.2
            </Button>

            <Button
              size="small"
              variant="outlined"
              href="https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: { xs: 'none', xl: 'inline-flex' },
                fontFamily: mono,
                fontSize: '0.7rem',
                fontWeight: 800,
                px: 1.15,
                py: 0.5,
                whiteSpace: 'nowrap',
                borderColor: dark ? 'rgba(212,175,55,0.4)' : '#8A6508',
                color: goldAccent,
              }}
            >
              ☕ Coffee
            </Button>

            {/* Obsidian Dark <-> Editorial Alabaster / Monotone Lite Toggle */}
            <Tooltip title={dark ? 'Switch to Editorial Alabaster / Monotone Lite' : 'Switch to Obsidian Dark Mode'}>
              <Button
                aria-label={dark ? 'Switch to Editorial Alabaster Light mode' : 'Switch to Obsidian Dark mode'}
                onClick={onToggleTheme}
                size="small"
                variant="outlined"
                startIcon={dark ? <LightModeIcon sx={{ fontSize: 15 }} /> : <DarkModeIcon sx={{ fontSize: 15 }} />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  px: 1.2,
                  py: 0.5,
                  minHeight: 36,
                  whiteSpace: 'nowrap',
                  borderColor: dark ? 'rgba(212,175,55,0.4)' : '#8A6508',
                  color: goldAccent,
                  bgcolor: dark ? 'rgba(212,175,55,0.08)' : '#FFFFFF',
                }}
              >
                {dark ? 'Alabaster' : 'Obsidian'}
              </Button>
            </Tooltip>

            <IconButton
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleTheme}
              sx={{
                display: { xs: 'inline-flex', sm: 'none' },
                border: `1px solid ${dark ? 'rgba(212,175,55,0.35)' : '#8A6508'}`,
                color: goldAccent,
                width: 44,
                height: 44,
              }}
            >
              {dark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: brandColor, width: 44, height: 44 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: dark ? '#08080B' : '#F7F7F4',
            borderLeft: `1px solid ${goldAccent}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ZothosAsciiLogo size="sm" />
          <IconButton aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} sx={{ width: 44, height: 44 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {PRIMARY_NAV.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{ minHeight: 46 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontFamily: mono, fontWeight: 700, fontSize: '0.88rem' }}
                />
                {item.badge && <Chip label={item.badge} size="small" sx={{ fontFamily: mono, fontSize: '0.65rem' }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              onToggleTheme();
              setMobileOpen(false);
            }}
            sx={{ fontFamily: mono, fontWeight: 800, minHeight: 44 }}
          >
            {dark ? '☀ Switch to Alabaster Light' : '☾ Switch to Obsidian Dark'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            href="https://zothos-lite.nullai.tech"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontFamily: mono, fontWeight: 700, minHeight: 44 }}
          >
            ZothOS-Lite v1.2 Live OS ↗
          </Button>
          <Button
            variant="outlined"
            fullWidth
            href="https://zoth.nullai.tech"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontFamily: mono, fontWeight: 700, minHeight: 44 }}
          >
            Zoth Studio v2 (80 Tools) ↗
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            href="https://buy.stripe.com/3cIfZg27PdKo2D64Ocfw40X"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontFamily: mono, fontWeight: 800, minHeight: 44 }}
          >
            ☕ Buy Us a Coffee
          </Button>
        </Box>
      </Drawer>

      {/* Command Palette (⌘K) */}
      <Dialog
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: dark ? '#0B0B12' : '#FFFFFF',
            border: `1px solid ${goldAccent}`,
            borderRadius: 3,
          },
        }}
      >
        <DialogContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <SearchIcon sx={{ color: goldAccent }} />
            <InputBase
              autoFocus
              fullWidth
              placeholder="Search ZothOS routes, 23+ daemons (:8102, :8094, :8140), or AI agents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ fontFamily: mono, fontSize: '0.86rem' }}
            />
            <IconButton aria-label="Close command palette" size="small" onClick={() => setPaletteOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="caption" sx={{ fontFamily: mono, color: goldAccent, fontWeight: 800, display: 'block', mb: 1 }}>
            PRIMARY ROUTES
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {PRIMARY_NAV.map((r) => (
              <Chip
                key={r.path}
                label={r.label}
                clickable
                onClick={() => {
                  setPaletteOpen(false);
                  navigate(r.path);
                }}
                sx={{ fontFamily: mono, fontWeight: 700 }}
              />
            ))}
          </Box>

          <Typography variant="caption" sx={{ fontFamily: mono, color: goldAccent, fontWeight: 800, display: 'block', mb: 1 }}>
            LOOPBACK DAEMONS (127.0.0.1)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
            {matchedDaemons.map((d) => (
              <Box
                key={d.name}
                onClick={() => {
                  setPaletteOpen(false);
                  navigate('/daemons');
                }}
                sx={{
                  p: 1,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: dark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                  '&:hover': { bgcolor: dark ? 'rgba(212,175,55,0.12)' : '#FEF9E7' },
                }}
              >
                <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', fontWeight: 700 }}>
                  {d.name}
                </Typography>
                <Chip label={d.port} size="small" sx={{ fontFamily: mono, fontSize: '0.68rem', height: 20 }} />
              </Box>
            ))}
          </Box>

          <Typography variant="caption" sx={{ fontFamily: mono, color: goldAccent, fontWeight: 800, display: 'block', mb: 1 }}>
            SOVEREIGN ECOSYSTEM CONSTELLATION
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
            {ECOSYSTEM_SURFACES.map((s) => (
              <Chip
                key={s.url}
                label={s.name}
                component="a"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                clickable
                sx={{ fontFamily: mono, fontSize: '0.72rem', fontWeight: 700 }}
              />
            ))}
          </Box>

          <Typography variant="caption" sx={{ fontFamily: mono, color: goldAccent, fontWeight: 800, display: 'block', mb: 1 }}>
            AUTONOMOUS AGENTS &amp; ORCHESTRATORS
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {matchedAgents.map((a) => (
              <Chip
                key={a.name}
                label={`${a.name} (${a.cmd})`}
                clickable
                onClick={() => {
                  setPaletteOpen(false);
                  navigate('/daemons');
                }}
                sx={{ fontFamily: mono, fontSize: '0.72rem' }}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
