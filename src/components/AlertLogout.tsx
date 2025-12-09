import { useNavigate } from "react-router";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./UI/alert-dialog";

export const AlertLogout = () => {
  const navigate = useNavigate();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Log Out?</AlertDialogTitle>
        <AlertDialogDescription>
          You’ll be signed out of your account and returned to the login page.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            localStorage.removeItem("token");
            return navigate("/auth/login");
          }}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white"
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
