import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: 'src',
  plugins: [
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2015',
    cssTarget: 'chrome58',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      external: ['fsevents'],
    },
    chunkSizeWarningLimit: 1000,
  },
}); 