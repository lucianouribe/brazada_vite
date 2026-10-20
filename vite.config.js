import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import copy from './public/data/es.json' with { type: 'json' }
import { escapeHtml, getPageSeo, renderSeoHead } from './src/seo.js'
import { createDiscoveryFiles } from './scripts/ai-discovery.mjs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'page-seo',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const path = request.url?.split('?')[0]
          if (!['/llms.txt', '/llms-full.txt', '/robots.txt'].includes(path)) return next()
          response.setHeader('Content-Type', 'text/plain; charset=utf-8')
          response.end(createDiscoveryFiles()[path.slice(1)])
        })
      },
      transformIndexHtml(html, context) {
        const languageHtml = html.replace('{{language}}', escapeHtml(copy.metadata.language))
        if (context.server) return languageHtml.replace('<!--page-seo-->', renderSeoHead(getPageSeo(context.originalUrl || context.path, copy)))
        return languageHtml
      },
    },
  ],
})
