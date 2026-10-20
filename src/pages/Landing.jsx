import pool from '../assets/imgs/Inicio.jpg'
import swimming from '../assets/imgs/home_header.jpg'
import training from '../assets/imgs/home_header2.jpg'
import wellbeing from '../assets/imgs/home_header3.jpg'
import swimmingCard from '../assets/imgs/natacion_home.jpg'
import hydroCard from '../assets/imgs/hidro_home.jpg'
import fitnessCard from '../assets/imgs/fit_home.jpg'
import { institution, services, testimonials, instagramUrl } from '../content'
import useCarousel from '../hooks/useCarousel'
import Icon from '../components/Icon'
import ActionLink from '../components/ActionLink'
import SectionHeading from '../components/SectionHeading'

const slides = [
  { image: pool, alt: 'Piscina al aire libre de Brazada' },
  { image: swimming, alt: 'Clase de natación en la piscina de Brazada' },
  { image: training, alt: 'Actividad física y entrenamiento en Brazada' },
  { image: wellbeing, alt: 'Deporte y bienestar en Brazada' },
]
const cards = [
  { ...services[0], image: swimmingCard, description: 'Bebés, niños, jóvenes y adultos' },
  { ...services[2], image: hydroCard, description: 'Hidrogimnasia | Hidroterapia' },
  {
    ...services[1],
    image: fitnessCard,
    description: 'Cardio, pesas, tono, core, circuito, spinning, pilates, masajes, jiu-jitsu, entre otros',
  },
]

function CarouselControls({ carousel, label }) {
  return (
    <>
      <button className="carousel-arrow previous" type="button" aria-label={`${label} anterior`} onClick={() => carousel.move(-1)}><Icon name="chevron" /></button>
      <button className="carousel-arrow next" type="button" aria-label={`${label} siguiente`} onClick={() => carousel.move(1)}><Icon name="chevron" /></button>
      {!carousel.reducedMotion && (
        <button className="carousel-pause" type="button" aria-label={`${carousel.paused ? 'Reproducir' : 'Pausar'} ${label === 'Imagen' ? 'imágenes' : 'testimonios'}`} onClick={carousel.toggle}>
          <Icon name={carousel.paused ? 'play' : 'pause'} />
        </button>
      )}
    </>
  )
}

function Hero() {
  const carousel = useCarousel(slides.length, 7000)

  return (
    <section className="hero" aria-label="Bienestar en Brazada" aria-roledescription="carrusel">
      {slides.map((slide, index) => (
        <img key={slide.image} className={`hero-image${index === carousel.index ? ' is-active' : ''}`} src={slide.image} alt={slide.alt} aria-hidden={index !== carousel.index} fetchPriority={index === 0 ? 'high' : 'auto'} />
      ))}
      <div className="hero-copy">
        <h1>BIENESTAR</h1>
        <p>UN ESTILO DE VIDA</p>
        <span>#yosoybrazada</span>
      </div>
      <CarouselControls carousel={carousel} label="Imagen" />
    </section>
  )
}

function Landing() {
  const carousel = useCarousel(testimonials.length, 8500)
  const testimonial = testimonials[carousel.index]

  return (
    <main id="main-content">
      <Hero />
      <section className="introduction">
        <h2>Una experiencia positiva más allá del deporte para toda la vida</h2>
      </section>
      <section className="service-cards" aria-label="Nuestros servicios">
        {cards.map((card, index) => (
          <a className={`service-card service-card-${index + 1}`} href={card.href} key={card.href}>
            <img src={card.image} alt="" loading="lazy" width="1080" height="1080" />
            <span className="service-label">{card.label}</span>
            <div className="service-description"><h2>{card.label}</h2><p>{card.description}</p></div>
          </a>
        ))}
      </section>
      <section className="institution content-width" aria-label="Nuestra institución">
        <div className="institution-top">
          <div className="institution-video">
            <iframe title="Entrenamiento — Brazada Centro Deportivo" src="https://www.youtube-nocookie.com/embed/0D0tOTUDkTE" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <div className="institution-about">
            <SectionHeading title={institution.about.title} backdrop="Brazada" />
            <p>{institution.about.text}</p>
            <ActionLink href="/porque-brazada/">Saber más</ActionLink>
          </div>
        </div>
        <div className="institution-values">
          <article className="mission">
            <h2>Misión</h2>
            <p>{institution.mission}</p>
          </article>
          <article className="vision">
            <SectionHeading title="Visión" />
            <p>{institution.vision}</p>
          </article>
          <article className="objective">
            <SectionHeading title="General" backdrop="Objetivo" />
            <p>{institution.objective}</p>
          </article>
        </div>
      </section>
      <section className="testimonials" aria-label="Testimonios" aria-roledescription="carrusel">
        <div className="testimonial" aria-live={carousel.paused ? 'polite' : 'off'} aria-atomic="true">
          <span className="quote-mark" aria-hidden="true">“</span>
          <h2>{testimonial.name}</h2>
          <p>{testimonial.text}</p>
          {testimonial.role && <h3>{testimonial.role}<span aria-hidden="true">,</span></h3>}
        </div>
        <CarouselControls carousel={carousel} label="Testimonio" />
      </section>
      <section className="instagram content-width" aria-labelledby="instagram-title">
        <div>
          <SectionHeading id="instagram-title" title={<>Síguenos en<br />instagram</>} backdrop="Brazada" />
          <a className="instagram-handle" href={instagramUrl} target="_blank" rel="noopener noreferrer">@brazadacentrodeportivo</a>
        </div>
        <ActionLink href={instagramUrl} external>Todas las publicaciones</ActionLink>
      </section>
    </main>
  )
}

export default Landing
