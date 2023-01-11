import { React } from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import getImage from "../utils/getImage";

export default function TypeItem(props) {
  return (
    <div className="pokemon-item">
      <div
        className="background"
        style={{ backgroundColor: props.primaryColor }}
      ></div>
      <div className="content-wrapper">
        <img
          src={getImage(props.number, props.name)}
          alt="Foto do Pokémon"
          width={120}
          height={120}
        />
        <p className="pokemon-name">{capitalizeFirstLetter(props.name)}</p>
        <p className="pokemon-number">{"#" + props.number}</p>
      </div>
    </div>
  );
}
