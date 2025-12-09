import { MainDialogPage } from "@/components/MainDialogPage";
import logoSrc from "../Imgs/logoApp.png";
import { ToggleThemeButton } from "@/components/theme/ToggleThemeButton";
import { Button } from "@/components/UI/Button";
import { CalendarDays, CircleUserRound, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { mainDialogOpen } from "@/app/features/UI/uiSlice";
import { DropDownHeaderContent } from "@/components/DropDownHeader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export function PageHeader() {
  const dispatch = useDispatch();

  const today = new Date();

  const [dayName, month, dayNumber, ...rest] = String(today).split(" ");

  return (
    <header className="flex justify-between items-center bg-muted rounded-lg p-2 shadow-md h-[50px] duration-1000">
      <div className="w-[90px] cursor-pointer mt-1 -ml-1">
        <img src={logoSrc} alt="logo" />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="w-6 h-6 hidden md:block" />
        <div>
          <span className="text-2xl font-bold text-[#ffb22b]">{dayName}/</span>
          <span className="font-bold text-[#00c896]">{dayNumber}-</span>
          <span className="font-bold text-primary">{month}</span>
        </div>
      </div>
      <div className="flex">
        <Button
          onClick={() => {
            dispatch(mainDialogOpen(true));
            console.log("clicked");
          }}
          className="rounded-lg text-forground bg-transparent cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-[#ffffff29] duration-200"
        >
          <Plus />
        </Button>
        <ToggleThemeButton className="mx-2 hover:bg-[#e8e8e8] dark:hover:bg-[#ffffff29]" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="outline-none rounded-lg text-foreground bg-transparent cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-[#ffffff29] duration-200">
              <CircleUserRound />
            </Button>
          </DropdownMenuTrigger>
          <DropDownHeaderContent />
        </DropdownMenu>
        <MainDialogPage />
      </div>
    </header>
  );
}

// #ffffff29
// #155dfc91
