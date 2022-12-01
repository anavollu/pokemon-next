import { useRouter } from "next/router";

export default function TypeList(props) {
  const router = useRouter();
  const data = router.query;

  console.log(data);
  console.log(props);

  return (
    <div>
      <h1>{data.type} Type list</h1>
      {/* {props.map((el) => (
        <p>
          #{el.number} {el.name}
        </p>
      ))} */}
    </div>
  );
}

export async function getStaticProps() {
  const typePokemons = await new Pokedex.Pokedex({
    cacheImages: true,
  }).getTypeByName(type);
  return typePokemons.pokemon.map((el) => {
    const url = el.pokemon.url.split("https://pokeapi.co/api/v2/pokemon/");
    const number = url[1].slice(0, -1);
    return { props: { name: el.pokemon.name, number } };
  });
}
