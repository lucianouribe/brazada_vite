import banner from '../assets/imgs/Fondo-Hidrogimnasia.jpg'
import therapy from '../assets/imgs/hidro-01.jpg'
import exercise from '../assets/imgs/Hidrogimnasia.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'
import ActionLink from '../components/ActionLink'
import { whatsappUrl } from '../content'

export default function Hidrogimnasia() {
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent('Hola, tengo una solicitud')}`

  return (
    <ServiceLayout title="Hidrogimnasia" banner={banner} bannerAlt="Actividades acuáticas en Brazada" className="hidrogimnasia-page">
      <ServiceRow image={therapy} alt="Ejercicios de hidroterapia en la piscina">
        <div className="water-therapy">
          <SectionHeading title="Hidroterapia" backdrop="Brazada" />
          <p>El agua es un medio adecuado para rehabilitar y reincorporar a las actividades de su vida diaria a las personas que así lo necesiten. La fuerza hidrostática exige menos esfuerzo del corazón y a la vez potencia el trabajo de los sistemas óseo y muscular.</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={exercise} imageSize={600} imageRight alt="Clase de hidrogimnasia al aire libre">
        <div className="water-exercise">
          <SectionHeading title="Hidrogimnasia" backdrop="Brazada" />
          <p>El sol. El aire libre y el agua tienen un efecto revitalizante. Los ejercicios que se hacen en el medio acuático son de bajo impacto y tienen resultados favorables en los músculos, sistema cardiorrespiratorio y en la elasticidad, además disminuyen el estrés.</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
