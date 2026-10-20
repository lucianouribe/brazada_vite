import { Component } from 'react'

export function ContentError({ onRetry }) {
  return (
    <main role="alert" className="page-width">
      <h1>No se pudo cargar el contenido</h1>
      <p>No pudimos leer los archivos de contenido. Intenta de nuevo en unos momentos.</p>
      <p lang="en">The site content could not be loaded. Please try again.</p>
      <button type="button" onClick={onRetry}>Reintentar / Retry</button>
    </main>
  )
}

export default class ContentBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('Could not display site content. Check the public JSON files.', error, info)
  }

  render() {
    return this.state.failed ? <ContentError onRetry={this.props.onRetry} /> : this.props.children
  }
}
