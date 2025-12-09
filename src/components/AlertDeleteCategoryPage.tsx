import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./UI/alert-dialog";
import React from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { deleteCategoryAlertOpen } from "@/app/features/UI/uiSlice";
import { useDeleteCategory } from "@/hooks/Categories/useDeleteCategory";

export const AlertDeleteDialogPage = React.memo(() => {
  const dispatch = useDispatch();

  const open = useSelector(
    (state: RootState) => state.openCloseHandler.isAlertDeleteCategoryOpen
  );

  const categoryIdToDelete = useSelector(
    (state: RootState) => state.IDsSlice.idCategoryToDelete
  );

  const deleteCategory = useDeleteCategory();

  return (
    <AlertDialog open={open} onOpenChange={deleteCategoryAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this category will also
            remove all todos associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              dispatch(deleteCategoryAlertOpen(false));
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gray-200 text-red-500 border-1 border-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => {
              dispatch(deleteCategoryAlertOpen(false));

              deleteCategory.mutate(String(categoryIdToDelete));
              toast.success("Category deleted successfully!");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
