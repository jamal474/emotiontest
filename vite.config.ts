import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The app is served from https://<short-domain>/emotion/, not from a domain
// root, so every asset URL Vite emits has to carry that prefix. Overridable
// with BASE_PATH at build time (must start and end with "/").
const base = process.env.BASE_PATH || '/emotion/';

// Build into build/emotion rather than build/, and publish build/ from
// Netlify. That way the files sit on disk at exactly the paths they are
// served from, so the Cloudflare worker in front of this can forward requests
// without rewriting them — and emotiontest.netlify.app/emotion/ shows the
// same page as the short domain, which makes it debuggable on its own.
const outDir = path.posix.join('build', base);

export default defineConfig(() => {
  return {
    base,
    build: {
      outDir,
      emptyOutDir: true,
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
