import Header from './components/Header'
import Footer from './components/Footer'
import SiteActions from './components/SiteActions'
import Landing from './pages/Landing'
import Normatividad from './pages/Normatividad'
import PorqueBrazada from './pages/PorqueBrazada'
import Contactenos from './pages/Contactenos'
import Natacion from './pages/Natacion'
import Fitness from './pages/Fitness'
import Hidrogimnasia from './pages/Hidrogimnasia'
import Masajes from './pages/Masajes'
import Protocolos from './pages/Protocolos'
import Tarifas from './pages/Tarifas'
import Horarios from './pages/Horarios'
import Placeholder from './pages/Placeholder'
import PageSeo from './components/PageSeo'
import { useContent } from './content'
import { normalizePath } from './seo'
import './App.css'

function App({ pathname = window.location.pathname }) {
  const { copy, navigation, services } = useContent()
  const path = normalizePath(pathname)
  const page = [...navigation, ...services, { label: copy.shared.additionalPages.informationPolicy, href: '/tratamiento-de-datos/' }].find((item) => item.href === path)

  let content = <Placeholder page={page} />
  if (path === '/') content = <Landing />
  if (path === '/normatividad/') content = <Normatividad />
  if (path === '/porque-brazada/') content = <PorqueBrazada />
  if (path === '/contactenos/') content = <Contactenos />
  if (path === '/natacion/') content = <Natacion />
  if (path === '/fitness/') content = <Fitness />
  if (path === '/hidrogimnasia/') content = <Hidrogimnasia />
  if (path === '/masajes/') content = <Masajes />
  if (path === '/protocolos/') content = <Protocolos />
  if (path === '/tarifas/') content = <Tarifas />
  if (path === '/horarios/') content = <Horarios />

  return (
    <>
      <PageSeo path={path} />
      <a className="skip-link" href="#main-content">{copy.shared.app.skipLink}</a>
      <Header path={path} />
      {content}
      <Footer />
      <SiteActions />
    </>
  )
}

export default App
