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
import BoltIcon from '@mui/icons-material/Bolt';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ZothosAsciiLogo from './ZothosAsciiLogo';
import { useProLicense } from '../context/ProLicenseContext';
import { LOOPBACK_DAEMONS, FRONTIER_AGENTS } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const PRIMARY_NAV = [
  { label: 'Overview', path: '/' },
  { label: 'Desktop Lab', path: '/desktop', badge: 'LIVE' },
  { label: '22 Daemons', path: '/daemons', badge: '22' },
  { label: 'Security Vault', path: '/security', badge: 'Kali+Parrot' },
  { label: 'MCP & AX', path: '/mcp', badge: '152' },
  { label: 'Download ISO', path: '/download', badge: 'v3.3' },
  { label: 'Codex', path: '/docs' },
];

export default function Navbar({ mode, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const { isPro, openPaywallModal, openDePayCheckout } = useProLicense();

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
          ? 'linear-gradient(180deg, rgba(14, 15, 22, 0.90) 0%, rgba(8, 8, 11, 0.85) 100%)'
          : 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(24px) saturate(180%)',
        zIndex: 1100,
        borderBottom: `1px solid ${dark ? 'rgba(212, 175, 55, 0.24)' : 'rgba(212, 175, 55, 0.35)'}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 74, gap: 1 }}>
          {/* Pure Black ASCII Brand Logo (No images, no font text title) */}
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
              <ZothosAsciiLogo size="sm" showTag />
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
                    border: active ? `1px solid ${dark ? 'rgba(212,175,55,0.35)' : '#E2CE82'}` : '1px solid transparent',
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

          {/* Right Actions: Search, Studio Link, Pro Unlock / Status, Theme Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65, flexShrink: 0 }}>
            <Tooltip title="Search Daemons, Agents & Security Arsenal (⌘K)">
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
                  borderColor: dark ? 'rgba(255,255,255,0.16)' : '#D0D5DD',
                  color: 'text.secondary',
                }}
              >
                ⌘K
              </Button>
            </Tooltip>

            <Button
              size="small"
              variant="outlined"
              href="https://zoth.nullai.tech"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
              sx={{
                display: { xs: 'none', xl: 'inline-flex' },
                fontFamily: mono,
                fontSize: '0.72rem',
                fontWeight: 700,
                px: 1.2,
                py: 0.5,
                whiteSpace: 'nowrap',
                borderColor: dark ? 'rgba(212,175,55,0.35)' : '#E2CE82',
                color: goldAccent,
              }}
            >
              Zoth Studio
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={() => window.dispatchEvent(new CustomEvent('zoth:replay-intro', { detail: { mode: 'wipe' } }))}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.7rem',
                px: 1.2,
                py: 0.5,
                whiteSpace: 'nowrap',
                borderColor: dark ? 'rgba(212,175,55,0.4)' : '#8A6508',
                color: goldAccent,
              }}
            >
              ⣿ Braille Intro
            </Button>

            <Chip
              label="v3.3.0 + LITE"
              size="small"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                fontFamily: mono,
                fontWeight: 800,
                fontSize: '0.68rem',
                bgcolor: dark ? 'rgba(16, 185, 129, 0.16)' : '#ECFDF5',
                color: dark ? '#10B981' : '#047857',
                border: '1px solid rgba(16, 185, 129, 0.45)',
              }}
            />

            <IconButton
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleTheme}
              size="small"
              sx={{
                border: `1px solid ${dark ? 'rgba(212,175,55,0.3)' : '#E2CE82'}`,
                color: goldAccent,
                width: 38,
                height: 38,
              }}
            >
              {dark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: brandColor, width: 42, height: 42 }}
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
            width: 290,
            bgcolor: dark ? '#08080B' : '#FFFFFF',
            borderLeft: `1px solid ${goldAccent}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ZothosAsciiLogo size="sm" showTag={false} />
          <IconButton aria-label="Close navigation menu" onClick={() => setMobileOpen(false)}>
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
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('zoth:replay-intro', { detail: { mode: 'wipe' } }));
            }}
          >
            ⣿ Replay Braille Intro
          </Button>
          <Button
            variant="outlined"
            fullWidth
            href="https://zoth.nullai.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Zoth Studio v2 ↗
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
              placeholder="Search ZothOS routes, 22 loopback daemons (:8094–:8120), or AI agents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ fontFamily: mono, fontSize: '0.88rem' }}
            />
            <IconButton aria-label="Close command palette" size="small" onClick={() => setPaletteOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="caption" sx={{ fontFamily: mono, color: goldAccent, fontWeight: 800, display: 'block', mb: 1 }}>
            PRIMARY ROUTES
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
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
            FRONTIER AI CODING AGENTS
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
