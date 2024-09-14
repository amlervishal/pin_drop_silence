import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pin_drop_silence/',
  build: {
    outDir: 'docs'
  }
})