import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

const SRC_PATH = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': SRC_PATH,
      // allow tests that import Jest globals to work by mapping to Vitest
      '@jest/globals': 'vitest',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    // mirror the same alias for test environment
    alias: {
      '@': SRC_PATH,
      '@jest/globals': 'vitest',
    },
  },
});
