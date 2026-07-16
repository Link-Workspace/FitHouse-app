import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FitHouse-app/',
  server: {
    port: 5173,
  },
});
