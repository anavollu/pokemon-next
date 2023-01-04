import { React } from "react";
import Image from "next/image";

import logo from "/public/images/logo.svg";
import searchIcon from "/public/images/search-icon.svg";
import pokemonsImage from "/public/images/pokemons-banner.svg";

export default function Banner() {
  return (
    <div className="banner">
      <div className="logo-search-wrapper">
        <a href="/">
          <Image src={logo} alt="Logo" width={320} height={167} />
        </a>

        <div className="search-wrapper">
          <p className="input-label">Search for a Pokémon by name or number</p>
          <div className="search-bar">
            <input className="input-search" type="search"></input>
            <Image
              className="search-icon"
              src={searchIcon}
              alt="Botão de pesquisar"
              width="auto"
              height="auto"
            />
          </div>
        </div>
      </div>

      <Image
        className="pokemons-img"
        src={pokemonsImage}
        alt="Imagem de Pokémons"
        width={531}
        height={267}
        priority={true}
      />
    </div>
  );
}
