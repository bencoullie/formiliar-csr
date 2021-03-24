import styles from './styles/Home.module.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PersonalDetails from './pages/personalDetails'
import Photos from './pages/photos'

export default function Home() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/personal-details">
          <PersonalDetails />
        </Route>
        <Route path="/photos">
          <Photos />
        </Route>
        <Route path="/">
          <Init />
        </Route>
      </Switch>
    </Router>
  )
}

const Init = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>NextJS Forms Prototype</h1>
      <p className={styles.description}>Let's do a fake form together!</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Link to="/personal-details">
            ✍️ Give us your personal details ✍️
          </Link>
        </div>
      </div>
    </main>
  </div>
)
