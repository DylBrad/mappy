import styles from "./page.module.css";

import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <h1>index</h1>
    </main>
  );
}
