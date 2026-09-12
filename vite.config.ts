import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // relative base → works both on GitHub Pages subpath (/camnemi-debut/)
  // and on a root custom domain (game.camnemi.com)
  base: './',
})
