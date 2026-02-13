import Image from "next/image";

interface LogoProps {
  size?: number;
  variant?: "default" | "white";
}

const LogoAventurei = ({ size = 44, variant = "default" }: LogoProps) => {
  // Use absolute paths for the public folder
  const src = variant === "white" ? "/LogoBranco.png" : "/LogoFundoT.svg";

  // The SVG has a viewBox of 0 0 274 245, aspect ratio ~1.118
  const width = Math.round(size * (274 / 245));
  const height = size;

  return (
    <Image
      alt="Aventurei"
      src={src}
      width={width}
      height={height}
      priority
      className="h-auto w-auto object-contain"
    />
  );
};

export default LogoAventurei;
