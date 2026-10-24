import { useContent } from '../content'
import banner from '../assets/imgs/protocolos-header.jpg'
import pool from '../assets/imgs/NG-piscina.jpg'
import children from '../assets/imgs/NG-niños.jpg'
import gym from '../assets/imgs/NG-gimnasio.jpg'
import bathrooms from '../assets/imgs/NG-baños.jpg'
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
  const { copy } = useContent()
  const content = copy.pages.protocolos
  return (
    <main id="main-content" className="protocols-page">
      <PageBanner title={content.title} image={banner} alt={content.bannerAlt} />
      <div className="service-rows page-width">
        <ServiceRow image={pool} imageRight alt={content.pool.alt}>
          <ProtocolList title={content.pool.title} className="protocol-pool" items={content.pool.items} />
          <ProtocolList title={content.private.title} className="protocol-private" items={content.private.items} />
        </ServiceRow>
        <ServiceRow image={children} alt={content.children.alt}>
          <ProtocolList title={content.children.title} className="protocol-children" items={content.children.items} />
        </ServiceRow>
        <ServiceRow image={gym} imageRight mobileImageFirst={false} className="protocol-inset" alt={content.gym.alt}>
          <ProtocolList title={content.gym.title} className="protocol-gym" items={content.gym.items} />
          <ProtocolList title={content.room.title} className="protocol-room" items={content.room.items} />
        </ServiceRow>
        <ServiceRow image={bathrooms} mobileImageFirst={false} className="protocol-no-inset" alt={content.bathrooms.alt}>
          <ProtocolList title={content.bathrooms.title} className="protocol-bathrooms" items={content.bathrooms.items} />
          <ProtocolList title={content.parking.title} className="protocol-parking" items={content.parking.items} />
        </ServiceRow>
        <ServiceRow image={general} imageSize={600} imageRight mobileImageFirst={false} className="protocol-inset" alt={content.general.alt}>
          <ProtocolList title={content.general.title} className="protocol-general" items={content.general.items}>
            <p className="protocol-acknowledgement">{content.acknowledgement}</p>
          </ProtocolList>
        </ServiceRow>
      </div>
    </main>
  )
}
