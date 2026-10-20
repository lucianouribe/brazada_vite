import spanish from '../public/data/es.json' with { type: 'json' }
import pricing from '../public/data/tarifas.json' with { type: 'json' }
import schedule from '../public/data/horarios.json' with { type: 'json' }
import { seoPages, siteOrigin } from '../src/seo.js'

export function createDiscoveryFiles() {
  const { pages } = spanish
  const contact = pages.contactenos
  const details = [
    `Sitio oficial: ${siteOrigin}/`,
    'Idioma principal: español. La interfaz también ofrece inglés.',
    `Dirección: ${contact.address}, ${contact.city}`,
    `Ubicación: San Lucas, El Poblado, ${contact.city}`,
    `Teléfono / WhatsApp: ${contact.phone}`,
    `Correo electrónico: ${contact.email}`,
  ].join('\n\n')
  const summaries = {
    '/': pages.landing.introduction,
    '/normatividad/': pages.normatividad.licensingLines.join(' '),
    '/porque-brazada/': pages.porqueBrazada.story.paragraphs[0],
    '/contactenos/': contact.introduction,
    '/natacion/': pages.natacion.introduction,
    '/fitness/': pages.landing.cards.fitnessDescription,
    '/hidrogimnasia/': pages.landing.cards.hydroDescription,
    '/masajes/': pages.masajes.introduction,
    '/protocolos/': pages.protocolos.title,
    '/tarifas/': `${pages.tarifas.title} ${pricing.year}`,
    '/horarios/': pages.horarios.title,
  }
  const links = Object.entries(seoPages).map(([route, page]) =>
    `- [${page.title.replace(/ - Brazada$/, '')}](${page.canonical}): ${summaries[route]}`,
  ).join('\n')
  const index = [
    '# Brazada',
    `> ${pages.landing.introduction}. Centro deportivo y academia de natación en San Lucas, El Poblado, Medellín, Colombia.`,
    details,
    '## Páginas oficiales',
    links,
    '## Optional',
    `- [Información ampliada en texto](${siteOrigin}/llms-full.txt): Servicios, contacto, tarifas y horarios publicados en el sitio.`,
  ].join('\n\n') + '\n'
  const sections = [
    '# Brazada',
    `> ${pages.landing.introduction}.`,
    details,
    ...Object.entries(seoPages).map(([route, page]) => {
      let paragraphs = [summaries[route]]
      if (route === '/porque-brazada/') paragraphs = pages.porqueBrazada.story.paragraphs
      if (route === '/natacion/') paragraphs.push(...['babies', 'children', 'adults', 'diving'].map(key => `### ${pages.natacion[key].title}\n\n${pages.natacion[key].text}`))
      if (route === '/fitness/') paragraphs = Object.values(pages.fitness).filter(value => value?.text).map(value => `### ${value.title}\n\n${value.text}${value.weightsText ? `\n\n${value.weightsText}` : ''}`)
      if (route === '/hidrogimnasia/') paragraphs = ['therapy', 'exercise'].map(key => `### ${pages.hidrogimnasia[key].title}\n\n${pages.hidrogimnasia[key].text}`)
      if (route === '/masajes/') paragraphs = ['introduction', 'benefits', 'application'].map(key => pages.masajes[key])
      if (route === '/contactenos/') paragraphs.push(details)
      if (route === '/protocolos/') paragraphs = Object.values(pages.protocolos).filter(value => value?.items).map(value => `### ${value.title}\n\n${value.items.map(item => `- ${item}`).join('\n')}`)
      if (route === '/tarifas/') paragraphs = [
        `Año publicado: ${pricing.year}. Importes mostrados tal como aparecen en la página; confirmar vigencia y disponibilidad con Brazada.`,
        ...Object.entries(pricing.groups).map(([name, group]) => `### ${name}\n\n${Object.values(group.items).map(item => `- ${[item.description, item.quantity, item.price].filter(Boolean).join(' — ')}`).join('\n')}`),
      ]
      if (route === '/horarios/') paragraphs = Object.entries(schedule.groups).map(([name, group]) => `### ${name}\n\n${Object.values(group.items).map(item => `- ${item.description}`).join('\n')}`)
      return `## ${page.title.replace(/ - Brazada$/, '')}\n\nFuente: ${page.canonical}\n\n${paragraphs.join('\n\n')}`
    }),
  ].join('\n\n') + '\n'
  const robots = [
    '# Public search and user-directed retrieval. Training policy is unchanged.',
    ...['*', 'Googlebot', 'bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User'].map(agent => `User-agent: ${agent}\nAllow: /`),
    `Sitemap: ${siteOrigin}/sitemap.xml`,
  ].join('\n\n') + '\n'
  return { 'llms.txt': index, 'llms-full.txt': sections, 'robots.txt': robots }
}
