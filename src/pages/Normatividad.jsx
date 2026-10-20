import banner from '../assets/imgs/normatividad_header.jpg'
import SectionHeading from '../components/SectionHeading'
import { informationPolicyUrl } from '../content'
import './Normatividad.css'

const licensingLines = [
  'Institución de Educación para el Trabajo y Desarrollo Humano (IETDH) BRAZADA,',
  'con licencia de funcionamiento otorgada por la Secretaría de Educación de Medellín',
  'bajo la Resolución número 12322 del 17 de septiembre de 2010.',
  'Ofrece el programa en Natación y Habilidades Acuáticas, registrado en la Secretaría',
  'de Educación de Medellín bajo la Resolución número 202250086753 del 27 de julio',
  'de 2022. Al cumplir con todos niveles de formación se otorga el Certificado de',
  'Aptitud Ocupacional en Conocimientos Académicos en Natación y Habilidades',
  'Acuáticas. Este certificado no conduce a título profesional.',
  'La inspección y vigilancia de este programa está a cargo de la SECRETARÍA DE',
  'EDUCACIÓN DE MEDELLÍN.',
]

export default function Normatividad() {
  return (
    <main id="main-content" className="normatividad-page">
      <section className="normatividad-banner" aria-labelledby="normatividad-title">
        <img src={banner} alt="Piscina de Brazada durante una clase de natación" fetchPriority="high" />
        <div className="normatividad-width">
          <h1 id="normatividad-title">Normatividad</h1>
        </div>
      </section>
      <div className="normatividad-body normatividad-width">
        <section className="normatividad-licensing" aria-labelledby="licensing-title">
          <SectionHeading title="Normatividad" backdrop="Brazada" id="licensing-title" />
          <p>{licensingLines.map((line) => <span className="licensing-line" key={line}>{line}{' '}</span>)}</p>
        </section>
        <section className="normatividad-policy" aria-labelledby="policy-title">
          <SectionHeading title="de Datos" backdrop="Tratamiento" id="policy-title" />
          <p>Encuentra aquí nuestra <a href={informationPolicyUrl}><em><strong>política de tratamiento de información</strong></em></a></p>
        </section>
      </div>
    </main>
  )
}
