import { renderToString } from 'react-dom/server'
import App from './App'
import LanguageProvider from './components/LanguageProvider'
import es from '../public/data/es.json'
import en from '../public/data/en.json'
import tarifas from '../public/data/tarifas.json'
import horarios from '../public/data/horarios.json'
import { validateContent } from './load-content'

const data = validateContent({ es, en, tarifas, horarios })

export function render(pathname) {
  return renderToString(<LanguageProvider data={data}><App pathname={pathname} /></LanguageProvider>)
}
