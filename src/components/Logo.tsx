import Image from "next/image";

interface LogoProps {
  size?: number;
}

const LOGO_SRC = "./LogoFundoT.svg";

const LogoAventurei = ({ size = 60 }: LogoProps) => {
  const logoSize = { width: size, height: size };

  return (
    <Image
      alt="Logo Aventurei"
      src={LOGO_SRC}
      priority
      {...logoSize}
    />
  );
};

export default LogoAventurei;
