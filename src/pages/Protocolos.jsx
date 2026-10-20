import banner from '../assets/imgs/protocolos-header.jpg'
import pool from '../assets/imgs/NG-piscina.jpg'
import children from '../assets/imgs/NG-niños.jpg'
import gym from '../assets/imgs/NG-gimnasio.jpg'
import bathrooms from '../assets/imgs/NG-baños.jpg'
import general from '../assets/imgs/NG-generales.jpg'
import PageBanner from '../components/PageBanner'
import { ServiceCopy, ServiceRow } from '../components/ServiceLayout'
import './Protocolos.css'

function ProtocolList({ title, items, className, children }) {
  return (
    <ServiceCopy title={title} className={className}>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      {children}
    </ServiceCopy>
  )
}

export default function Protocolos() {
  return (
    <main id="main-content" className="protocols-page">
      <PageBanner title="Protocolos" image={banner} alt="Instalaciones de Brazada" />
      <div className="service-rows page-width">
        <ServiceRow image={pool} imageRight alt="Piscina de Brazada">
          <ProtocolList title="Piscina" className="protocol-pool" items={[
            'Utilizar pantaloneta de Licra (niños, jóvenes y adultos).',
            'Utilizar de carácter obligatorio el GORRO DE BAÑO para ambos sexos.',
            'DUCHARSE antes de ingresar.',
            'Pasar por el lavapies a la entrada y a la salida.',
            'No ingresar alimentos o bebidas al área de la piscina.',
            'No ingresar calzado de la calle al área de la piscina.',
            'No usar bronceador para ingresar a la piscina.',
          ]} />
          <ProtocolList title="Clases de natación personalizadas" className="protocol-private" items={[
            'Pagar por anticipado las clases que tome durante el mes.',
            'Si necesita cancelar la clase, debe hacerlo antes de 2 horas. Ésta se podrá reemplazar durante el mismo mes.',
          ]} />
        </ServiceRow>
        <ServiceRow image={children} alt="Clases de natación para niños">
          <ProtocolList title="Clases de natación niños" className="protocol-children" items={[
            'Programar día y hora de clase y cumplir con ese horario.',
            'Se cancela el mes completo.',
            'Sólo en caso de enfermedad se pueden reemplazar las clases a las que no asistió.',
            'Presentar la excusa médica y acordar con la coordinadora día y hora del reemplazo (solo en semana).',
            'Llevar a los niños al baño antes de ingresar a la piscina.',
            'Pagar oportunamente la mensualidad para tener el derecho a reposición de clases.',
            'Los niños solo deben ingresar al área de la piscina con el instructor.',
          ]} />
        </ServiceRow>
        <ServiceRow image={gym} imageRight mobileImageFirst={false} className="protocol-inset" alt="Gimnasio de Brazada">
          <ProtocolList title="Gimnasio" className="protocol-gym" items={[
            'Utilizar tenis, camiseta y toalla pequeña para el sudor.',
            'No entrar de sandalias, descalzos o mojados, ni comer en los salones de clase.',
            'Tener en cuenta las indicaciones del manejo adecuado de las máquinas.',
            'Área exclusiva para jóvenes y adultos.',
          ]} />
          <ProtocolList title="Salón segundo piso" className="protocol-room" items={[
            'Dejar los zapatos fuera del salón.',
            'Traer toalla para colchonetas o mat.',
            'Área exclusiva para jóvenes y adultos.',
          ]} />
        </ServiceRow>
        <ServiceRow image={bathrooms} mobileImageFirst={false} className="protocol-no-inset" alt="Baños de las instalaciones de Brazada">
          <ProtocolList title="Baños" className="protocol-bathrooms" items={[
            'Tomarse el tiempo justo para la ducha.',
            'Por favor no dejar la llave del agua abierta para lavar el vestido de baño mientras se ducha, se enjabona o se lava el cabello.',
            'Los niños de 5 años en adelante deben utilizar el baño de acuerdo a su sexo.',
          ]} />
          <ProtocolList title="Parqueadero" className="protocol-parking" items={[
            'Dejar el carro bien cerrado y no dejar objetos de valor.',
            'No dejar niños solos en el carro.',
            'No ocupar dos celdas en el momento de parquear.',
            'La Academia no se hace responsable de pérdidas.',
          ]} />
        </ServiceRow>
        <ServiceRow image={general} imageSize={600} imageRight mobileImageFirst={false} className="protocol-inset" alt="Espacios de atención de Brazada">
          <ProtocolList title="Generales" className="protocol-general" items={[
            'No traer objetos de valor.',
            'Hacer uso del locker. No se permitirá dejar objetos y bolsos en la recepción.',
            'No ingresar mascotas.',
            'El café es una cortesía. Solicitarlo directamente en la cafetería y agradecemos el uso moderado de él.',
            'Hacer los pagos de las mensualidades oportunamente.',
            'La mensualidad se paga los primeros cinco días del mes.',
            'Recuerde que el pago es mensual. Al tener el cupo reservado, la academia cuenta con su asistencia al momento de asignar los instructores. NO SE COBRA POR CLASE ASISTIDA, SINO POR CUPO RESERVADO.',
            'En ningún caso habrá excepciones.',
          ]}>
            <p className="protocol-acknowledgement">Leído y comprendido</p>
          </ProtocolList>
        </ServiceRow>
      </div>
    </main>
  )
}
