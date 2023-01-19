import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getPokemonUrl,
  getAllPokemonNames,
} from "../services/pokemon/getPokemonNames";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import searchIcon from "/public/images/search-icon.svg";

const pokemonNames = await getAllPokemonNames();

export default function SearchBar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const searchInputLower = searchInput.toLowerCase();
  const pokemonFilter = pokemonNames.filter((name) =>
    name.toLowerCase().includes(searchInputLower)
  );

  return (
    <div className="search-wrapper">
      <p className="input-label">Search for a Pokémon by name</p>
      <div className="search-bar">
        <input
          className="input-search"
          type="search"
          value={searchInput}
          onChange={(evt) => setSearchInput(evt.target.value)}
        />
        <Image
          className="search-icon"
          src={searchIcon}
          alt="Botão de pesquisar"
          width="auto"
          height="auto"
        />
        {searchInput.length === 0 ? (
          ""
        ) : (
          <ul className="input-search-list">
            {pokemonFilter.map((name) => (
              <li
                key={name}
                className="input-search-value"
                onClick={() => {
                  const url = getPokemonUrl(name);
                  router.push(url);
                  setSearchInput("");
                }}
              >
                {capitalizeFirstLetter(name)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
