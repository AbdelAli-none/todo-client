import { ToggleThemeButton } from "../../theme/ToggleThemeButton";
import { Outlet } from "react-router";

export const AuthPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      <div className="w-[450px]">
        <Outlet />
        <ToggleThemeButton className="absolute right-5 bottom-5" />
      </div>
    </div>
  );
};
