import { React } from "react";
import Image from "next/image";
import logo from "/public/images/logo.svg";
import pokemonsImage from "/public/images/pokemons-banner.svg";
import SearchBar from "./searchBar";

export default function Banner() {
  return (
    <div className="banner">
      <div className="logo-search-wrapper">
        <a href="/">
          <Image src={logo} alt="Logo" width={320} height={167} />
        </a>
        <SearchBar />
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
