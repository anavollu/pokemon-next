import { useRouter } from "next/router";
import Pokedex from "pokedex-promise-v2";
import Type from "../../components/type";

import dataType from "../../public/typeColors";

export default function TypeList(props) {
  const router = useRouter();
  const data = router.query;

  console.log(data);
  console.log(dataType);

  return (
    <div>
      {dataType.map((el) =>
        el.type === data.type ? (
          <Type
            key={el.type}
            type={el.type}
            primaryColor={el.primary}
            secondaryColor={el.secondary}
          />
        ) : (
          ""
        )
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
        const url = el.pokemon.url.split("https://pokeapi.co/api/v2/pokemon/");
        const number = url[1].slice(0, -1);
        return { name: el.pokemon.name, number };
      }),
    },
  };
}
