import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Read the port from the environment or fallback to 5173
const port = process.env.PORT || 5173;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: parseInt(port),  // Use the port defined in the environment
    proxy: {
      '/api': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
