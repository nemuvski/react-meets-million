import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'

const BASE_PATH = '/'
const CLIENT_PUBLIC_ENV_PREFIX = 'PUBLIC_'
const ROOT_DIR_PATH = resolve(__dirname, 'src')
const PUBLIC_ASSETS_DIR_PATH = resolve(__dirname, 'static')
const OUTPUT_DIR_PATH = resolve(__dirname, 'dist')
const ENV_DIR_PATH = __dirname

export default defineConfig(({ mode }) => {
  const isProductionMode = mode === 'production'
  const appVersion = isProductionMode ? process.env.npm_package_version : `${process.env.npm_package_version}-${mode}`
  const esbuildPure = isProductionMode ? ['console.log', 'console.info', 'console.debug', 'console.trace'] : undefined

  return {
    root: ROOT_DIR_PATH,
    publicDir: PUBLIC_ASSETS_DIR_PATH,
    envDir: ENV_DIR_PATH,
    envPrefix: CLIENT_PUBLIC_ENV_PREFIX,
    base: BASE_PATH,
    build: {
      outDir: OUTPUT_DIR_PATH,
      emptyOutDir: true,
      manifest: true,
    },
    esbuild: {
      pure: esbuildPure,
    },
    plugins: [
      million.vite(),
      react(),
      eslintPlugin(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appVersion,
          },
        },
      }),
    ],
    resolve: {
      alias: [{ find: '~', replacement: ROOT_DIR_PATH }],
    },
  }
})
