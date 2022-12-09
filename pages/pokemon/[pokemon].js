import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";

import dataType from "../../public/typeColors";

export default function PokemonInfo() {
  const router = useRouter();
  const data = router.query;

  return (
    <div>
      <h1>Pokémon</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const pokemonsList = await new Pokedex().getPokemonsList();
  const names = pokemonsList.map();

  const paths = pokemonsList.map((el) => ({
    params: { pokemon: el.result.map() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const typePokemons = await new Pokedex().getPokemonByName(ctx.params.name);

  return {
    props: {
      pokemons: typePokemons.pokemon.map((el) => {
        const url = el.pokemon.url.split("https://pokeapi.co/api/v2/pokemon/");
        const number = url[1].slice(0, -1);
        return { name: el.pokemon.name, number };
      }),
    },
  };
}
