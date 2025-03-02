import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts', // Main process entry
      },
      preload: {
        input: 'electron/preload.ts', // Preload script entry
      },
    }),
  ],
})