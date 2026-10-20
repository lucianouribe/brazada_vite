import source from './data/seo.json' with { type: 'json' }
import social from './data/social.json' with { type: 'json' }

export const seoPages = source.pages
export const siteOrigin = source.origin

export function normalizePath(path) {
  return `${path.split('?')[0].replace(/\/+$/, '')}/`
}

export function getPageSeo(path, copy) {
  const original = seoPages[normalizePath(path)]
  if (!original) {
    return {
      title: `${copy.shared.placeholder.notFound} - Brazada`,
      canonical: null,
      meta: [{ name: 'robots', content: 'noindex, follow' }],
      schemas: [],
    }
  }
  if (copy.metadata.language === 'es') return withSocialPreview(original, path, copy)

  const titles = {
    '/': copy.navigation.home,
    '/normatividad/': copy.pages.normatividad.title,
    '/porque-brazada/': copy.pages.porqueBrazada.title,
    '/contactenos/': copy.pages.contactenos.title,
    '/natacion/': copy.pages.natacion.title,
    '/fitness/': copy.pages.fitness.title,
    '/hidrogimnasia/': copy.pages.hidrogimnasia.title,
    '/masajes/': copy.pages.masajes.title,
    '/protocolos/': copy.pages.protocolos.title,
    '/tarifas/': copy.pages.tarifas.title,
    '/horarios/': copy.pages.horarios.title,
  }
  const title = `${titles[normalizePath(path)]} - Brazada`
  const descriptions = {
    '/': copy.pages.landing.introduction,
    '/normatividad/': copy.pages.normatividad.licensingLines.join(' '),
    '/porque-brazada/': copy.pages.porqueBrazada.story.paragraphs[0],
    '/contactenos/': copy.pages.contactenos.introduction,
    '/natacion/': copy.pages.natacion.introduction,
    '/fitness/': copy.pages.fitness.spinning.text,
    '/hidrogimnasia/': copy.pages.hidrogimnasia.exercise.text,
    '/masajes/': copy.pages.masajes.introduction,
    '/protocolos/': copy.pages.protocolos.title,
    '/tarifas/': copy.pages.tarifas.title,
    '/horarios/': copy.pages.horarios.title,
  }
  const description = descriptions[normalizePath(path)]
  const meta = original.meta.map((tag) => {
    const key = tag.name || tag.property
    if (['og:title', 'twitter:title'].includes(key)) return { ...tag, content: title }
    if (['description', 'og:description', 'twitter:description'].includes(key)) return { ...tag, content: description }
    if (key === 'og:locale') return { ...tag, content: 'en_US' }
    return tag
  })
  const schemas = original.schemas.map((schema) => {
    if (!schema['@graph']) return schema
    return {
      ...schema,
      '@graph': schema['@graph'].map((node) => {
        if (node['@type'] !== 'WebPage') return node
        return { ...node, name: title, description, inLanguage: 'en-US' }
      }),
    }
  })
  return withSocialPreview({ ...original, title, meta, schemas }, path, copy)
}

function withSocialPreview(seo, path, copy) {
  const preview = social[normalizePath(path)]
  if (!preview) throw new Error(`Missing social preview for ${path}`)
  const image = `${siteOrigin}/social/${preview.image}.jpg`
  const page = copy.pages[preview.page]
  const alt = preview.page === 'landing' ? page.hero.poolAlt : page.bannerAlt
  return {
    ...seo,
    meta: [
      ...seo.meta,
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: alt },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: alt },
    ],
  }
}

export function escapeHtml(value) {
  return value.replace(/[&"<>]/g, (character) => ({
    '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;',
  })[character])
}

export function serializeSchema(schema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}

export function renderSeoHead(seo) {
  return [
    `<title data-seo>${escapeHtml(seo.title)}</title>`,
    ...seo.meta.map((tag) => `<meta data-seo ${Object.entries(tag).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')} />`),
    ...(seo.canonical ? [`<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    ...seo.schemas.map((schema) => `<script data-seo type="application/ld+json">${serializeSchema(schema)}</script>`),
  ].join('\n    ')
}
