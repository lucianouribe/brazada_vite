import pool from '../assets/imgs/Inicio.jpg'
import swimming from '../assets/imgs/home_header.jpg'
import training from '../assets/imgs/home_header2.jpg'
import wellbeing from '../assets/imgs/home_header3.jpg'
import swimmingCard from '../assets/imgs/natacion_home.jpg'
import hydroCard from '../assets/imgs/hidro_home.jpg'
import fitnessCard from '../assets/imgs/fit_home.jpg'
import { useContent, instagramUrl } from '../content'
import useCarousel from '../hooks/useCarousel'
import Icon from '../components/Icon'
import ActionLink from '../components/ActionLink'
import SectionHeading from '../components/SectionHeading'

function CarouselControls({ carousel, labels }) {
  return (
    <>
      <button className="carousel-arrow previous" type="button" aria-label={labels.previous} onClick={() => carousel.move(-1)}><Icon name="chevron" /></button>
      <button className="carousel-arrow next" type="button" aria-label={labels.next} onClick={() => carousel.move(1)}><Icon name="chevron" /></button>
      {!carousel.reducedMotion && (
        <button className="carousel-pause" type="button" aria-label={carousel.paused ? labels.play : labels.pause} onClick={carousel.toggle}>
          <Icon name={carousel.paused ? 'play' : 'pause'} />
        </button>
      )}
    </>
  )
}

function Hero() {
  const { copy } = useContent()
  const content = copy.pages.landing
  const slides = [
    { image: pool, alt: content.hero.poolAlt },
    { image: swimming, alt: content.hero.swimmingAlt },
    { image: training, alt: content.hero.trainingAlt },
    { image: wellbeing, alt: content.hero.wellbeingAlt },
  ]
  const carousel = useCarousel(slides.length, 7000)

  return (
    <section className="hero" aria-label={content.hero.label} aria-roledescription={content.carousel.role}>
      {slides.map((slide, index) => (
        <img key={slide.image} className={`hero-image${index === carousel.index ? ' is-active' : ''}`} src={slide.image} alt={slide.alt} aria-hidden={index !== carousel.index} fetchPriority={index === 0 ? 'high' : 'auto'} />
      ))}
      <div className="hero-copy">
        <h1>{content.hero.title}</h1>
        <p>{content.hero.subtitle}</p>
        <span>{content.hero.hashtag}</span>
      </div>
      <CarouselControls carousel={carousel} labels={content.carousel.image} />
    </section>
  )
}

function Landing() {
  const { copy, services, institution, testimonials } = useContent()
  const content = copy.pages.landing
  const cards = [
    { ...services[0], image: swimmingCard, description: content.cards.swimmingDescription },
    { ...services[2], image: hydroCard, description: content.cards.hydroDescription },
    {
      ...services[1],
      image: fitnessCard,
      description: content.cards.fitnessDescription,
    },
  ]
  const carousel = useCarousel(testimonials.length, 8500)
  const testimonial = testimonials[carousel.index]

  return (
    <main id="main-content">
      <Hero />
      <section className="introduction">
        <h2>{content.introduction}</h2>
      </section>
      <section className="service-cards" aria-label={content.servicesLabel}>
        {cards.map((card, index) => (
          <a className={`service-card service-card-${index + 1}`} href={card.href} key={card.href}>
            <img src={card.image} alt="" loading="lazy" width="1080" height="1080" />
            <span className="service-label">{card.label}</span>
            <div className="service-description"><h2>{card.label}</h2><p>{card.description}</p></div>
          </a>
        ))}
      </section>
      <section className="institution content-width" aria-label={content.institutionLabel}>
        <div className="institution-top">
          <div className="institution-video">
            <iframe title={content.videoTitle} src="https://www.youtube-nocookie.com/embed/0D0tOTUDkTE" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <div className="institution-about">
            <SectionHeading title={institution.about.title} backdrop={content.backdrop} />
            <p>{institution.about.text}</p>
            <ActionLink href="/porque-brazada/">{content.learnMore}</ActionLink>
          </div>
        </div>
        <div className="institution-values">
          <article className="mission">
            <h2>{content.missionTitle}</h2>
            <p>{institution.mission}</p>
          </article>
          <article className="vision">
            <SectionHeading title={content.visionTitle} />
            <p>{institution.vision}</p>
          </article>
          <article className="objective">
            <SectionHeading title={content.objectiveTitle} backdrop={content.objectiveBackdrop} />
            <p>{institution.objective}</p>
          </article>
        </div>
      </section>
      <section className="testimonials" aria-label={content.testimonialsLabel} aria-roledescription={content.carousel.role}>
        <div className="testimonial" aria-live={carousel.paused ? 'polite' : 'off'} aria-atomic="true">
          <span className="quote-mark" aria-hidden="true">“</span>
          <h2>{testimonial.name}</h2>
          <p>{testimonial.text}</p>
          {testimonial.role && <h3>{testimonial.role}<span aria-hidden="true">,</span></h3>}
        </div>
        <CarouselControls carousel={carousel} labels={content.carousel.testimonial} />
      </section>
      <section className="instagram content-width" aria-labelledby="instagram-title">
        <div>
          <SectionHeading id="instagram-title" title={<>{content.instagram.title}<br />{content.instagram.platform}</>} backdrop={content.backdrop} />
          <a className="instagram-handle" href={instagramUrl} target="_blank" rel="noopener noreferrer">{content.instagram.handle}</a>
        </div>
        <ActionLink href={instagramUrl} external>{content.instagram.allPosts}</ActionLink>
      </section>
    </main>
  )
}

export default Landing
