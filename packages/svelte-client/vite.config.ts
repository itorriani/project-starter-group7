import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from "svelte-preprocess";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: false
  },
  plugins: [
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })]
    })
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});
