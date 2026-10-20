import { useEffect } from 'react'
import { useContent } from '../content'
import { getPageSeo, serializeSchema } from '../seo'

export default function PageSeo({ path }) {
  const { copy } = useContent()

  useEffect(() => {
    const seo = getPageSeo(path, copy)
    document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove())
    document.title = seo.title
    document.querySelector('title').setAttribute('data-seo', '')
    document.documentElement.lang = copy.metadata.language
    for (const attributes of seo.meta) {
      const element = document.createElement('meta')
      element.setAttribute('data-seo', '')
      for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value)
      document.head.append(element)
    }
    if (seo.canonical) {
      const element = document.createElement('link')
      element.setAttribute('data-seo', '')
      element.rel = 'canonical'
      element.href = seo.canonical
      document.head.append(element)
    }
    for (const schema of seo.schemas) {
      const element = document.createElement('script')
      element.setAttribute('data-seo', '')
      element.type = 'application/ld+json'
      element.textContent = serializeSchema(schema)
      document.head.append(element)
    }
  }, [copy, path])

  return null
}
