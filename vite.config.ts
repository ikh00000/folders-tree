import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const port = isProduction ? 80 : 5173;

  return {
    base: isProduction ? '/folders-tree/' : '/',
    plugins: [react()],
    server: {
      port,
      host: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment,
    },
  };
});
