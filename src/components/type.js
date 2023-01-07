import { React } from "react";
import { useRouter } from "next/router";
import dataType from "../../public/typeColors";
import TypeItem from "./typeItem";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

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
            <button
              className="pokemon-button"
              key={`pokemon-button-${name}`}
              onClick={() => {
                router.push({
                  pathname: `/pokemon/${name}`,
                });
              }}
            >
              <TypeItem
                key={name + i}
                primaryColor={typeColors.primary}
                name={name}
                number={number}
              />
            </button>
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
