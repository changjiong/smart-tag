import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
      importMode: 'async',
      extensions: ['jsx', 'js'],
      exclude: ['**/components/**', '**/utils/**'],
      routeStyle: 'react-router',
      resolver: 'react'
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
})
