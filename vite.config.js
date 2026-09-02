import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The site runs on 5174 so it never collides with the admin frontend,
    // which takes Vite's default 5173. strictPort means a busy port fails
    // loudly instead of silently moving to another one.
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
})
