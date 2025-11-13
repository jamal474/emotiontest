import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      tailwindcss()
    ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    },
    worker: {
      format: "es",
    }
  };
});