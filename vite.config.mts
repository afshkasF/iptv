import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '$': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8081
  },
  plugins: [react()],
})
