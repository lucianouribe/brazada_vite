import banner from '../assets/imgs/horario_header.jpg'
import swimming from '../assets/imgs/NI-NAT1.jpg'
import PageBanner from '../components/PageBanner'
import ScheduleGroup from '../components/ScheduleGroup'
import horarios from '../data/horarios.json'
import './Horarios.css'

export default function Horarios() {
  return (
    <main id="main-content" className="schedule-page">
      <PageBanner title="Horarios" image={banner} alt="Piscina de Brazada" />
      <div className="schedule-body page-width">
        <div className="schedule-groups">
          {Object.entries(horarios.groups).map(([title, group], index) => (
            <ScheduleGroup key={title} title={title} {...group} id={`schedule-group-${index}`} />
          ))}
        </div>
        <img className="schedule-image" src={swimming} alt="Clase de natación infantil en Brazada" width="1080" height="1350" loading="lazy" />
      </div>
    </main>
  )
}
