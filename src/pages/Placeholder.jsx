export default function Placeholder({ page }) {
  return (
    <main id="main-content" className="blank-page" aria-label={page?.label || 'Página no encontrada'}>
      {!page && <div className="content-width"><h1>Página no encontrada</h1><a href="/">Volver al inicio</a></div>}
    </main>
  )
}
