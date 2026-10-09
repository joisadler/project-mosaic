import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>Project Mosaic</h1>
        <p>Turn scrolling into learning.</p>
      </div>
    </main>
  );
}
