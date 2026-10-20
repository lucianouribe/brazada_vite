import { useRef, useState } from 'react'
import banner from '../assets/imgs/porque-brazada-header-1.jpg'
import safety from '../assets/imgs/Mesas-de-seguridad.jpg'
import lift from '../assets/imgs/grua.jpg'
import accessibility from '../assets/imgs/Escaleras.jpg'
import about from '../assets/imgs/Quienes-somos.jpg'
import gym from '../assets/imgs/gimnasio-04.jpg'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import './PorqueBrazada.css'

const aboutParagraphs = [
  'Brazada es una institución donde trabajamos con entusiasmo por enseñar y propiciar la práctica de actividades deportivas y de acondicionamiento físico. Nacimos en 1990, como Academia de Natación de Pablo Restrepo, y a partir de nuestra convicción de que enseñar a nadar es regalar a otros la oportunidad de gozar de bienestar, salud física y mental, incluimos con el tiempo más actividades que aportaran iguales beneficios.',
  'Brazada es un espacio amable, lleno de verde y de luz, con excelentes instalaciones para cada práctica. Quienes nos visitan se sienten acogidos en un ambiente familiar y tranquilo, y reciben la atención cálida y personalizada de nuestros instructores profesionales. En Brazada sabemos que la alegría y la tranquilidad interior provienen de sentir sanos y en equilibrio nuestro cuerpo y nuestra mente. ¡Y además sabemos cómo acompañarlo para que usted lo viva!.',
]

function AccessibilityFeatures() {
  const dialog = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)

  function openVideo() {
    setVideoOpen(true)
    dialog.current.showModal()
  }

  return (
    <section className="about-features about-width" aria-labelledby="difference-title">
      <div className="about-features-heading">
        <SectionHeading title="Diferencia" backdrop="Nos" id="difference-title" />
      </div>
      <div className="about-feature-grid">
        <figure className="about-feature">
          <img src={safety} alt="Instructora acompañando a una alumna sobre una mesa de seguridad en la piscina" width="600" height="600" />
          <figcaption>Mesas de seguridad</figcaption>
        </figure>
        <figure className="about-feature about-feature-video">
          <img src={lift} alt="Grúa de acceso a la piscina de Brazada" width="1080" height="1080" />
          <button className="about-video-play" type="button" aria-label="Ver video de la grúa de acceso a la piscina" onClick={openVideo}>
            <Icon name="play" />
          </button>
          <figcaption>Grúa <button type="button" onClick={openVideo}>Ver video</button></figcaption>
        </figure>
        <figure className="about-feature">
          <img src={accessibility} alt="Escaleras y pasamanos para un acceso seguro a la piscina" width="600" height="600" />
          <figcaption>Accesibilidad</figcaption>
        </figure>
      </div>
      <dialog className="about-video-dialog" ref={dialog} aria-labelledby="lift-video-title" onClose={() => setVideoOpen(false)} onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          dialog.current.close()
        }
      }}>
        <div className="about-video-heading">
          <h2 id="lift-video-title">Grúa de acceso a la piscina</h2>
          <button className="icon-button" type="button" aria-label="Cerrar video" onClick={() => dialog.current.close()}><Icon name="close" /></button>
        </div>
        {videoOpen && <iframe title="Grúa de acceso a la piscina de Brazada" src="https://www.youtube-nocookie.com/embed/5_rJUJd-42I" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
        <a className="about-video-fallback" href="https://www.youtube.com/watch?v=5_rJUJd-42I" target="_blank" rel="noopener noreferrer">Ver en YouTube</a>
      </dialog>
    </section>
  )
}

export default function PorqueBrazada() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-banner" aria-labelledby="about-title">
        <img src={banner} alt="Clase de actividad acuática en la piscina de Brazada" fetchPriority="high" />
        <div className="about-width"><h1 id="about-title">Sobre nosotros</h1></div>
      </section>
      <AccessibilityFeatures />
      <section className="about-story" aria-labelledby="who-title">
        <div className="about-width">
          <div className="about-story-row">
            <div className="about-story-copy">
              <SectionHeading title="Somos" backdrop="Quiénes" id="who-title" />
              {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <img className="about-story-image" src={about} alt="Instalaciones y piscina de Brazada, rodeadas de vegetación" loading="lazy" width="1080" height="1080" />
          </div>
          <div className="about-gym-row">
            <img className="about-story-image" src={gym} alt="Gimnasio de Brazada con equipos de acondicionamiento físico" loading="lazy" width="1080" height="1080" />
          </div>
        </div>
      </section>
    </main>
  )
}
