import { useContent } from '../content'

export default function Placeholder({ page }) {
  const { copy } = useContent()
  const content = copy.shared.placeholder
  return (
    <main id="main-content" className="blank-page" aria-label={page?.label || content.notFound}>
      {!page && <div className="content-width"><h1>{content.notFound}</h1><a href="/">{content.backHome}</a></div>}
    </main>
  )
}
