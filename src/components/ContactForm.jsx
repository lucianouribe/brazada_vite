import { useId, useState } from 'react'
import { useContent, formatText, whatsappUrl } from '../content'
import Icon from './Icon'
import './ContactForm.css'

function ContactForm({ variant = 'footer' }) {
  const { copy } = useContent()
  const content = copy.shared.contactForm
  const id = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const isPage = variant === 'page'
  const text = formatText(content.whatsappMessage, {
    name,
    phone: isPage ? formatText(content.whatsappPhone, { phone }) : '',
    email,
    message,
  })

  return (
    <form className={`contact-form${isPage ? ' contact-form-page' : ''}`} action={whatsappUrl} method="get" target="_blank" rel="noopener noreferrer" onSubmit={() => setSubmitted(true)}>
      <label className="visually-hidden" htmlFor={`${id}-name`}>{content.name}</label>
      <input id={`${id}-name`} autoComplete="name" placeholder={isPage ? content.namePlaceholder : content.name} value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} />
      {isPage && <>
        <label className="visually-hidden" htmlFor={`${id}-phone`}>{content.phone}</label>
        <input id={`${id}-phone`} type="tel" autoComplete="tel" placeholder={content.phonePlaceholder} value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={40} />
      </>}
      <label className="visually-hidden" htmlFor={`${id}-email`}>{content.email}</label>
      <input id={`${id}-email`} type="email" autoComplete="email" placeholder={isPage ? content.emailPlaceholder : content.email} value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
      <label className="visually-hidden" htmlFor={`${id}-message`}>{content.message}</label>
      <textarea id={`${id}-message`} placeholder={isPage ? content.messagePlaceholder : content.message} value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={isPage ? 10 : 4} />
      <input type="hidden" name="text" value={text} />
      <button className="action-link" type="submit"><span>{isPage ? content.submitPage : content.submitFooter}</span><Icon name="arrow" /></button>
      <p className="form-note" role="status">{submitted ? content.submittedNote : content.note}</p>
    </form>
  )
}

export default ContactForm
