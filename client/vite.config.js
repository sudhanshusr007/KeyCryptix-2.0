import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  base: "/", // Ensure the correct base path
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Ensures proper routing
  },
})
