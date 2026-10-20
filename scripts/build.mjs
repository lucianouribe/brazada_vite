import { build } from 'vite'
import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import spanish from '../public/data/es.json' with { type: 'json' }
import { getPageSeo, renderSeoHead, seoPages, siteOrigin } from '../src/seo.js'
import { createDiscoveryFiles } from './ai-discovery.mjs'

const serverOutput = resolve('node_modules/.cache/brazada-prerender')
await build()
try {
  await build({
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: serverOutput,
      emptyOutDir: true,
    },
  })
  const { render } = await import(pathToFileURL(resolve(serverOutput, 'entry-server.js')))
  const template = await readFile('dist/index.html', 'utf8')
  const routes = [...Object.keys(seoPages), '/404/']
  for (const route of routes) {
    const html = template
      .replace('<!--page-seo-->', renderSeoHead(getPageSeo(route, spanish)))
      .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
    const file = route === '/404/' ? 'dist/404.html' : `dist${route}index.html`
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
  }
  const urls = Object.values(seoPages).map((page) => `<url><loc>${page.canonical}</loc></url>`).join('\n')
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  await copyFile('dist/sitemap.xml', 'dist/page-sitemap.xml')
  await writeFile('dist/sitemap_index.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${siteOrigin}/sitemap.xml</loc></sitemap></sitemapindex>\n`)
  for (const [name, content] of Object.entries(createDiscoveryFiles())) {
    await writeFile(`dist/${name}`, content)
  }
  console.log(`Prerendered ${Object.keys(seoPages).length} Spanish pages with live-site SEO, plus 404.html, robots.txt and sitemaps.`)
} finally {
  await rm(serverOutput, { recursive: true, force: true })
}
