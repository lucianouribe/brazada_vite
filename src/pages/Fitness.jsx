import { useContent } from '../content'
import banner from '../assets/imgs/Fondo-Fitness.jpg'
import spinning from '../assets/imgs/fitness_spinning.jpg'
import core from '../assets/imgs/fitness_core.jpg'
import bands from '../assets/imgs/fitness_bandas.jpg'
import weights from '../assets/imgs/fitness_pesas.jpg'
import pilates from '../assets/imgs/fitness_pilates.jpg'
import ServiceLayout, { ServiceCopy, ServiceRow } from '../components/ServiceLayout'

export default function Fitness() {
  const { copy } = useContent()
  const content = copy.pages.fitness
  return (
    <ServiceLayout title={content.title} banner={banner} bannerAlt={content.bannerAlt} className="fitness-page">
      <ServiceRow image={spinning} alt={content.spinning.alt}>
        <ServiceCopy title={content.spinning.title} className="fitness-spinning">
          <p>{content.spinning.text}</p>
        </ServiceCopy>
        <ServiceCopy title={content.circuit.title} className="fitness-circuit">
          <p>{content.circuit.text}</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={core} imageRight alt={content.core.alt}>
        <ServiceCopy title={content.core.title} className="fitness-core">
          <p>{content.core.text}</p>
        </ServiceCopy>
        <ServiceCopy title={content.tone.title} className="fitness-tone">
          <p>{content.tone.text}</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={bands} alt={content.trx.alt}>
        <ServiceCopy title={content.trx.title} className="fitness-trx">
          <p>{content.trx.text}</p>
        </ServiceCopy>
        <ServiceCopy title={content.springs.title} className="fitness-springs">
          <p>{content.springs.text}</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={weights} imageRight alt={content.cardio.alt}>
        <ServiceCopy title={content.cardio.title} className="fitness-cardio">
          <p>{content.cardio.text}</p>
          <p>{content.cardio.weightsText}</p>
        </ServiceCopy>
      </ServiceRow>
      <ServiceRow image={pilates} alt={content.pilates.alt}>
        <ServiceCopy title={content.pilates.title}>
          <p>{content.pilates.text}</p>
        </ServiceCopy>
      </ServiceRow>
    </ServiceLayout>
  )
}
