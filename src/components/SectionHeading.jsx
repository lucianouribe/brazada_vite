
function SectionHeading({ title, backdrop, id }) {
  return (
    <div className="section-heading">
      {backdrop && <span className="heading-backdrop" aria-hidden="true">{backdrop}</span>}
      <h2 id={id}>{title}</h2>
    </div>
  )
}

export default SectionHeading
