import whatsapp from '../assets/imgs/whatsapp.png'
import { whatsappUrl } from '../content'
import Icon from './Icon'

export default function SiteActions() {
  return (
    <>
      <a className="whatsapp-float" href={`${whatsappUrl}?text=Hola%2C%20tengo%20una%20solicitud`} target="_blank" rel="noopener noreferrer" aria-label="Hablar con Brazada por WhatsApp"><img src={whatsapp} alt="" width="50" height="50" /></a>
      <button className="back-to-top" type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><Icon name="up" /></button>
    </>
  )
}
