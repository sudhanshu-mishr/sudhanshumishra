
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For build-time process.env access in the config itself
declare const process: any;

export default defineConfig({
  plugins: [react()],
  define: {
    // Injects the API_KEY from the environment into the build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 3000
  }
});
