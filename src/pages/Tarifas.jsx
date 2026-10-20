import banner from '../assets/imgs/tarifas_header.jpg'
import PageBanner from '../components/PageBanner'
import PricingCard from '../components/PricingCard'
import SectionHeading from '../components/SectionHeading'
import tarifas from '../data/tarifas.json'
import './Tarifas.css'

export default function Tarifas() {
  return (
    <main id="main-content" className="pricing-page">
      <PageBanner title="Tarifas" image={banner} alt="Piscina e instalaciones de Brazada" />
      <div className="pricing-groups page-width">
        {Object.entries(tarifas.groups).map(([name, group], index) => (
          <section className="pricing-group" key={name} aria-labelledby={`pricing-group-${index}`} style={{ '--pricing-background': group.backgroundColor, '--pricing-color': group.textColor }}>
            <SectionHeading title={group.title || name} backdrop={tarifas.year} id={`pricing-group-${index}`} />
            <div className="pricing-grid">
              {Object.entries(group.items).map(([id, item]) => <PricingCard key={id} {...item} />)}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
