import { useEffect, useRef, useState } from 'react'
import logo from '../assets/imgs/logo_brazada_01-1.png'
import mobileLogo from '../assets/imgs/logo-1.png'
import { useContent } from '../content'
import Icon from './Icon'

function Header({ path }) {
  const { copy, navigation, services, language, setLanguage } = useContent()
  const content = copy.shared.header
  const nextLanguage = language === 'es' ? 'en' : 'es'
  const languageLabel = language === 'es' ? content.english : content.spanish
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchDialog = useRef(null)
  const searchLinks = [...navigation.filter((item) => item.href), ...services]
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const results = searchLinks.filter((item) => normalize(item.label).includes(normalize(query)))

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setServicesOpen(false)
        if (searchDialog.current.open) searchDialog.current.close()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="header-main">
        <button className="menu-toggle" type="button" aria-label={menuOpen ? content.closeMenu : content.openMenu} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <a className="brand" href="/" aria-label={content.homeLink}>
          <picture>
            <source media="(max-width: 1024px)" srcSet={mobileLogo} />
            <img src={logo} alt={content.logoAlt} width="105" height="106" />
          </picture>
        </a>
        <nav id="main-navigation" className={`main-navigation${menuOpen ? ' is-open' : ''}`} aria-label={content.mainNavigation}>
          <ul>
            {navigation.map((item) => (
              <li key={item.label} className={item.href ? '' : 'services-dropdown'}>
                {item.href ? (
                  <a href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}</a>
                ) : (
                  <>
                    <button type="button" aria-expanded={servicesOpen} aria-controls="services-dropdown" onClick={() => setServicesOpen(!servicesOpen)}>
                      {item.label} <Icon name="chevron" />
                    </button>
                    <ul id="services-dropdown" className={`dropdown${servicesOpen ? ' is-open' : ''}`}>
                      {services.map((service) => <li key={service.href}><a href={service.href}>{service.label}</a></li>)}
                    </ul>
                  </>
                )}
              </li>
            ))}
            <li className="mobile-language">
              <button className="language-toggle" type="button" lang={nextLanguage} onClick={() => setLanguage(nextLanguage)}>{languageLabel}</button>
            </li>
          </ul>
        </nav>
        <button className="search-toggle" type="button" aria-label={content.search} onClick={() => searchDialog.current.showModal()}>
          <Icon name="search" />
        </button>
      </div>
      <nav className="services-bar" aria-label={content.services}>
        <ul>
          {services.map((service) => <li key={service.href}><a href={service.href} aria-current={path === service.href ? 'page' : undefined}>{service.label}</a></li>)}
          <li><button className="language-toggle" type="button" lang={nextLanguage} onClick={() => setLanguage(nextLanguage)}>{languageLabel}</button></li>
        </ul>
      </nav>
      <dialog className="search-dialog" ref={searchDialog} aria-labelledby="search-title">
        <div className="search-heading">
          <h2 id="search-title">{content.search}</h2>
          <button type="button" className="icon-button" aria-label={content.closeSearch} onClick={() => searchDialog.current.close()}><Icon name="close" /></button>
        </div>
        <input type="search" aria-label={content.searchInput} placeholder={content.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} />
        <ul>{results.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul>
        {results.length === 0 && <p role="status">{content.noResults}</p>}
      </dialog>
    </header>
  )
}

export default Header
