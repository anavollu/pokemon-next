import { useRouter } from "next/router";
import TypeItem from "./typeItem";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { getColorByType } from "../../public/typeColors";

export default function Type({ pokemons, type, ...props }) {
  const router = useRouter();

  const { primary: primaryColor, secondary: secondaryColor } =
    getColorByType(type);

  return (
    <div className="type-wrapper" style={{ backgroundColor: secondaryColor }}>
      <p className="type-title">{capitalizeFirstLetter(type)}</p>
      <div
        className="title-line"
        style={{
          borderColor: primaryColor,
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
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
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
                pathname: `/type/${type}`,
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
