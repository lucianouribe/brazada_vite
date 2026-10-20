import PageBanner from './PageBanner'
import ActionLink from './ActionLink'
import ContactDialog from './ContactDialog'
import './ServiceLayout.css'

export function ServiceRow({ image, alt, imageSize = 1080, imageRight = false, mobileImageFirst = true, className = '', children }) {
  return (
    <section className={`service-row${imageRight ? ' service-row-image-right' : ''}${mobileImageFirst ? ' service-row-mobile-image-first' : ''} ${className}`}>
      <img className="service-row-image" src={image} alt={alt} width={imageSize} height={imageSize} style={{ maxWidth: imageSize }} loading="lazy" />
      <div className="service-row-copy">{children}</div>
    </section>
  )
}

export function ServiceCopy({ title, children, className = '' }) {
  return (
    <div className={`service-copy-block ${className}`}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default function ServiceLayout({ title, banner, bannerAlt, className, children }) {
  return (
    <main id="main-content" className={`service-page ${className}`}>
      <PageBanner title={title} image={banner} alt={bannerAlt} />
      <div className="service-rows page-width">{children}</div>
      <section className="service-information page-width" aria-labelledby="service-information-title">
        <h2 id="service-information-title">Para más información</h2>
        <div className="service-information-actions">
          <ActionLink href="/tarifas/">Ver tarifas</ActionLink>
          <ContactDialog />
        </div>
      </section>
    </main>
  )
}
