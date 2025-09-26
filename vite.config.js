// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/RAG_frontend/',
//   build: {
//     outDir: 'dist',
//   }

// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : '/RAG_frontend/',
    plugins: [react()],
  };
});