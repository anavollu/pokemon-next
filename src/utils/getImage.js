function getImage(pokemonNumber, pokemonName) {
  const numberStr = String(pokemonNumber).padStart(3, "0");

  // ver casos de female e male que usam a mesma imagem

  if (pokemonNumber >= 10000) {
    console.log(pokemonName);
  }

  const imageUrl =
    pokemonNumber <= 10000
      ? `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${numberStr}.png`
      : `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/001.png`;
  return imageUrl;
}

export default getImage;

export async function getStaticProps() {}
