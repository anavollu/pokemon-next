import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";

import dataType from "../../public/typeColors";
import Type from "../../src/components/type";
import getId from "../../src/utils/getId";

export default function TypePage({ pokemons }) {
  const router = useRouter();
  const data = router.query;
  const typeObj = dataType.find((el) => el.type === data.type);

  return (
    <div className="teste">
      {typeObj && (
        <Type pokemons={pokemons} key={typeObj.type} type={typeObj.type} />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = dataType.map((el) => ({
    params: { type: el.type },
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
