import { useState } from 'react'
import { LanguageContext } from '../content'

const storageKey = 'brazada-language'

function readLanguage() {
  if (typeof window === 'undefined') return 'es'
  try {
    return localStorage.getItem(storageKey) === 'en' ? 'en' : 'es'
  } catch (error) {
    if (!(error instanceof DOMException)) throw error
    console.warn('Could not read the saved language preference.', error)
    return 'es'
  }
}

export default function LanguageProvider({ children, data }) {
  const [language, updateLanguage] = useState(readLanguage)

  function setLanguage(value) {
    if (value !== 'es' && value !== 'en') throw new Error(`Unsupported language: ${value}`)
    updateLanguage(value)
    try {
      localStorage.setItem(storageKey, value)
    } catch (error) {
      if (!(error instanceof DOMException)) throw error
      console.warn('Could not save the language preference. The selection applies to this page only.', error)
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, data }}>{children}</LanguageContext.Provider>
}
