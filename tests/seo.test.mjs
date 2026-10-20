import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import spanish from '../public/data/es.json' with { type: 'json' }
import english from '../public/data/en.json' with { type: 'json' }
import { getPageSeo, renderSeoHead, seoPages, serializeSchema } from '../src/seo.js'
import { createDiscoveryFiles } from '../scripts/ai-discovery.mjs'
import pricing from '../public/data/tarifas.json' with { type: 'json' }
import schedule from '../public/data/horarios.json' with { type: 'json' }
import social from '../src/data/social.json' with { type: 'json' }

const read = (file) => readFile(file, 'utf8')

for (const [route, original] of Object.entries(seoPages)) {
  test(`${route}: initial HTML preserves all audited SEO and contains Spanish content`, async () => {
    const html = await read(`dist${route}index.html`)
    const actual = getPageSeo(route, spanish)
    assert.ok(html.includes(renderSeoHead(actual)), 'Built title, meta, canonical or JSON-LD changed')
    assert.equal((html.match(/<title\b/g) || []).length, 1)
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
    assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, original.schemas.length)
    assert.ok(html.includes('<html lang="es">'))
    assert.ok(!html.includes('<!--page-seo-->'))
    assert.ok(!html.includes('noindex'))
    assert.equal(original.canonical, `https://brazada.net${route}`)
    assert.deepEqual({ ...actual, meta: actual.meta.slice(0, original.meta.length) }, original)
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
    assert.ok(main, 'Missing prerendered main content')
    const text = main.replace(/<[^>]*>/g, '').trim()
    assert.ok(text.length > 150, 'Page content is empty or incomplete without JavaScript')
    assert.equal((main.match(/<h1\b/g) || []).length, 1)
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
      await access(resolve('dist', decodeURIComponent(match[1]).slice(1)))
    }
    const schemas = [...html.matchAll(/<script data-seo type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]))
    assert.deepEqual(schemas, original.schemas, 'A schema field or entity ID changed')
  })
}

test('English metadata changes language, not canonical URLs, schema IDs or dates', () => {
  for (const [route, original] of Object.entries(seoPages)) {
    const translated = getPageSeo(route, english)
    assert.equal(translated.canonical, original.canonical)
    assert.equal(translated.schemas.length, original.schemas.length)
    const originalNodes = original.schemas.flatMap((schema) => schema['@graph'] || [schema])
    const translatedNodes = translated.schemas.flatMap((schema) => schema['@graph'] || [schema])
    translatedNodes.forEach((node, index) => {
      assert.equal(node['@id'], originalNodes[index]['@id'])
      assert.equal(node.datePublished, originalNodes[index].datePublished)
      assert.equal(node.dateModified, originalNodes[index].dateModified)
    })
    assert.equal(translated.meta.find((tag) => tag.property === 'og:title').content, translated.title)
    assert.equal(translated.meta.find((tag) => tag.name === 'twitter:title').content, translated.title)
  }
})

test('Unknown and unfinished routes are not canonicalized to the homepage or indexed', async () => {
  for (const route of ['/not-a-page/', '/tratamiento-de-datos/', '/mente-y-cuerpo/']) {
    const page = getPageSeo(route, spanish)
    assert.equal(page.canonical, null)
    assert.deepEqual(page.schemas, [])
    assert.equal(page.meta[0].content, 'noindex, follow')
  }
  const html = await read('dist/404.html')
  assert.ok(html.includes('noindex, follow'))
  assert.ok(!html.includes('rel="canonical"'))
})

test('Sitemaps list every completed canonical exactly once and exclude unfinished routes', async () => {
  const xml = await read('dist/sitemap.xml')
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.ok(!xml.includes('/mente-y-cuerpo/'))
  assert.deepEqual(urls, Object.values(seoPages).map((page) => page.canonical))
  assert.equal(urls.length, new Set(urls).size)
  assert.equal(await read('dist/page-sitemap.xml'), xml)
  assert.ok((await read('dist/sitemap_index.xml')).includes('<loc>https://brazada.net/sitemap.xml</loc>'))
  const robots = await read('dist/robots.txt')
  assert.ok(robots.includes('Allow: /'))
  assert.ok(robots.includes('Sitemap: https://brazada.net/sitemap.xml'))
  assert.ok(!robots.includes('Disallow: /'))
})

test('Every original schema image and logo is available under its WordPress URL', async () => {
  const images = new Set()
  function collect(value) {
    if (!value || typeof value !== 'object') return
    for (const [key, item] of Object.entries(value)) {
      if (['image', 'logo'].includes(key) && typeof item === 'string') images.add(item)
      collect(item)
    }
  }
  collect(seoPages)
  assert.equal(images.size, 6)
  for (const image of images) {
    const url = new URL(image)
    assert.equal(url.hostname, 'brazada.net')
    await access(resolve('dist', url.pathname.slice(1)))
  }
})

test('Schema serialization cannot terminate the JSON-LD script element', () => {
  const schema = { description: '</script><script>alert(1)</script>' }
  const encoded = serializeSchema(schema)
  assert.ok(!encoded.includes('<'))
  assert.deepEqual(JSON.parse(encoded), schema)
})

test('AI discovery files stay synchronized with published Spanish content', async () => {
  const files = createDiscoveryFiles()
  for (const [name, content] of Object.entries(files)) {
    assert.equal(await read(`dist/${name}`), content)
    assert.ok(!content.includes('undefined'))
    assert.ok(!content.includes('/mente-y-cuerpo/'))
  }
  for (const page of Object.values(seoPages)) {
    assert.ok(files['llms.txt'].includes(page.canonical))
    assert.ok(files['llms-full.txt'].includes(`Fuente: ${page.canonical}`))
  }
  const text = files['llms-full.txt']
  for (const key of ['address', 'city', 'phone', 'email']) assert.ok(text.includes(spanish.pages.contactenos[key]))
  for (const group of Object.values(pricing.groups)) {
    for (const item of Object.values(group.items)) {
      assert.ok(text.includes(item.price))
      assert.ok(text.includes(item.quantity))
    }
  }
  for (const group of Object.values(schedule.groups)) {
    for (const item of Object.values(group.items)) assert.ok(text.includes(item.description))
  }
  for (const route of Object.keys(seoPages)) {
    assert.ok((await read(`dist${route}index.html`)).includes('href="/llms.txt"'))
  }
})

test('AI search crawlers are explicitly allowed without changing training directives', async () => {
  const robots = await read('dist/robots.txt')
  for (const agent of ['*', 'Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User']) {
    assert.ok(robots.includes(`User-agent: ${agent}\nAllow: /\n`))
  }
  assert.ok(!/User-agent: (GPTBot|ClaudeBot|Google-Extended)/i.test(robots))
  assert.ok(!robots.includes('Disallow:'))
})

test('Every completed page has crawler-readable Open Graph and X large-image previews', async () => {
  assert.deepEqual(Object.keys(social), Object.keys(seoPages))
  for (const route of Object.keys(seoPages)) {
    for (const copy of [spanish, english]) {
      const seo = getPageSeo(route, copy)
      const value = key => seo.meta.find(tag => (tag.property || tag.name) === key)?.content
      const keys = seo.meta.map(tag => tag.property || tag.name)
      assert.equal(keys.length, new Set(keys).size, `${route}: duplicate meta tags`)
      assert.equal(value('og:url'), seo.canonical)
      assert.equal(value('og:title'), seo.title)
      assert.equal(value('twitter:title'), seo.title)
      assert.ok(value('og:description'))
      assert.ok(value('twitter:description'))
      assert.equal(value('twitter:card'), 'summary_large_image')
      assert.equal(value('og:image'), `https://brazada.net/social/${social[route].image}.jpg`)
      assert.equal(value('og:image:secure_url'), value('og:image'))
      assert.equal(value('twitter:image'), value('og:image'))
      assert.equal(value('og:image:type'), 'image/jpeg')
      assert.equal(value('og:image:width'), '1200')
      assert.equal(value('og:image:height'), '630')
      assert.ok(value('og:image:alt'))
      assert.equal(value('twitter:image:alt'), value('og:image:alt'))
    }
    const bytes = await readFile(`dist/social/${social[route].image}.jpg`)
    assert.ok(bytes.length < 500_000, `${route}: oversized sharing image`)
    assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Not a JPEG')
    let offset = 2
    let dimensions
    while (offset < bytes.length) {
      assert.equal(bytes[offset], 0xff)
      const marker = bytes[offset + 1]
      const length = bytes.readUInt16BE(offset + 2)
      if ([0xc0, 0xc1, 0xc2].includes(marker)) {
        dimensions = [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)]
        break
      }
      offset += length + 2
    }
    assert.deepEqual(dimensions, [1200, 630], `${route}: wrong actual image size`)
  }
  assert.ok(!getPageSeo('/missing/', spanish).meta.some(tag => tag.property === 'og:image'))
})
