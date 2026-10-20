import banner from '../assets/imgs/contactenos-header.jpg'
import PageBanner from '../components/PageBanner'
import ContactForm from '../components/ContactForm'
import Icon from '../components/Icon'
import { useContent, instagramUrl, whatsappUrl } from '../content'
import './Contactenos.css'

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3966.6144908539613!2d-75.5629152!3d6.1823218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682f20a33522f%3A0xc99bc7bd02f7e0c0!2sCl.%2018%20Sur%20%2324-44%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1568919494399!5m2!1ses-419!2sco'

export default function Contactenos() {
  const { copy } = useContent()
  const content = copy.pages.contactenos
  return (
    <main id="main-content" className="contact-page">
      <PageBanner title={content.title} image={banner} alt={content.bannerAlt} />
      <div className="contact-page-body page-width">
        <section className="contact-page-details" aria-label={content.detailsLabel}>
          <iframe title={content.mapTitle} src={mapUrl} width="635" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <div className="contact-details-grid">
            <div>
              <h2>{content.addressLabel}</h2>
              <p><a href="https://goo.gl/maps/jTVDkjt1xssLv4H86" target="_blank" rel="noopener noreferrer">{content.address}</a><br />{content.city}</p>
            </div>
            <div>
              <h2>{content.whatsappLabel}</h2>
              <p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{content.phone}</a></p>
            </div>
            <div>
              <h2>{content.phoneLabel}</h2>
              <p><a href="tel:+573105386485">{content.phone}</a></p>
            </div>
            <div>
              <h2>{content.emailLabel}</h2>
              <p><a href="mailto:brazada12@gmail.com">{content.email}</a></p>
            </div>
          </div>
          <p className="contact-page-introduction">{content.introduction}</p>
        </section>
        <section aria-label={content.formLabel}>
          <ContactForm variant="page" />
        </section>
      </div>
      <section className="contact-page-social" aria-labelledby="contact-social-title">
        <h2 id="contact-social-title">{content.followUs}</h2>
        <div>
          <a href="https://www.facebook.com/brazadacentrodeportivo/" target="_blank" rel="noopener noreferrer" aria-label={content.facebook}><Icon name="facebook" /></a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={content.instagram}><Icon name="instagram" /></a>
          <a href="https://www.youtube.com/channel/UCEUIZsel5LqWHQuJVd9Sodg" target="_blank" rel="noopener noreferrer" aria-label={content.youtube}><Icon name="youtube" /></a>
        </div>
      </section>
    </main>
  )
}
