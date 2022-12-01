import Image from "next/image";
import { React } from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import pokemonImg from "/public/images/logo-pokeball.png";

export default function TypeItem(props) {
  return (
    <div className="pokemon-item">
      <div
        className="background"
        style={{ backgroundColor: props.primaryColor }}
      ></div>
      <div className="content-wrapper">
        <Image
          src={pokemonImg}
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
