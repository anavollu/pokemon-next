import axios from "axios";
import Pokedex from "pokedex-promise-v2";
import getId from "../../utils/getId";

export default async function getEvolutions(pokemonName) {
  const { evolution_chain, err } = await new Pokedex()
    .getPokemonSpeciesByName(pokemonName)
    .catch((err) => ({ err }));
  if (err) return null;
  if (evolution_chain == null) {
    const pokemonsWithEvoNull = [
      "kleavor",
      "overqwil",
      "sneasler",
      "ursaluna",
      "wyrdeer",
    ];
    if (pokemonsWithEvoNull.find((name) => name == pokemonName)) {
      return await getPokemonWithEvoNull(pokemonName);
    } else {
      return null;
    }
  }

  const evolutionId = getId(
    evolution_chain.url,
    "https://pokeapi.co/api/v2/evolution-chain/"
  );

  const { chain } = await new Pokedex().getEvolutionChainById(evolutionId);

  function evolutionChain(chain) {
    if (!chain.species.name) throw new Error("Pokémon has no evolution chain");
    let evolutionArr = [];
    evolutionArr.push(chain.species.name);
    let aux = chain.evolves_to[0];
    while (aux) {
      evolutionArr.push(aux.species.name);
      aux = aux.evolves_to[0];
    }
    return evolutionArr;
  }

  return evolutionChain(chain);
}

async function getPokemonWithEvoNull(pokemonName) {
  try {
    const response = await axios.get(
      `https://pokeapi.glitch.me/v1/pokemon/${pokemonName}`
    );
    return response;
  } catch (error) {
    return error;
  }
}
