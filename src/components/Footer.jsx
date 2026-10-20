import whatsapp from '../assets/imgs/whatsapp.png'
import { useContent, whatsappUrl, instagramUrl, informationPolicyUrl } from '../content'
import ContactForm from './ContactForm'
import Icon from './Icon'

function Footer() {
  const { copy, navigation, services } = useContent()
  const content = copy.shared.footer
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <section>
          <h2>{content.contact}</h2>
          <p>{content.description}</p>
          <a className="contact-link" href="tel:+573105386485"><Icon name="phone" />{content.phone}</a>
          <a className="contact-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><img src={whatsapp} alt="" width="18" height="18" />{content.phone}</a>
        </section>
        <section>
          <h2>{content.services}</h2>
          <ul className="footer-services">
            {[...services.filter((item) => item.href !== '/protocolos/').slice(0, 3), services[3], navigation[1], { label: copy.shared.additionalPages.informationPolicy, href: informationPolicyUrl }].map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
          </ul>
        </section>
        <section>
          <h2>{content.writeToUs}</h2>
          <ContactForm />
        </section>
      </div>
      <div className="footer-bottom content-width">
        <p>{content.copyright}</p>
        <div className="social-links">
          <span>{content.followUs}</span>
          <a href="https://www.facebook.com/brazadacentrodeportivo/" aria-label={content.facebook} target="_blank" rel="noopener noreferrer"><Icon name="facebook" /></a>
          <a href={instagramUrl} aria-label={content.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></a>
          <a href="https://www.youtube.com/channel/UCEUIZsel5LqWHQuJVd9Sodg" aria-label={content.youtube} target="_blank" rel="noopener noreferrer"><Icon name="youtube" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
