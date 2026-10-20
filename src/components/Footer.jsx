import whatsapp from '../assets/imgs/whatsapp.png'
import { navigation, services, whatsappUrl, instagramUrl, informationPolicyUrl } from '../content'
import ContactForm from './ContactForm'
import Icon from './Icon'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <section>
          <h2>Contáctenos</h2>
          <p>Brazada es un espacio amable, lleno de verde y de luz, con excelentes instalaciones para cada práctica.</p>
          <a className="contact-link" href="tel:+573105386485"><Icon name="phone" />+57 310 538 6485</a>
          <a className="contact-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><img src={whatsapp} alt="" width="18" height="18" />+57 310 538 6485</a>
        </section>
        <section>
          <h2>Servicios</h2>
          <ul className="footer-services">
            {[...services.filter((item) => item.href !== '/protocolos/').slice(0, 3), { label: 'Mente & cuerpo', href: '/mente-y-cuerpo/' }, services[3], navigation[1], { label: 'Tratamiento de datos', href: informationPolicyUrl }].map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
          </ul>
        </section>
        <section>
          <h2>Escríbenos</h2>
          <ContactForm />
        </section>
      </div>
      <div className="footer-bottom content-width">
        <p>Copyright © 2024 Brazada</p>
        <div className="social-links">
          <span>Síguenos</span>
          <a href="https://www.facebook.com/brazadacentrodeportivo/" aria-label="Brazada en Facebook" target="_blank" rel="noopener noreferrer"><Icon name="facebook" /></a>
          <a href={instagramUrl} aria-label="Brazada en Instagram" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></a>
          <a href="https://www.youtube.com/channel/UCEUIZsel5LqWHQuJVd9Sodg" aria-label="Brazada en YouTube" target="_blank" rel="noopener noreferrer"><Icon name="youtube" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
