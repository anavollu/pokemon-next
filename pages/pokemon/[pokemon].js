import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";

import dataType from "../../public/typeColors";

export default function PokemonInfo(props) {
  const router = useRouter();
  return (
    <div>
      <h1>Pokémon {props.name}</h1>
      <h1>Number: #{props.number}</h1>
      <h1>Types: {props.types}</h1>
      <h1>Strong against: {props.types}</h1>
      <h1>Weakness against: {props.types}</h1>
      <h1>Evolution: {props.types}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const { results } = await new Pokedex().getPokemonsList();

  const paths = results.map((el) => ({
    params: { pokemon: el.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { types, id } = await new Pokedex().getPokemonByName(
    ctx.params.pokemon
  );
  //Pegar os tipos
  const arrTypes = types.map((el) => el.type.name);
  //Pegar as informações de dano de cada tipo
  const damageRelations = await Promise.all(
    arrTypes.map(async (type) => {
      const { damage_relations } = await new Pokedex().getTypeByName(type);
      return damage_relations;
    })
  );

  //Pegar os tipos de cada dano
  const damageRelationReduce = damageRelations.map((relation) =>
    Object.keys(relation).reduce(
      (acc, curr) => {
        const relationString = curr.substring(curr.lastIndexOf("_") + 1);
        acc[relationString].add(relation[curr]);
        return { ...acc, [relationString]: acc[relationString] };
      },
      { from: new Set(), to: new Set() }
    )
  );

  // console.log([...typeNames]);
  //Separar em weakness e strong against
  return {
    props: { types: arrTypes, name: ctx.params.pokemon, number: id },
  };
}
