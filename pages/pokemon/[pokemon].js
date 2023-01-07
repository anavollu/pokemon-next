import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";
import image from "../../public/images/logo-pokeball.png";
import Image from "next/image";
import getEvolutions from "../../src/services/pokemon/getEvolutions";
import Evolution from "../../src/components/evolution";
import capitalizeFirstLetter from "../../src/utils/capitalizeFirstLetter";

export default function PokemonInfo(props) {
  const router = useRouter();
  return (
    <div
      className="box-wrapper"
      style={{ backgroundColor: "rgba(0, 200, 111, 0.15)" }}
    >
      <div className="box-top" style={{ backgroundColor: "#57C278" }}></div>
      <div className="content">
        <div className="pokemon-image">
          <Image src={image} alt="Imagem" width={428} />
        </div>
        <div className="pokemon-info-wrapper">
          <div className="pokemon-info">
            <h1 style={{ textAlign: "center", color: "#4F61C8" }}>
              {capitalizeFirstLetter(props.name)}
            </h1>
            <p className="p-info">
              <strong>Number:</strong> #{props.number}
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
              <div className="evolution-wrapper">
                {props.evolution.map((pokemonName, i) => (
                  <>
                    <Evolution
                      key={`evolution_${pokemonName}`}
                      name={pokemonName}
                    />
                    {props.evolution.length < i - 1 && (
                      <p key={`evolution_${pokemonName}_${i}`}>a</p>
                    )}
                  </>
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

  // Weakness

  // Strong

  const evolution = await getEvolutions(ctx.params.pokemon);

  return {
    props: { types: arrTypes, name: ctx.params.pokemon, number: id, evolution },
  };
}
