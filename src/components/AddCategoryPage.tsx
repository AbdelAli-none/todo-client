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
import React, { useState } from "react";
import { toast } from "sonner";
import type { CategoryStrapi } from "@/types";
import { useCategories } from "@/hooks/Categories/useCategories";
import { useCreateCategory } from "@/hooks/Categories/useCreateCategory";
import { setIsAddCategoryOpen } from "@/app/features/UI/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export const AddCategoryPage = React.memo(() => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newIconCategory, setNewIconCategory] = useState<string>("");
  const [newCategoryColor, setNewCategoryColor] = useState<string>("");

  const dispatch = useDispatch();

  // global states
  const isAddCategoryOpen = useSelector(
    (state: RootState) => state.openCloseHandler.isAddCategoryOpen
  );

  // hooks
  const { data: categories } = useCategories();
  const createNewCategory = useCreateCategory();

  return (
    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
      <DialogContent className="sm:max-w-[425px] pb-2">
        <DialogHeader className="!text-center">
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize your tasks.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={(e) => e.preventDefault()} className="my-4">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="categoryLabel">Label</Label>
              <Input
                onChange={(e) => {
                  const { target } = e;
                  setNewCategoryName(target.value);
                }}
                value={newCategoryName}
                id="categoryLabel"
                type="text"
                placeholder="New Category!"
                className="placeholder:text-sm text-sm"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryIcon">Category Icon</Label>
              <div className="flex flex-wrap justify-start gap-1.5">
                {categoriesIcons.map((category, idx) => (
                  <Button
                    onClick={() => setNewIconCategory(category)}
                    key={idx}
                    className="w-[41px] bg-background p-2.5 border-1 border-primary cursor-pointer duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryResult">Category Color</Label>
              <div className="flex flex-wrap justify-start gap-2.5">
                {categoriesColors.map((color, idx: any) => (
                  <Button
                    key={idx}
                    onClick={() => setNewCategoryColor(color)}
                    className="w-7 h-7 rounded-full hover:scale-110 cursor-pointer duration-200 p-0"
                    style={{ backgroundColor: color }}
                  ></Button>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="categoryResult">Your New Category</Label>
              <Input
                value={newIconCategory + "  " + newCategoryName}
                readOnly
                id="categoryResult"
                type="text"
                placeholder="Your Category!"
                className="placeholder:text-sm text-sm text-white"
                style={{ backgroundColor: newCategoryColor }}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose
            asChild
            onClick={() => dispatch(setIsAddCategoryOpen(false))}
          >
            <Button
              onClick={() => {
                setNewCategoryName("");
                setNewCategoryColor("");
                setNewIconCategory("");
              }}
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!newCategoryName || !newIconCategory || !newCategoryColor}
            type="button"
            onClick={() => {
              const iconAndCategory = newIconCategory + newCategoryName;
              const newCategory: CategoryStrapi = {
                iconCategory: newIconCategory,
                nameCategory: newCategoryName,
                colorCategory: newCategoryColor,
              };
              if (
                iconAndCategory.match(/\w+/g) &&
                !categories.find(
                  (item: CategoryStrapi) =>
                    item.iconCategory === newIconCategory &&
                    item.nameCategory === newCategoryName &&
                    item.colorCategory === newCategoryColor
                )
              ) {
                createNewCategory.mutate(newCategory);
                dispatch(setIsAddCategoryOpen(false));
                setNewCategoryName("");
                setNewIconCategory("");
                setNewCategoryColor("");
              } else if (
                categories.find(
                  (item: CategoryStrapi) =>
                    item.iconCategory === newIconCategory &&
                    item.nameCategory === newCategoryName &&
                    item.colorCategory === newCategoryColor
                )
              ) {
                toast.warning("This category is already existed!");
              }
            }}
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
