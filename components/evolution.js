import Image from "next/image";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import image from "../public/images/logo-pokeball.png";

export default function Evolution(props) {
  return (
    <div className="evolution">
      <Image src={image} alt="Imagem" width={120} height={104} />
      <p>{capitalizeFirstLetter(props.name)}</p>
    </div>
  );
}
