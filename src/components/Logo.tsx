// import logoSrc from "../assets/logoLink.png";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return <img src={"/logoLink.png"} alt="logo" className={className} />;
};
