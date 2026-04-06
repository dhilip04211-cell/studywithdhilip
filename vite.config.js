import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/studywithdhilip/', // CRITICAL: This matches your repo name
})