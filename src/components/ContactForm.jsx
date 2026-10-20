import { useId, useState } from 'react'
import { whatsappUrl } from '../content'
import Icon from './Icon'
import './ContactForm.css'

function ContactForm({ variant = 'footer' }) {
  const id = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const isPage = variant === 'page'
  const text = `Hola, soy ${name}.\n${isPage ? `Teléfono: ${phone}\n` : ''}Correo electrónico: ${email}\n\n${message}`

  return (
    <form className={`contact-form${isPage ? ' contact-form-page' : ''}`} action={whatsappUrl} method="get" target="_blank" rel="noopener noreferrer" onSubmit={() => setSubmitted(true)}>
      <label className="visually-hidden" htmlFor={`${id}-name`}>Nombre</label>
      <input id={`${id}-name`} autoComplete="name" placeholder={isPage ? 'Nombre...' : 'Nombre'} value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} />
      {isPage && <>
        <label className="visually-hidden" htmlFor={`${id}-phone`}>Teléfono</label>
        <input id={`${id}-phone`} type="tel" autoComplete="tel" placeholder="Teléfono..." value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={40} />
      </>}
      <label className="visually-hidden" htmlFor={`${id}-email`}>Correo electrónico</label>
      <input id={`${id}-email`} type="email" autoComplete="email" placeholder={isPage ? 'Correo electrónico...' : 'Correo electrónico'} value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
      <label className="visually-hidden" htmlFor={`${id}-message`}>Mensaje</label>
      <textarea id={`${id}-message`} placeholder={isPage ? 'Mensaje...' : 'Mensaje'} value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={isPage ? 10 : 4} />
      <input type="hidden" name="text" value={text} />
      <button className="action-link" type="submit"><span>{isPage ? 'Enviar formulario' : 'Enviar mensaje'}</span><Icon name="arrow" /></button>
      <p className="form-note" role="status">{submitted ? 'Continúa en la nueva pestaña de WhatsApp y confirma el envío de tu mensaje.' : 'Se abrirá WhatsApp para que confirmes el envío de tu mensaje.'}</p>
    </form>
  )
}

export default ContactForm
