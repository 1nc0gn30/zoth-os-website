import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme, theme as lightTheme, darkTheme } from './theme';
import IntroDirector from './motion/IntroDirector';
import { ProLicenseProvider } from './context/ProLicenseContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import HomePage from './pages/HomePage';
import DesktopSimulatorPage from './pages/DesktopSimulatorPage';
import DaemonsPage from './pages/DaemonsPage';
import SecurityVaultPage from './pages/SecurityVaultPage';
import McpAxPage from './pages/McpAxPage';
import DownloadPage from './pages/DownloadPage';
import DocsPage from './pages/DocsPage';

// ─── Theme Context ──────────────────────────────────────────
export const ThemeContext = createContext({
  mode: 'dark',
  toggle: () => {},
  T: getTheme('dark'),
});

export const useTheme = () => useContext(ThemeContext);

// ─── PageStage: Aperture Seam Handoff + Scroll Reset ────────
const PageStage = ({ children, introKey }) => {
  const { pathname } = useLocation();
  const stageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const clear = () => {
      el.style.animation = 'none';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.opacity = '1';
    };
    el.addEventListener('animationend', clear, { once: true });
    const t = setTimeout(clear, 750);
    return () => {
      el.removeEventListener('animationend', clear);
      clearTimeout(t);
    };
  }, [pathname, introKey]);

  return (
    <div
      ref={stageRef}
      key={`${pathname}-${introKey}`}
      style={{
        animation: 'zothPageMaterialize 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

// ─── Global Styles & Conic Border Beam Primitives ───────────
const GlobalStyles = ({ T }) => (
  <style>{`
    @font-face {
      font-family: 'Celtic Garamond';
      src: url('/fonts/CelticGaramond.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @property --beam-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    body {
      background: ${T.bg};
      color: ${T.text};
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      transition: background 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    ::selection {
      background: ${T.goldSoft};
      color: ${T.gold};
    }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.gold}; }

    a { color: inherit; text-decoration: none; }
    img, video, canvas { max-width: 100%; }

    .card-border-beam {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .card-border-beam::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      background: conic-gradient(
        from var(--beam-angle),
        transparent 12%,
        #D4AF37 28%,
        #F5E6AB 38%,
        #10B981 52%,
        transparent 68%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: beamRotate 6.5s linear infinite;
      pointer-events: none;
      z-index: 2;
    }

    .card-border-beam-lite {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .card-border-beam-lite::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      background: conic-gradient(
        from var(--beam-angle),
        transparent 14%,
        ${T.mode === 'dark' ? '#F7F7F4' : '#0A0D14'} 32%,
        #D4AF37 48%,
        transparent 66%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: beamRotate 7.5s linear infinite;
      pointer-events: none;
      z-index: 2;
    }

    @keyframes beamRotate {
      to { --beam-angle: 360deg; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes zothPageMaterialize {
      0% {
        opacity: 0;
        transform: translateY(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 960px) {
      .zoth-hero-split {
        grid-template-columns: 1fr !important;
      }
      .zoth-bento-grid-3 {
        grid-template-columns: 1fr !important;
      }
      .zoth-bento-grid-2 {
        grid-template-columns: 1fr !important;
      }
      .zoth-stat-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media (max-width: 560px) {
      .zoth-stat-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
);

// ─── Main App ───────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme');
      if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme;
      const saved =
        localStorage.getItem('zoth-theme-mode') ||
        localStorage.getItem('zothos_theme_v34');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });
  const [introState] = useState({ active: false, path: '/', completedCount: 0 });

  const toggle = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('zoth-theme-mode', next);
        localStorage.setItem('zothos_theme_v34', next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const T = getTheme(mode);

  return (
    <MuiThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={{ mode, toggle, T }}>
        <ProLicenseProvider T={T}>
          <GlobalStyles T={T} />
          <ErrorBoundary>
            <Router>
              <SEO />
              <IntroDirector>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
                  <Navbar mode={mode} onToggleTheme={toggle} />
                  <main style={{ flex: 1 }}>
                    <PageStage introKey={introState.completedCount}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/desktop" element={<DesktopSimulatorPage />} />
                        <Route path="/daemons" element={<DaemonsPage />} />
                        <Route path="/security" element={<SecurityVaultPage />} />
                        <Route path="/mcp" element={<McpAxPage />} />
                        <Route path="/download" element={<DownloadPage />} />
                        <Route path="/docs" element={<DocsPage />} />
                      </Routes>
                    </PageStage>
                  </main>
                  <Footer />
                </div>
              </IntroDirector>
            </Router>
          </ErrorBoundary>
        </ProLicenseProvider>
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
