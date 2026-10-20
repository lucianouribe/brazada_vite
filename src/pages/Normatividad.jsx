import banner from '../assets/imgs/normatividad_header.jpg'
import SectionHeading from '../components/SectionHeading'
import { useContent, informationPolicyUrl } from '../content'
import './Normatividad.css'


export default function Normatividad() {
  const { copy } = useContent()
  const content = copy.pages.normatividad
  return (
    <main id="main-content" className="normatividad-page">
      <section className="normatividad-banner" aria-labelledby="normatividad-title">
        <img src={banner} alt={content.bannerAlt} fetchPriority="high" />
        <div className="normatividad-width">
          <h1 id="normatividad-title">{content.title}</h1>
        </div>
      </section>
      <div className="normatividad-body normatividad-width">
        <section className="normatividad-licensing" aria-labelledby="licensing-title">
          <SectionHeading title={content.heading} backdrop={content.backdrop} id="licensing-title" />
          <p>{content.licensingLines.map((line) => <span className="licensing-line" key={line}>{line}{' '}</span>)}</p>
        </section>
        <section className="normatividad-policy" aria-labelledby="policy-title">
          <SectionHeading title={content.policy.title} backdrop={content.policy.backdrop} id="policy-title" />
          <p>{content.policy.introduction}<a href={informationPolicyUrl}><em><strong>{content.policy.link}</strong></em></a></p>
        </section>
      </div>
    </main>
  )
}
