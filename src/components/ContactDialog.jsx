import { useRef } from 'react'
import ContactForm from './ContactForm'
import Icon from './Icon'
import './ContactDialog.css'

export default function ContactDialog() {
  const dialog = useRef(null)

  return (
    <>
      <button className="action-link" type="button" onClick={() => dialog.current.showModal()}>
        <span>Contáctenos</span><Icon name="arrow" />
      </button>
      <dialog className="contact-dialog" ref={dialog} aria-labelledby="contact-dialog-title" onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          dialog.current.close()
        }
      }}>
        <div className="contact-dialog-heading">
          <h2 id="contact-dialog-title">Contáctenos</h2>
          <button className="icon-button" type="button" aria-label="Cerrar formulario" onClick={() => dialog.current.close()}><Icon name="close" /></button>
        </div>
        <ContactForm variant="page" />
      </dialog>
    </>
  )
}
