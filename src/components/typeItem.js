import { React } from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

export default function TypeItem(props) {
  const pokemonNumber = String(props.number).padStart(3, "0");
  return (
    <div className="pokemon-item">
      <div
        className="background"
        style={{ backgroundColor: props.primaryColor }}
      ></div>
      <div className="content-wrapper">
        <img
          src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemonNumber}.png`}
          alt="Foto do Pokémon"
          width={120}
          height={120}
        />
        <p className="pokemon-name">{capitalizeFirstLetter(props.name)}</p>
        <p className="pokemon-number">{"#" + pokemonNumber}</p>
      </div>
    </div>
  );
}
