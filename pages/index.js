import Head from "next/head";
import typeColorMap from "../public/typeColors";
import getId from "../src/utils/getId";
import Pokedex from "pokedex-promise-v2";
import React from "react";
import Type from "../src/components/type";

export default function Home({ types }) {
  return (
    <div>
      <Head>
        <title>Pokémon Info App</title>
        <link rel="icon" href="/images/logo-pokeball.png" />
      </Head>
      <div className="App">
        {types.map(({ type, pokemons }) => (
          <Type key={type} type={type} pokemons={pokemons} pokemonsLimit={5} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const types = await Promise.all(
    Object.entries(typeColorMap).map(async ([type]) => {
      const pokemonType = await new Pokedex().getTypeByName(type);
      const pokemons = pokemonType.pokemon.map((el) => {
        const id = getId(el.pokemon.url, "https://pokeapi.co/api/v2/pokemon/");
        return {
          name: el.pokemon.name,
          number: id,
        };
      });
      return {
        type,
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
