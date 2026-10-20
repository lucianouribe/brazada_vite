import Icon from './Icon'

function ActionLink({ href, children, external = false }) {
  return (
    <a className="action-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span>{children}</span><Icon name="arrow" />
    </a>
  )
}

export default ActionLink
