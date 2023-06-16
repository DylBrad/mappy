import styles from '../page.module.css'

import Nav from '../components/nav'

export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <h1>Newsfeed</h1>
    </main>
  )
}