import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import TypeItem from "./typeItem";
import * as Pokedex from "pokeapi-js-wrapper";

export default function Type(props) {
  const [pokemons, setPokemons] = useState([]);
  const router = useRouter();

  async function getPokemons(type) {
    const typePokemons = await new Pokedex.Pokedex({
      cacheImages: true,
    }).getTypeByName(type);
    return typePokemons.pokemon.map((el) => {
      const url = el.pokemon.url.split("https://pokeapi.co/api/v2/pokemon/");
      const number = url[1].slice(0, -1);
      return { name: el.pokemon.name, number };
    });
  }

  useEffect(() => {
    getPokemons(props.type).then(setPokemons);
  }, [props.type]);

  return (
    <div
      className="type-wrapper"
      style={{ backgroundColor: props.secondaryColor }}
    >
      <p className="type-title">{capitalizeFirstLetter(props.type)}</p>
      <div
        className="title-line"
        style={{
          borderColor: props.primaryColor,
        }}
      ></div>
      <div className="pokemon-list">
        {pokemons.slice(0, 4).map(({ name, number }, i) => {
          return (
            <TypeItem
              key={name + i}
              primaryColor={props.primaryColor}
              name={name}
              number={number}
            />
          );
        })}
        {pokemons.length > 4 ? (
          <button
            className="button"
            onClick={() => {
              router.push({
                pathname: `/type/${props.type}`,
              });
            }}
          >
            +
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
