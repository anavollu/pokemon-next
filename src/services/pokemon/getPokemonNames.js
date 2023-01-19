import Pokedex from "pokedex-promise-v2";

export function getPokemonUrl(name) {
  const url =
    (process.env.NEXT_PUBLIC_HOST || "http://localhost:3000") +
    "/pokemon/" +
    name;
  return url;
}

export async function getAllPokemonNames() {
  const data = await new Pokedex().getPokemonsList();
  const pokemonNames = data.results.map((el) => el.name);
  return pokemonNames;
}
