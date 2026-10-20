import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

export const whatsappUrl = 'https://wa.me/573105386485'
export const instagramUrl = 'https://www.instagram.com/brazadacentrodeportivo/'
export const informationPolicyUrl = '/documents/POLITICA_DE_TRATAMIENTO_DE_INFORMACION.pdf'

export function useContent() {
  const languageContext = useContext(LanguageContext)
  if (!languageContext) throw new Error('useContent requires LanguageProvider')
  const { language, data } = languageContext
  const copy = data[language]
  const services = [
    { label: copy.services.swimming, href: '/natacion/' },
    { label: copy.services.fitness, href: '/fitness/' },
    { label: copy.services.waterExercise, href: '/hidrogimnasia/' },
    { label: copy.services.massage, href: '/masajes/' },
    { label: copy.services.protocols, href: '/protocolos/' },
  ]

  const navigation = [
    { label: copy.navigation.home, href: '/' },
    { label: copy.navigation.regulations, href: '/normatividad/' },
    { label: copy.navigation.services },
    { label: copy.navigation.about, href: '/porque-brazada/' },
    { label: copy.navigation.pricing, href: '/tarifas/' },
    { label: copy.navigation.schedule, href: '/horarios/' },
    { label: copy.navigation.contact, href: '/contactenos/' },
  ]

  return {
    ...languageContext,
    copy,
    services,
    navigation,
    institution: copy.pages.landing.institution,
    testimonials: copy.pages.landing.testimonials,
  }
}

export function formatText(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (!Object.hasOwn(values, key)) throw new Error(`Missing text parameter: ${key}`)
    return values[key]
  })
}
