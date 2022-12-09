import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import dataType from "../public/typeColors";
import TypeItem from "./typeItem";
import * as Pokedex from "pokeapi-js-wrapper";

export default function Type({ pokemons, ...props }) {
  const router = useRouter();

  const typeColors = dataType.find((el) => el.type === props.type);

  return (
    <div
      className="type-wrapper"
      style={{ backgroundColor: typeColors.secondary }}
    >
      <p className="type-title">{capitalizeFirstLetter(props.type)}</p>
      <div
        className="title-line"
        style={{
          borderColor: typeColors.primary,
        }}
      ></div>
      <div className="pokemon-list">
        {(props.pokemonsLimit
          ? pokemons.slice(0, props.pokemonsLimit)
          : pokemons
        ).map(({ name, number }, i) => {
          return (
            <TypeItem
              key={name + i}
              primaryColor={typeColors.primary}
              name={name}
              number={number}
            />
          );
        })}

        {props.pokemonsLimit && pokemons.length > props.pokemonsLimit && (
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
        )}
      </div>
    </div>
  );
}
