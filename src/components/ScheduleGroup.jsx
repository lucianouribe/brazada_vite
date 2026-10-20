import SectionHeading from './SectionHeading'

export default function ScheduleGroup({ title, backdrop, items, id }) {
  return (
    <section className="schedule-group" aria-labelledby={id}>
      <SectionHeading title={title} backdrop={backdrop} id={id} />
      <ul>
        {Object.entries(items).map(([key, item]) => <li key={key}>{item.description}</li>)}
      </ul>
    </section>
  )
}
