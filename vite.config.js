import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://github.com/Chauhan48/RAG_frontend.git',
  plugins: [react()],
})
