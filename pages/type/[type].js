import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";

import typeColorsMap from "../../public/typeColors";
import Type from "../../src/components/type";
import getId from "../../src/utils/getId";

export default function TypePage({ pokemons }) {
  const router = useRouter();
  const { type } = router.query;

  return (
    <div className="teste">
      {type && <Type pokemons={pokemons} key={type} type={type} />}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(typeColorsMap).map((el) => ({
    params: { type: el },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const typePokemons = await new Pokedex().getTypeByName(ctx.params.type);

  return {
    props: {
      pokemons: typePokemons.pokemon.map((el) => {
        const id = getId(el.pokemon.url, "https://pokeapi.co/api/v2/pokemon/");
        return { name: el.pokemon.name, number: id };
      }),
    },
  };
}
