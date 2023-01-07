import Pokedex from "pokedex-promise-v2";
import getId from "../../utils/getId";

export default async function getEvolutions(pokemon) {
  const { evolution_chain, err } = await new Pokedex()
    .getPokemonSpeciesByName(pokemon)
    .catch((err) => ({ err }));
  // Todo: rever casos de pokemon com evolution_chain = null (kleavor, overqwil, sneasler, ursaluna, wyrdeer)
  if (err || evolution_chain == null) return null;

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
