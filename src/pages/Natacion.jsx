import banner from '../assets/imgs/natacion_header_2000_x_720.jpg'
import babies from '../assets/imgs/Natacion-bebes.jpg'
import children from '../assets/imgs/natacion_ninos.jpg'
import adults from '../assets/imgs/natacion_adultos2.jpg'
import diving from '../assets/imgs/natacion_buceo.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'
import ActionLink from '../components/ActionLink'
import { whatsappUrl } from '../content'

export default function Natacion() {
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent('Hola, tengo una solicitud')}`

  return (
    <ServiceLayout title="Natación" banner={banner} bannerAlt="Piscina de Brazada para clases de natación" className="natacion-page">
      <ServiceRow image={babies} imageSize={600} alt="Bebé acompañado durante una clase de natación">
        <p className="swimming-introduction">Ofrecemos el programa de Natación y Habilidades Acuáticas, con la inspección y vigilancia de la Secretaría de Educación de Medellín.</p>
        <div className="swimming-babies">
          <SectionHeading title="Bebés" backdrop="Natación" />
          <p>Clases desde los seis meses de edad, para que los bebés se familiaricen con el medio acuático, disfruten de él y se recreen, ejerciten su cuerpo y desarrollen habilidades motrices.</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={children} imageRight alt="Niños aprendiendo a nadar en Brazada">
        <div className="swimming-children">
          <SectionHeading title="Niños" backdrop="Natación" />
          <p><strong>Enseñanza, entrenamiento</strong><br />Además de ser una herramienta de supervivencia, la práctica de la natación les da a los niños la posibilidad de ejercitarse y de interactuar con sus compañeros en un ambiente de camaradería y amor por la naturaleza.</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={adults} alt="Entrenamiento de natación para adultos">
        <div className="swimming-adults">
          <SectionHeading title="Adultos" backdrop="Natación" />
          <p><strong>Enseñanza, entrenamiento, Senior master</strong><br />Desde aprender a nadar, hasta entrenar para mejorar su estado físico y perfeccionar algunos detalles de técnica, son las opciones que ofrecemos para las personas adultas.</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
      <ServiceRow image={diving} imageRight alt="Práctica de buceo en la piscina de Brazada">
        <div className="swimming-diving">
          <SectionHeading title="Buceo" backdrop="Natación" />
          <p>Aprender a bucear es regalarse la oportunidad de vivir las sensaciones y emociones inigualables del mundo subacuático. Espíritu sereno, mente relajada, autoconfianza, comunión con la naturaleza son algunos de los tesoros que nos entregan las aguas profundas</p>
          <ActionLink href={contactUrl} external>Contáctenos</ActionLink>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
