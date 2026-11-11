import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves an org site (a repo named <org>.github.io) from the domain
// root, but a project site from /<repo>/. The Pages workflow derives BASE_PATH
// from the actual repository name, so this config works unchanged either way.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
});
