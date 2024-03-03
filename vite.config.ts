import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        runInfoPage: resolve(__dirname, 'src/runInfoPage/index.html'),
        runsPage: resolve(__dirname, 'src/runsPage/index.html'),
      },
    },
  },
  server: {
    open: 'index.html',
  },
});