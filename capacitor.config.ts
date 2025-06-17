
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d6a56e1ef27e42c6811f414e02f36d4f',
  appName: 'ZenFlow Yoga',
  webDir: 'dist',
  server: {
    url: 'https://d6a56e1e-f27e-42c6-811f-414e02f36d4f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#9CAF88',
      showSpinner: false
    }
  }
};

export default config;
