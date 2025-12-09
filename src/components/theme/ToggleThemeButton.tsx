import { useTheme } from "@/hooks/Theme/useTheme";
import { Button } from "../UI/Button";
import { Moon, Sun } from "lucide-react";

type TToggleThemeButtonProps = {
  className?: string;
};

export const ToggleThemeButton = ({ className }: TToggleThemeButtonProps) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className={`${className} rounded-lg cursor-pointer bg-transparent`}
    >
      {theme === "dark" ? (
        <Sun className="text-background dark:text-foreground" />
      ) : (
        <Moon className="text-foreground dark:text-background" />
      )}
    </Button>
  );
};
