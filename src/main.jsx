import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LanguageProvider from './components/LanguageProvider'
import { loadContent } from './load-content'
import ContentBoundary, { ContentError } from './components/ContentBoundary'

let root
let attempt = 0

async function start() {
  const currentAttempt = ++attempt
  try {
    const data = await loadContent()
    if (currentAttempt !== attempt) return
    root ||= createRoot(document.getElementById('root'))
    root.render(
      <StrictMode>
        <ContentBoundary key={currentAttempt} onRetry={start}>
          <LanguageProvider data={data}><App /></LanguageProvider>
        </ContentBoundary>
      </StrictMode>,
    )
  } catch (error) {
    if (currentAttempt !== attempt) return
    console.error('Could not load site content. Check the public JSON files.', error)
    root ||= createRoot(document.getElementById('root'))
    root.render(<ContentError onRetry={start} />)
  }
}

start()
