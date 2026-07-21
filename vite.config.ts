import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 900,
    rolldownOptions: {
      output: {
        // Firebase en su propio chunk de vendor para mejor cacheo.
        advancedChunks: {
          groups: [{ name: 'firebase', test: /node_modules[\\/]@?firebase/ }],
        },
      },
    },
  },
})
