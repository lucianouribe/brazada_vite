import banner from '../assets/imgs/natacion_header_2000_x_720.jpg'
import babies from '../assets/imgs/Natacion-bebes.jpg'
import children from '../assets/imgs/natacion_ninos.jpg'
import adults from '../assets/imgs/natacion_adultos2.jpg'
import diving from '../assets/imgs/natacion_buceo.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'
import ActionLink from '../components/ActionLink'
import { useContent, whatsappUrl } from '../content'

export default function Natacion() {
  const { copy } = useContent()
  const content = copy.pages.natacion
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent(copy.shared.whatsappRequest)}`

  return (
    <ServiceLayout title={content.title} banner={banner} bannerAlt={content.bannerAlt} className="natacion-page">
      <ServiceRow image={babies} imageSize={600} alt={content.babies.alt}>
        <p className="swimming-introduction">{content.introduction}</p>
        <div className="swimming-babies">
          <SectionHeading title={content.babies.title} backdrop={content.backdrop} />
          <p>{content.babies.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={children} imageRight alt={content.children.alt}>
        <div className="swimming-children">
          <SectionHeading title={content.children.title} backdrop={content.backdrop} />
          <p><strong>{content.children.subtitle}</strong><br />{content.children.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={adults} alt={content.adults.alt}>
        <div className="swimming-adults">
          <SectionHeading title={content.adults.title} backdrop={content.backdrop} />
          <p><strong>{content.adults.subtitle}</strong><br />{content.adults.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={diving} imageRight alt={content.diving.alt}>
        <div className="swimming-diving">
          <SectionHeading title={content.diving.title} backdrop={content.backdrop} />
          <p>{content.diving.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
