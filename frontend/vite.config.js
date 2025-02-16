import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000 // Set higher limit (default is 500KB)
  },
  plugins: [react()],
})
