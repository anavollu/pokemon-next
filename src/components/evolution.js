import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import Link from "next/link";

export default function Evolution(props) {
  return (
    <div className="evolution">
      <Link href={`/pokemon/${props.name}`}>
        <img
          src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${props.number}.png`}
          alt="Foto do Pokémon"
          width={120}
          height={104}
        />
        <p>{capitalizeFirstLetter(props.name)}</p>
      </Link>
    </div>
  );
}
