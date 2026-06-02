/**
 * CalmTree Discover — Vite Configuration
 *
 * Vanilla config — no third-party wrappers.
 * Includes: React, TailwindCSS, TanStack Start/Router, path aliases, Nitro (Vercel).
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    // Vercel deployment — generates .vercel/output
    nitro({ preset: "vercel" }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
  server: {
    port: 8080,
    strictPort: true,
  },
});
