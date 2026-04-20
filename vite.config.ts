import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/binary-tree-app/",
  build: {
    outDir: "dist"
  }
})