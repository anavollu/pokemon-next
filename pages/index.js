import Head from "next/head";
import styles from "../styles/Home.module.css";
import dataType from "../public/typeColors";
import Type from "../components/type";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokémon Info App</title>
        <link rel="icon" href="/images/logo-pokeball.png" />
      </Head>
      <div className="App">
        {dataType.map((data) => (
          <Type
            key={data.type}
            type={data.type}
            primaryColor={data.primary}
            secondaryColor={data.secondary}
            firstPage
          />
        ))}
      </div>
    </div>
  );
}
