import { defineConfig } from "vite";

// Slidev 53's generated code-line CSS is rejected by Vite 8's CSS minifier.
// Keep the CSS intact; this deck does not use code-line numbering.
export default defineConfig({
  build: { cssMinify: false },
});
