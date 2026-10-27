import React, { createContext, useContext } from 'react';
import { Box } from '@mui/material';

const GITHUB_ZOTHOS_URL = 'https://github.com/1nc0gn30/zoth-os';

const ProLicenseContext = createContext({
  isPro: true,
  stripeUrl: GITHUB_ZOTHOS_URL,
  stripeBundleUrl: GITHUB_ZOTHOS_URL,
  openPaywallModal: () => {},
  openLicenseModal: () => {},
  openDePayCheckout: () => {},
  activateLicense: () => {},
});

export function useProLicense() {
  return useContext(ProLicenseContext);
}

export function ProLicenseProvider({ children }) {
  return (
    <ProLicenseContext.Provider
      value={{
        isPro: true,
        stripeUrl: GITHUB_ZOTHOS_URL,
        stripeBundleUrl: GITHUB_ZOTHOS_URL,
        openPaywallModal: () => {},
        openLicenseModal: () => {},
        openDePayCheckout: () => {},
        activateLicense: () => {},
      }}
    >
      {children}
    </ProLicenseContext.Provider>
  );
}

export function ProConversionBanner() {
  return null;
}

export function ProFunnelBanner() {
  return null;
}

export function ProOutputGate({ children }) {
  return <Box sx={{ position: 'relative' }}>{children}</Box>;
}
