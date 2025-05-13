import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      config: {
        path: path.resolve(__dirname, 'postcss.config.cjs'),
      },
    },
  },
})