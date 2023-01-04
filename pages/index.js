import Head from "next/head";
import dataType from "../public/typeColors";
import Type from "../components/type";
import Pokedex from "pokedex-promise-v2";

export default function Home({ types }) {
  return (
    <div>
      <Head>
        <title>Pokémon Info App</title>
        <link rel="icon" href="/images/logo-pokeball.png" />
      </Head>
      <div className="App">
        {types.map(({ name, pokemons }) => (
          <Type pokemons={pokemons} key={name} type={name} pokemonsLimit={5} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const types = await Promise.all(
    dataType.map(async function ({ type }) {
      const pokemonType = await new Pokedex().getTypeByName(type);
      const pokemons = pokemonType.pokemon.map((el) => {
        const url = el.pokemon.url.split("https://pokeapi.co/api/v2/pokemon/");
        const number = url[1].slice(0, -1);
        return { name: el.pokemon.name, number };
      });
      return {
        name: type,
        pokemons,
      };
    })
  );
  return {
    props: {
      types,
    },
  };
}
