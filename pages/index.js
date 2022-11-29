import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokémon Info App</title>
        <link rel="icon" href="/images/logo-pokeball.png" />
      </Head>
    </div>
  );
}
