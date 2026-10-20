import whatsapp from '../assets/imgs/whatsapp.png'
import { useContent, whatsappUrl } from '../content'
import Icon from './Icon'

export default function SiteActions() {
  const { copy } = useContent()
  const content = copy.shared.siteActions
  return (
    <>
      <a className="whatsapp-float" href={`${whatsappUrl}?text=${encodeURIComponent(copy.shared.whatsappRequest)}`} target="_blank" rel="noopener noreferrer" aria-label={content.whatsapp}><img src={whatsapp} alt="" width="50" height="50" /></a>
      <button className="back-to-top" type="button" aria-label={content.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><Icon name="up" /></button>
    </>
  )
}
