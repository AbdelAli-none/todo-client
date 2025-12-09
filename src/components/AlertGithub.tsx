import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./UI/alert-dialog";

export const AlertGithubContent = () => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Navigation to GitHub!</AlertDialogTitle>
        <AlertDialogDescription>
          You will be redirected to the project’s GitHub repository. Continue if
          you want to view the source code. <br />
          <span className="text-red-500 block font-semibold text-sm !mt-4">
            If you found this project useful, I’d really appreciate a star — it
            helps a ton! 🌟
          </span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction className="cursor-pointer">
          <a
            href="https://github.com/AbdelAli-none/combined-version"
            target="_blank"
          >
            Confirm
          </a>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
