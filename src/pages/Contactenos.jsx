import banner from '../assets/imgs/contactenos-header.jpg'
import PageBanner from '../components/PageBanner'
import ContactForm from '../components/ContactForm'
import Icon from '../components/Icon'
import { instagramUrl, whatsappUrl } from '../content'
import './Contactenos.css'

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3966.6144908539613!2d-75.5629152!3d6.1823218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4682f20a33522f%3A0xc99bc7bd02f7e0c0!2sCl.%2018%20Sur%20%2324-44%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1568919494399!5m2!1ses-419!2sco'

export default function Contactenos() {
  return (
    <main id="main-content" className="contact-page">
      <PageBanner title="Contáctenos" image={banner} alt="Instalaciones de Brazada en Medellín" />
      <div className="contact-page-body page-width">
        <section className="contact-page-details" aria-label="Ubicación y datos de contacto">
          <iframe title="Ubicación de Brazada en Google Maps" src={mapUrl} width="635" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <div className="contact-details-grid">
            <div>
              <h2>Dirección</h2>
              <p><a href="https://goo.gl/maps/jTVDkjt1xssLv4H86" target="_blank" rel="noopener noreferrer">Calle 18 sur # 24-44</a><br />Medellín, Colombia.</p>
            </div>
            <div>
              <h2>WhatsApp</h2>
              <p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">+57 310 538 6485</a></p>
            </div>
            <div>
              <h2>Teléfono</h2>
              <p><a href="tel:+573105386485">+57 310 538 6485</a></p>
            </div>
            <div>
              <h2>Correo electrónico</h2>
              <p><a href="mailto:brazada12@gmail.com">brazada12@gmail.com</a></p>
            </div>
          </div>
          <p className="contact-page-introduction">En Brazada reconocemos la individualidad de las personas. Por eso diseñamos un Plan Integral con el que cada usuario, de acuerdo con sus necesidades, deseos y disponibilidad, organiza su plan de entrenamiento físico.</p>
        </section>
        <section aria-label="Formulario de contacto">
          <ContactForm variant="page" />
        </section>
      </div>
      <section className="contact-page-social" aria-labelledby="contact-social-title">
        <h2 id="contact-social-title">Síguenos</h2>
        <div>
          <a href="https://www.facebook.com/brazadacentrodeportivo/" target="_blank" rel="noopener noreferrer" aria-label="Brazada en Facebook"><Icon name="facebook" /></a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Brazada en Instagram"><Icon name="instagram" /></a>
          <a href="https://www.youtube.com/channel/UCEUIZsel5LqWHQuJVd9Sodg" target="_blank" rel="noopener noreferrer" aria-label="Brazada en YouTube"><Icon name="youtube" /></a>
        </div>
      </section>
    </main>
  )
}
