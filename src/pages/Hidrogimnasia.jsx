import banner from '../assets/imgs/Fondo-Hidrogimnasia.jpg'
import therapy from '../assets/imgs/hidro-01.jpg'
import exercise from '../assets/imgs/Hidrogimnasia.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'
import ActionLink from '../components/ActionLink'
import { useContent, whatsappUrl } from '../content'

export default function Hidrogimnasia() {
  const { copy } = useContent()
  const content = copy.pages.hidrogimnasia
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent(copy.shared.whatsappRequest)}`

  return (
    <ServiceLayout title={content.title} banner={banner} bannerAlt={content.bannerAlt} className="hidrogimnasia-page">
      <ServiceRow image={therapy} alt={content.therapy.alt}>
        <div className="water-therapy">
          <SectionHeading title={content.therapy.title} backdrop={content.backdrop} />
          <p>{content.therapy.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={exercise} imageSize={600} imageRight alt={content.exercise.alt}>
        <div className="water-exercise">
          <SectionHeading title={content.exercise.title} backdrop={content.backdrop} />
          <p>{content.exercise.text}</p>
          <ActionLink href={contactUrl} external>{content.contact}</ActionLink>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
