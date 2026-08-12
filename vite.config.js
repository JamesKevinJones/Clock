import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset paths so the build also opens straight from the file
  // system, not only from a server root.
  base: './',
  plugins: [react()],
})
