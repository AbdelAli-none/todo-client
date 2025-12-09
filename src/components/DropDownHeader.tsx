import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/UI/dropdown-menu";
import { AlertGithubContent } from "./AlertGithub";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogTrigger } from "./UI/alert-dialog";
import { AlertLogout } from "./AlertLogout";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

export const DropDownHeaderContent = () => {
  return (
    <DropdownMenuContent
      className="w-56"
      sideOffset={10}
      alignOffset={-5}
      align="end"
    >
      <DropdownMenuLabel>Other</DropdownMenuLabel>
      <DropdownMenuGroup>
        <Link to={"dashboard"}>
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full outline-none">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              GitHub <Sparkles className="text-yellow-300" />
              <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertGithubContent />
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-500 hover:text-red-500! duration-200 cursor-pointer"
            >
              Log out
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertLogout />
        </AlertDialog>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};
