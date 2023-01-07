import { React } from "react";
import Image from "next/image";

import linkedinIcon from "/public/images/linkedin-icon.png";
import githubIcon from "/public/images/github-icon.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/ana-carolina-voll%C3%BA-915412111/"
          target="_blank"
        >
          <Image
            className="linkedin-icon"
            src={linkedinIcon}
            alt="Ícone do LinkedIn"
            width={32}
            height={32}
          />
        </a>
        <a href="https://github.com/anavollu/" target="_blank">
          <Image
            className="github-icon"
            src={githubIcon}
            alt="Ícone do Github"
            width={32}
            height={32}
          />
        </a>
      </div>
      <div className="developed-by">Desenvolvido por Ana Vollu</div>
    </div>
  );
}
