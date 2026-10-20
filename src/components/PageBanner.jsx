import './PageBanner.css'

export default function PageBanner({ title, image, alt }) {
  return (
    <section className="page-banner" aria-labelledby="page-title">
      <img src={image} alt={alt} fetchPriority="high" />
      <div className="page-width"><h1 id="page-title">{title}</h1></div>
    </section>
  )
}
