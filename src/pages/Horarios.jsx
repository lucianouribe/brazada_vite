import { useContent } from '../content'
import banner from '../assets/imgs/horario_header.jpg'
import swimming from '../assets/imgs/NI-NAT1.jpg'
import PageBanner from '../components/PageBanner'
import ScheduleGroup from '../components/ScheduleGroup'
import './Horarios.css'

export default function Horarios() {
  const { copy, language, data: { horarios } } = useContent()
  const content = copy.pages.horarios
  return (
    <main id="main-content" className="schedule-page">
      <PageBanner title={content.title} image={banner} alt={content.bannerAlt} />
      <div className="schedule-body page-width">
        <div className="schedule-groups">
          {Object.entries(horarios.groups).map(([title, group], index) => {
            const translation = language === 'en' ? content.groups?.[title] : null
            const items = Object.fromEntries(Object.entries(group.items).map(([id, item]) => [id, translation?.items?.[id] || item]))
            return <ScheduleGroup key={title} title={translation ? translation.title : title} backdrop={translation ? translation.backdrop : group.backdrop} items={items} id={`schedule-group-${index}`} />
          })}
        </div>
        <img className="schedule-image" src={swimming} alt={content.imageAlt} width="1080" height="1350" loading="lazy" />
      </div>
    </main>
  )
}
