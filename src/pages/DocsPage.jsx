import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HeroReveal, HeroItem, GlowLine } from '../components/MotionReveal';
import { ProFunnelBanner } from '../context/ProLicenseContext';

const mono = '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace';

const FAQS = [
  {
    q: 'How does ZothOS achieve Kali Rolling and Parrot OS parity without breaking Debian 13 stability?',
    a: 'ZothOS uses surgical APT pinning (/etc/apt/preferences.d/zoth-pinning): Debian 13 (Trixie) core system libraries and the Linux 6.12 kernel are pinned at priority 900, while Kali Rolling and Parrot Security offensive packages are pinned at priority 400. Security tools pull cleanly without ever overwriting core libc, systemd, or KDE Plasma 6.3 Wayland libraries.',
  },
  {
    q: 'How does the interactive zoth-pill desktop wallpaper track the cursor across Wayland windows?',
    a: 'ZothOS runs a lightweight compositor bridge (/usr/local/bin/zoth-cursor-daemon) that registers a KWin DBus script at 60 FPS and broadcasts coordinates to /dev/shm/zoth_cursor.json and HTTP 127.0.0.1:9989. The KDE Plasma 6 QML wallpaper (org.zothos.interactive) interpolates those coordinates to drive the 3D tilting ZOTHOS letters, golden constellation ley-lines, comet ribbon, and click shockwaves.',
  },
  {
    q: 'What are the hardware & thermal invariants enforced on ZothOS v3.2?',
    a: 'ZothOS enforces a strict < 55.0°C CPU thermal ceiling under autonomous agent cadences by locking Intel P-State turbo boost (no_turbo = 1), keeping cooling fans at 0 RPM during standard operation, and keeping heavy TTS engines in Thermal Guard Standby until explicitly invoked.',
  },
  {
    q: 'Does ZothOS require cloud API keys to run coding agents?',
    a: 'No. While ZothOS pre-installs cloud-capable agents like Claude Code and Grok CLI, it also includes resident Ollama on 127.0.0.1:11434 pre-wired to Aider, Cline, Hermes, and AGY so you can run 100% air-gapped local inference with Qwen 2.5 Coder, DeepSeek-R1, and Llama 3.2.',
  },
];

export default function DocsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold = isDark ? '#D4AF37' : '#8A6508';
  const cardBg = isDark ? '#0D0E17' : '#FFFFFF';

  return (
    <Container maxWidth="lg" className="page-fade-in" sx={{ py: { xs: 4, md: 6 } }}>
      <ProFunnelBanner />

      <HeroReveal>
        <HeroItem>
          <GlowLine color={gold} glowColor="rgba(212, 175, 55, 0.45)" />
        </HeroItem>
        <HeroItem>
          <Chip
            label="ZOTHOS v3.2 SYSTEM CODEX & TECHNICAL MANUAL"
            size="small"
            sx={{
              mt: 2.5,
              mb: 1.5,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: '0.72rem',
              bgcolor: 'rgba(212,175,55,0.14)',
              color: gold,
              border: `1px solid ${gold}`,
            }}
          />
        </HeroItem>
        <HeroItem>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            System Architecture, <span className="text-gradient-gold">APT Pinning &amp; Invariants</span>
          </Typography>
        </HeroItem>
        <HeroItem>
          <Typography color="text.secondary" sx={{ maxWidth: '64ch', mb: 5 }}>
            Reference documentation for the ZothOS Linux v3.2 kernel, KDE Plasma 6.3 Wayland compositor daemons, UFW zero-egress firewall rules, and thermal governance.
          </Typography>
        </HeroItem>
      </HeroReveal>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 6 }}>
        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Typography sx={{ fontFamily: mono, fontWeight: 800, color: gold, mb: 1 }}>
            01 · UFW ZERO-EGRESS &amp; TAILSCALE POSTURE
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            ZothOS boots with UFW default-deny incoming, explicitly permitting `lo` (loopback `127.0.0.1` for all 22 resident daemons), `tailscale0` mesh interface, UDP `41641` WireGuard, and TCP `7890` local proxy.
          </Typography>
          <Box component="pre" sx={{ m: 0, p: 2, borderRadius: 2, bgcolor: '#07080D', color: '#34D399', fontFamily: mono, fontSize: '0.75rem', overflowX: 'auto' }}>
{`sudo ufw default deny incoming
sudo ufw allow in on lo
sudo ufw allow in on tailscale0
sudo ufw allow 41641/udp
sudo ufw enable`}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: cardBg, border: `1px solid ${gold}` }}>
          <Typography sx={{ fontFamily: mono, fontWeight: 800, color: gold, mb: 1 }}>
            02 · ESSENTIAL ZOTHOS CLI COMMANDS
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.65 }}>
            Native system controllers located in `/usr/local/bin/` for switching reality modes, managing the interactive wallpaper, and auditing system health:
          </Typography>
          <Box component="pre" sx={{ m: 0, p: 2, borderRadius: 2, bgcolor: '#07080D', color: '#F5E6AB', fontFamily: mono, fontSize: '0.75rem', overflowX: 'auto' }}>
{`zoth-mode [gold|ghost|matrix|incognito]
zoth-live-wallpaper [start|stop|status]
zoth-glow [start|toggle|color #FFD700]
zoth-control-center
zoth-vault status`}
          </Box>
        </Paper>
      </Box>

      {/* FAQ Accordion */}
      <Typography variant="h3" sx={{ mb: 3 }}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ mb: 4 }}>
        {FAQS.map((item, idx) => (
          <Accordion
            key={idx}
            defaultExpanded={idx === 0}
            elevation={0}
            sx={{
              mb: 1.5,
              borderRadius: '12px !important',
              bgcolor: cardBg,
              border: `1px solid ${isDark ? 'rgba(212,175,55,0.25)' : '#EAECF0'}`,
              '&::before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: gold }} />}>
              <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: '0.94rem' }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
