import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./UI/Dialog";
import { Label } from "./UI/label";
import { Input } from "./UI/input";
import { Button } from "./UI/Button";
import { categoriesColors, categoriesIcons } from "@/data/categoriesData";
import React, { useEffect, useState } from "react";
import type { CategoryStrapi } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { editCategory } from "@/app/features/UI/uiSlice";
import { useDispatch } from "react-redux";
import { useCategories } from "@/hooks/Categories/useCategories";
import { toast } from "sonner";
import { useEditCategory } from "@/hooks/Categories/useEditCategory";

export const EditCategoryDialog = React.memo(() => {
  const isEditCategoryOpened = useSelector(
    (state: RootState) => state.openCloseHandler.isEditCategoryOpen
  );

  const idCategoryToEdit = useSelector(
    (state: RootState) => state.IDsSlice.idCategoryToEdit
  );

  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const { data: categories } = useCategories();

  const updateCategory = useEditCategory(String(idCategoryToEdit));

  const categoryToEdit: CategoryStrapi =
    categories &&
    categories.find(
      (category: CategoryStrapi) => category.documentId === idCategoryToEdit
    );

  useEffect(() => {
    // we used useEffect to avoiding infinite loop that caused if you used if block to check if categoryToEdit is valid
    if (categoryToEdit) {
      const {
        iconCategory,
        nameCategory: nameCategory,
        colorCategory: colorCategory,
      } = categoryToEdit;

      // they are the default of inputs
      setCategoryTitle(nameCategory);
      setCategoryIcon(iconCategory);
      setCategoryColor(colorCategory);
    }
  }, [idCategoryToEdit]);

  if (!categoryToEdit) return null;

  const {
    iconCategory,
    nameCategory: nameCategory,
    colorCategory: colorCategory,
  } = categoryToEdit;

  // primitive data => almost there's no problem
  // non-primitive data => useEffect check if categoryToEdit (object) is the same in memeory, forever it's different => changed => re-render

  return (
    <Dialog open={isEditCategoryOpened} onOpenChange={editCategory}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Your Category</DialogTitle>
            <DialogDescription>
              Make your category expressive as much as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="categoryLabel">Label</Label>
              <Input
                value={categoryTitle}
                onChange={(e) => {
                  setCategoryTitle(e.target.value);
                }}
                id="categoryLabel"
                type="text"
                placeholder="Your Category!"
                className="placeholder:text-sm text-sm"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryIcon">Category Icon</Label>
              <div className="flex flex-wrap gap-1">
                {categoriesIcons.map((categoryIconItem, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setCategoryIcon(categoryIconItem)}
                    className={`w-fit bg-gray-200 p-3`}
                  >
                    {categoryIconItem}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryResult">Category Color</Label>
              <div className="flex flex-wrap justify-start gap-2">
                {categoriesColors.map((color, idx) => (
                  <Button
                    key={idx}
                    onClick={() => {
                      setCategoryColor(color);
                    }}
                    className={`w-7 h-7 rounded-full hover:scale-110 cursor-pointer duration-200 p-0`}
                    style={{
                      backgroundColor: color,
                    }}
                  ></Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryResult">Updated Category</Label>
              <Input
                value={categoryIcon + categoryTitle}
                readOnly
                id="categoryResult"
                type="text"
                className="text-[15px]!"
                style={{ backgroundColor: categoryColor }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(editCategory(false));
                  setCategoryTitle(nameCategory); // by default: Available categories
                  setCategoryIcon(iconCategory); // by deafult: Original Icon
                  setCategoryColor(colorCategory); // by deafult: Original Icon
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={
                nameCategory === categoryTitle &&
                iconCategory === categoryIcon &&
                colorCategory === categoryColor
              }
              type="button"
              onClick={() => {
                const updatedCategory: CategoryStrapi = {
                  nameCategory: categoryTitle,
                  iconCategory: categoryIcon,
                  colorCategory: categoryColor,
                };
                if (
                  !categories.find(
                    (category: CategoryStrapi) =>
                      category.nameCategory === categoryTitle &&
                      category.iconCategory === categoryIcon &&
                      category.colorCategory === categoryColor
                  )
                ) {
                  toast("Category updated successfully!", {
                    icon: "🪄",
                  });
                  updateCategory.mutate(updatedCategory);
                  dispatch(editCategory(false));
                } else if (
                  categories.find(
                    (category: CategoryStrapi) =>
                      category.nameCategory === categoryTitle &&
                      category.iconCategory === categoryIcon &&
                      category.colorCategory === categoryColor
                  )
                ) {
                  toast("Category already existed!", {
                    icon: "🪄",
                  });
                }
              }}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
});
