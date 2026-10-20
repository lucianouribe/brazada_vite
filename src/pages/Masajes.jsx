import banner from '../assets/imgs/Masaje-fondo-nueva.jpg'
import massage from '../assets/imgs/Masajes.jpg'
import ServiceLayout, { ServiceRow } from '../components/ServiceLayout'
import SectionHeading from '../components/SectionHeading'

export default function Masajes() {
  return (
    <ServiceLayout title="Masajes" banner={banner} bannerAlt="Masajes terapéuticos y de relajación en Brazada" className="masajes-page">
      <ServiceRow image={massage} imageSize={600} alt="Sesión de masaje en Brazada">
        <div className="massage-copy">
          <SectionHeading title="Masajes" backdrop="Brazada" />
          <p>Reflexología, drenaje linfático, masajes terapéutico, de relajación y deportivos son algunas de las opciones que tenemos en Brazada.</p>
          <p>El masaje deportivo es una técnica manual que tiene como finalidad mejorar el rendimiento y el estado físico del deportista. Se aplica con el objetivo de que el deportista pueda alcanzar la puesta en forma óptima, además de prevenir y evitar lesiones o acelerar la rehabilitación de los problemas musculares que ya tuviera.</p>
          <p>Este tipo de masaje, se puede emplear tanto como preparación previa al entrenamiento o competición, o para estirar y relajar la musculatura después de realizar el entrenamiento diario.</p>
        </div>
      </ServiceRow>
    </ServiceLayout>
  )
}
