import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { HeroReveal, HeroItem, GlowLine, StaggerChildren, StaggerItem } from '../components/MotionReveal';
import { ProFunnelBanner, ProOutputGate, useProLicense } from '../context/ProLicenseContext';
import { LOOPBACK_DAEMONS, FRONTIER_AGENTS } from '../data/zothOsData';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const CATEGORIES = ['All', 'AI Memory', 'Zero-Egress', 'Security', 'Commerce', 'FinOps', 'Crypto Vault', 'Simulation'];

export default function DaemonsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDaemon, setSelectedDaemon] = useState(LOOPBACK_DAEMONS[0]);
  const [toast, setToast] = useState(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';
  const { isPro, openPaywallModal } = useProLicense();

  const filteredDaemons =
    selectedCategory === 'All'
      ? LOOPBACK_DAEMONS
      : LOOPBACK_DAEMONS.filter((d) => d.category === selectedCategory);

  const systemdUnitPreview = `[Unit]
Description=ZothOS Sovereign Enclave — ${selectedDaemon.name} (${selectedDaemon.port})
After=network-online.target

[Service]
Type=simple
User=zoth
WorkingDirectory=/home/zoth/NullAITech/${selectedDaemon.name}
ExecStart=/usr/local/bin/${selectedDaemon.name} serve --host 127.0.0.1
Restart=always
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true

# Loopback Health Probe:
# curl -s http://127.0.0.1${selectedDaemon.port.split(' ')[0]}/health | jq .

[Install]
WantedBy=default.target`;

  const handleCopyUnit = () => {
    if (!isPro) {
      openPaywallModal();
      return;
    }
    navigator.clipboard?.writeText(systemdUnitPreview);
    setToast(`Copied ${selectedDaemon.name}.service systemd unit!`);
  };

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <ProFunnelBanner />

      <HeroReveal>
        <HeroItem>
          <GlowLine color="#34D399" glowColor="rgba(52, 211, 153, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="22 LOOPBACK DAEMONS + 9 FRONTIER AI AGENTS"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.72rem',
              bgcolor: 'rgba(52, 211, 153, 0.14)',
              color: isDark ? '#34D399' : '#047857',
              border: '1px solid rgba(52, 211, 153, 0.4)',
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            Zero-Egress <span className="text-gradient-gold">127.0.0.1 Enclave Mesh</span>
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '65ch', mb: 5 }}>
            Loopback services are documented on 127.0.0.1. The coding tools below are third-party clients named in the ZothOS README (Antigravity, Claude Code, Grok Bot, Aider, Cursor, Cline, Ollama) plus desktop launchers for Hermes and Codex. You sign in with your own accounts. NullAI Tech does not claim a partnership with xAI, Cursor, Anthropic, Google, or Meta.
          </Typography>
        </HeroItem>
      </HeroReveal>

      {/* 9 Frontier AI Coding Agents Grid */}
      <Box sx={{ mb: 8 }}>
        <Typography sx={{ fontFamily: mono, color: gold, fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.16em', mb: 1 }}>
          01 / 02 · PRE-INSTALLED AUTONOMOUS CODING WORKSTATIONS
        </Typography>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Third-party clients the image can launch
        </Typography>

        <StaggerChildren>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {FRONTIER_AGENTS.map((agent) => (
              <StaggerItem key={agent.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: cardBg,
                    border: `1px solid ${isDark ? 'rgba(212,175,55,0.22)' : '#EAECF0'}`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <SmartToyIcon sx={{ color: agent.accent }} />
                    <Chip
                      label={agent.mode}
                      size="small"
                      sx={{
                        fontFamily: mono,
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        bgcolor: `${agent.accent}18`,
                        color: agent.accent,
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '1rem', mb: 0.4 }}>
                    {agent.name}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: mono, color: gold, fontWeight: 700, mb: 1 }}>
                    $ {agent.cmd}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.84rem', lineHeight: 1.6 }}>
                    {agent.desc}
                  </Typography>
                </Paper>
              </StaggerItem>
            ))}
          </Box>
        </StaggerChildren>
      </Box>

      {/* 22 Resident Loopback Daemons Matrix */}
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ fontFamily: mono, color: '#34D399', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.16em', mb: 1 }}>
          02 / 02 · 127.0.0.1 LOOPBACK SERVICE REGISTRY
        </Typography>
        <Typography variant="h3" sx={{ mb: 2.5 }}>
          The 22 Resident Loopback Daemons
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="small"
              variant={selectedCategory === cat ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(cat)}
              sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.74rem' }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 4 }}>
          {filteredDaemons.map((d) => {
            const active = selectedDaemon.name === d.name;
            return (
              <Paper
                key={d.name}
                elevation={0}
                onClick={() => setSelectedDaemon(d)}
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  bgcolor: cardBg,
                  border: `1.5px solid ${active ? '#34D399' : isDark ? 'rgba(255,255,255,0.1)' : '#EAECF0'}`,
                  '&:hover': { borderColor: '#34D399' },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HubIcon sx={{ fontSize: 18, color: '#34D399' }} />
                    <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.92rem' }}>
                      {d.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.8 }}>
                    <Chip label={d.port} size="small" sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.68rem', height: 20 }} />
                    <Chip label={d.stack} size="small" sx={{ fontFamily: mono, fontSize: '0.64rem', height: 20 }} />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.82rem' }}>
                  {d.desc}
                </Typography>
              </Paper>
            );
          })}
        </Box>

        {/* Systemd Unit Inspector with Frosted Pro Gate */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${gold}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Systemd Enclave Unit: {selectedDaemon.name}.service ({selectedDaemon.port})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click any daemon card above to inspect its hardened localhost systemd service configuration.
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyUnit}
              sx={{ fontFamily: mono, fontWeight: 800 }}
            >
              Copy Unit File
            </Button>
          </Box>

          <ProOutputGate title={`Unlock ${selectedDaemon.name}.service & 22-Daemon Systemd Bundle`}>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: 2.5,
                borderRadius: 2,
                bgcolor: isDark ? '#07080D' : '#FAF9F5',
                color: isDark ? '#34D399' : '#0A0D14',
                border: isDark ? 'none' : '1px solid rgba(212, 175, 55, 0.35)',
                fontFamily: mono,
                fontSize: '0.78rem',
                fontWeight: 600,
                lineHeight: 1.6,
                overflowX: 'auto',
              }}
            >
              {systemdUnitPreview}
            </Box>
          </ProOutputGate>
        </Paper>
      </Box>

      <Snackbar open={Boolean(toast)} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" onClose={() => setToast(null)} sx={{ fontFamily: mono, fontWeight: 700 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Container>
  );
}
