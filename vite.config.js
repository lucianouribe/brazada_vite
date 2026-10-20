import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import copy from './src/data/es.json' with { type: 'json' }

function escapeHtml(value) {
  return value.replace(/[&"<>]/g, (character) => ({
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
  })[character])
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'localized-html',
      transformIndexHtml(html) {
        return html.replace(/\{\{(language|description|defaultTitle)\}\}/g, (_, key) => escapeHtml(copy.metadata[key]))
      },
    },
  ],
})
