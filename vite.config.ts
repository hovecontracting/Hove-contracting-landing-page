import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import contactHandler from './api/contact'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    {
      name: 'contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', (req, res, next) => {
          Promise.resolve(contactHandler(req, res)).catch(next)
        })
      },
    },
    tsconfigPaths()
  ],
})
