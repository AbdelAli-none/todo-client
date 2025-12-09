import logoSrc from "/logoLink.png";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return <img src={logoSrc} alt="logo" className={className} />;
};
