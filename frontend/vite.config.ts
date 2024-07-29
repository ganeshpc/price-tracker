import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

console.log('server url: ', process.env.VITE_API_SERVER_BASE_URL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_SERVER_BASE_URL,
        changeOrigin: true
      },
      '/socket.io': {
        target: process.env.VITE_API_SERVER_BASE_URL,
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  }
})
