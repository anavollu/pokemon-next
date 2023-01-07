import Image from "next/image";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import image from "../../public/images/logo-pokeball.png";
import Link from "next/link";

export default function Evolution(props) {
  return (
    <div className="evolution">
      <Link href={`/pokemon/${props.name}`}>
        <Image src={image} alt="Imagem" width={120} height={104} />
        <p>{capitalizeFirstLetter(props.name)}</p>
      </Link>
    </div>
  );
}
