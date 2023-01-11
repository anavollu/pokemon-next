import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import Link from "next/link";
import getImage from "../utils/getImage";

export default function Evolution(props) {
  return (
    <div className="evolution">
      <Link href={`/pokemon/${props.name}`}>
        <img
          src={getImage(props.number)}
          alt="Foto do Pokémon"
          width={120}
          height={104}
        />
        <p>{capitalizeFirstLetter(props.name)}</p>
      </Link>
    </div>
  );
}
