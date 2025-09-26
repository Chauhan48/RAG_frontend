import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RAG_frontend/',
  build: {
    outDir: 'dist',
  }

})
