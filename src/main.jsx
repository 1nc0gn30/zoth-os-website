import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootEl = document.getElementById('root');
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const preloader = document.getElementById('zoth-preloader');
if (preloader) {
  preloader.classList.add('is-hidden');
  preloader.style.opacity = '0';
  preloader.style.pointerEvents = 'none';
  if (preloader.parentNode) {
    preloader.parentNode.removeChild(preloader);
  }
}
