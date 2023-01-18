import Pokedex from "pokedex-promise-v2";
import getEvolutions from "../../src/services/pokemon/getEvolutions";
import Evolution from "../../src/components/evolution";
import capitalizeFirstLetter from "../../src/utils/capitalizeFirstLetter";
import getImage from "../../src/utils/getImage";
import { getColorByType } from "../../public/typeColors";

export default function PokemonInfo(props) {
  const pokemonNumber = String(props.number).padStart(3, "0");

  return (
    <div
      className="box-wrapper"
      style={{
        backgroundColor: props.color.secondary,
      }}
    >
      <div
        className="box-top"
        style={{
          backgroundColor: props.color.primary,
        }}
      ></div>
      <div className="content">
        <div className="pokemon-image">
          <img src={getImage(props.number)} alt="Foto do Pokémon" width={428} />
        </div>
        <div className="pokemon-info-wrapper">
          <div className="pokemon-info">
            <h1 style={{ textAlign: "center", color: "#4F61C8" }}>
              {capitalizeFirstLetter(props.name)}
            </h1>
            <p className="p-info">
              <strong>Number:</strong> #{pokemonNumber}
            </p>
            <p className="p-info">
              <strong>Types: </strong>
              {props.types.map(capitalizeFirstLetter).join(", ")}
            </p>
            <p className="p-info">
              <strong>Strong against:</strong>{" "}
            </p>
            <p className="p-info">
              <strong>Weakness against:</strong>{" "}
            </p>
          </div>
          {props.evolution && (
            <div className="pokemon-evolution">
              <h1 style={{ textAlign: "center", color: "#4F61C8" }}>
                Evolution
              </h1>
              <div className="evolution-list">
                {props.evolution.map((pokemonName, i) => (
                  <div
                    className="evolution-wrapper"
                    key={`evolution_${pokemonName}`}
                  >
                    <Evolution name={pokemonName} number={pokemonNumber} />
                    {props.evolution.length - 1 != i && (
                      <p className="evolution-separator">&gt;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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
  // Name and Id
  const { types, id } = await new Pokedex().getPokemonByName(
    ctx.params.pokemon
  );

  // Types
  const arrTypes = types.map((el) => el.type.name);

  // Colors
  const color = getColorByType(arrTypes[0]);

  const damageRelations = await Promise.all(
    arrTypes.map(async (type) => {
      const { damage_relations } = await new Pokedex().getTypeByName(type);
      return damage_relations;
    })
  );

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
  // console.log(damageRelationReduce);

  // Weakness

  // Strong

  const evolution = await getEvolutions(ctx.params.pokemon);

  return {
    props: {
      types: arrTypes,
      name: ctx.params.pokemon,
      number: id,
      evolution,
      color,
    },
  };
}
