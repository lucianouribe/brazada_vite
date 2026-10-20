import { useContent } from '../content'
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

function AccessibilityFeatures() {
  const { copy } = useContent()
  const content = copy.pages.porqueBrazada
  const dialog = useRef(null)
  const [videoOpen, setVideoOpen] = useState(false)

  function openVideo() {
    setVideoOpen(true)
    dialog.current.showModal()
  }

  return (
    <section className="about-features about-width" aria-labelledby="difference-title">
      <div className="about-features-heading">
        <SectionHeading title={content.features.title} backdrop={content.features.backdrop} id="difference-title" />
      </div>
      <div className="about-feature-grid">
        <figure className="about-feature">
          <img src={safety} alt={content.features.safetyAlt} width="600" height="600" />
          <figcaption>{content.features.safety}</figcaption>
        </figure>
        <figure className="about-feature about-feature-video">
          <img src={lift} alt={content.features.liftAlt} width="1080" height="1080" />
          <button className="about-video-play" type="button" aria-label={content.video.open} onClick={openVideo}>
            <Icon name="play" />
          </button>
          <figcaption>{content.features.lift}<button type="button" onClick={openVideo}>{content.video.watch}</button></figcaption>
        </figure>
        <figure className="about-feature">
          <img src={accessibility} alt={content.features.accessibilityAlt} width="600" height="600" />
          <figcaption>{content.features.accessibility}</figcaption>
        </figure>
      </div>
      <dialog className="about-video-dialog" ref={dialog} aria-labelledby="lift-video-title" onClose={() => setVideoOpen(false)} onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          dialog.current.close()
        }
      }}>
        <div className="about-video-heading">
          <h2 id="lift-video-title">{content.video.title}</h2>
          <button className="icon-button" type="button" aria-label={content.video.close} onClick={() => dialog.current.close()}><Icon name="close" /></button>
        </div>
        {videoOpen && <iframe title={content.video.iframeTitle} src="https://www.youtube-nocookie.com/embed/5_rJUJd-42I" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
        <a className="about-video-fallback" href="https://www.youtube.com/watch?v=5_rJUJd-42I" target="_blank" rel="noopener noreferrer">{content.video.youtube}</a>
      </dialog>
    </section>
  )
}

export default function PorqueBrazada() {
  const { copy } = useContent()
  const content = copy.pages.porqueBrazada
  return (
    <main id="main-content" className="about-page">
      <section className="about-banner" aria-labelledby="about-title">
        <img src={banner} alt={content.bannerAlt} fetchPriority="high" />
        <div className="about-width"><h1 id="about-title">{content.title}</h1></div>
      </section>
      <AccessibilityFeatures />
      <section className="about-story" aria-labelledby="who-title">
        <div className="about-width">
          <div className="about-story-row">
            <div className="about-story-copy">
              <SectionHeading title={content.story.title} backdrop={content.story.backdrop} id="who-title" />
              {content.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <img className="about-story-image" src={about} alt={content.story.imageAlt} loading="lazy" width="1080" height="1080" />
          </div>
          <div className="about-gym-row">
            <img className="about-story-image" src={gym} alt={content.story.gymAlt} loading="lazy" width="1080" height="1080" />
          </div>
        </div>
      </section>
    </main>
  )
}
