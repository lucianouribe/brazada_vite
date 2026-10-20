import { useContent } from '../content'
import banner from '../assets/imgs/tarifas_header.jpg'
import PageBanner from '../components/PageBanner'
import PricingCard from '../components/PricingCard'
import SectionHeading from '../components/SectionHeading'
import './Tarifas.css'

export default function Tarifas() {
  const { copy, language, data: { tarifas } } = useContent()
  const content = copy.pages.tarifas
  return (
    <main id="main-content" className="pricing-page">
      <PageBanner title={content.title} image={banner} alt={content.bannerAlt} />
      <div className="pricing-groups page-width">
        {Object.entries(tarifas.groups).map(([name, group], index) => {
          const translation = language === 'en' ? content.groups?.[name] : null
          return (
            <section className="pricing-group" key={name} aria-labelledby={`pricing-group-${index}`} style={{ '--pricing-background': group.backgroundColor, '--pricing-color': group.textColor }}>
              <SectionHeading title={translation ? translation.title : group.title || name} backdrop={tarifas.year} id={`pricing-group-${index}`} />
              <div className="pricing-grid">
                {Object.entries(group.items).map(([id, item]) => (
                  <PricingCard key={id} {...item} {...translation?.items?.[id]} price={language === 'en' ? item.price.replace(' C/U', ` ${content.each}`) : item.price} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
