import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  server: {
=======
  server:{
>>>>>>> 6d663d718de22f9dcde3f9ba1c4a96aca54a2715
    proxy:{
      '/api':'https://streamy-ott-backend.onrender.com/'
    }
  },
  plugins: [react()],
})
