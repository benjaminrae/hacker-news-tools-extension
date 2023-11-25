import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/widget/options.ts'],
  dts: true,
  sourcemap: true,
  format: ['cjs'],
  clean: true,
  splitting: true,
  minify: 'terser',
  watch: process.argv.includes('--watch'),
  publicDir: 'public',
  legacyOutput: 'dist/index.js',
});
