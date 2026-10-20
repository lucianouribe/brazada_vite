import { useContent } from '../content'
import banner from '../assets/imgs/Masaje-fondo-nueva.jpg'
import massage from '../assets/imgs/Masajes.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'

export default function Masajes() {
  const { copy } = useContent()
  const content = copy.pages.masajes
  return (
    <ServiceLayout title={content.title} banner={banner} bannerAlt={content.bannerAlt} className="masajes-page">
      <ServiceRow image={massage} imageSize={600} alt={content.imageAlt}>
        <div className="massage-copy">
          <SectionHeading title={content.heading} backdrop={content.backdrop} />
          <p>{content.introduction}</p>
          <p>{content.benefits}</p>
          <p>{content.application}</p>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
