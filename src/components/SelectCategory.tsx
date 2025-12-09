import React from "react";
import { Button } from "./UI/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./UI/select";

import { Pencil, Trash2 } from "lucide-react";
import type { CategoryStrapi, TodoStrapi } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  deleteCategoryAlertOpen,
  setIsAddCategoryOpen,
} from "@/app/features/UI/uiSlice";
import { useDispatch } from "react-redux";
import { useCategories } from "@/hooks/Categories/useCategories";
import { editCategory } from "@/app/features/UI/uiSlice";
import {
  setCategoryIdToDelete,
  setCategoryIdToEdit,
} from "@/app/features/IDs/IDsSlice";
import { useToDoInfo } from "@/hooks/ToDoInfo(local)/useToDoInfo";

type SelectCategoryProps = {
  selectedCategory?: {
    documentId?: string;
    nameCategory: string;
    iconCategory: string;
    colorCategory: string;
  };
  setUpdateToDo?: React.Dispatch<React.SetStateAction<TodoStrapi>>;
  setSelectedCategoryId?: React.Dispatch<React.SetStateAction<null | string>>;
};

export const SelectCategory = React.memo(
  ({
    selectedCategory,
    setUpdateToDo,
    setSelectedCategoryId,
  }: SelectCategoryProps) => {
    const { setToDo } = useToDoInfo();
    const dispatch = useDispatch();

    const { iconCategory, nameCategory, colorCategory, documentId } =
      selectedCategory || {};

    const { data: categories } = useCategories();

    if (!categories) return null;

    const SP = "\u00A0".repeat(5);

    return (
      <>
        <Select
          defaultValue={
            iconCategory && nameCategory && colorCategory && documentId
              ? `${iconCategory}|${nameCategory}|${colorCategory}|${documentId}`
              : undefined
          }
          onValueChange={(value) => {
            const [icon, title, color, documentId] = value.split("|");

            setToDo((prev) => ({
              ...prev,
              category: {
                documentId,
                nameCategory: title,
                iconCategory: icon,
                colorCategory: color,
              },
            }));

            setUpdateToDo &&
              setUpdateToDo((prev) => ({
                ...prev,
                category: {
                  documentId,
                  colorCategory: color,
                  iconCategory: icon,
                  nameCategory: title,
                },
              }));
            setSelectedCategoryId && setSelectedCategoryId(documentId); // seperate them with # and chose every single one
          }}
        >
          <SelectTrigger className="w-full ps-0">
            <SelectValue
              placeholder={`${SP}eg: 🏠Home, 💼Work, 🎯Personal, 💰Finance`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.length > 0 && (
                <SelectLabel>Mark Your Category</SelectLabel>
              )}
              <AnimatePresence>
                {categories.map((category: CategoryStrapi) => {
                  const {
                    iconCategory,
                    nameCategory,
                    colorCategory,
                    documentId,
                  } = category;

                  const iconAndtitleAndColorAndDocumentId = `${iconCategory}|${nameCategory}|${colorCategory}|${documentId}`;

                  return (
                    <motion.div
                      key={category.documentId}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      className="flex justify-between items-center gap-x-1 mb-1"
                    >
                      <SelectItem
                        className={`flex justify-start items-center p-0`}
                        value={iconAndtitleAndColorAndDocumentId}
                      >
                        <span
                          className="text-[18px] h-full p-1 rounded-tr-xl rounded-br-xl"
                          style={{ backgroundColor: colorCategory }}
                        >
                          {iconCategory}
                        </span>
                        <span>{nameCategory}</span>
                      </SelectItem>
                      <motion.div className="flex gap-x-1">
                        <Button
                          onClick={() => {
                            dispatch(setCategoryIdToEdit(String(documentId)));
                            dispatch(editCategory(true));
                          }}
                          className="bg-orange-500 hover:bg-orange-400"
                        >
                          <Pencil /> {/* Edit */}
                        </Button>
                      </motion.div>
                      <Button
                        onClick={() => {
                          dispatch(deleteCategoryAlertOpen(true));
                          dispatch(setCategoryIdToDelete(String(documentId)));
                        }}
                        className="bg-red-500 hover:bg-red-400"
                      >
                        <Trash2 /> {/* Delete */}
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <SelectLabel className="text-center">
                Your Category Not Available, Create Yours
              </SelectLabel>
              <div className="flex w-full max-w-sm items-center gap-2">
                <Button
                  onClick={() => {
                    dispatch(setIsAddCategoryOpen(true));
                  }}
                  type="submit"
                  variant="outline"
                  className="bg-primary text-white w-[75%] mx-auto cursor-pointer"
                >
                  ADD
                </Button>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
    );
  }
);

// {
//   categories.map((category: CategoryStrapi) => {
//     const { iconCategory, nameCategory, colorCategory, documentId } = category;

//     const iconAndtitleAndColorAndDocumentId = `${iconCategory}|${nameCategory}|${colorCategory}|${documentId}`;

//     console.log(iconAndtitleAndColorAndDocumentId + "  from map");

//     return (
//       <motion.div
//         key={category.documentId}
//         layout
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay: 0.2 }}
//         exit={{ opacity: 0, y: 20, scale: 0.95 }}
//         className="flex justify-between items-center gap-x-1 mb-1"
//       >
//         <SelectItem
//           className={`flex justify-start items-center p-0`}
//           value={iconAndtitleAndColorAndDocumentId}
//         >
//           <span
//             className="text-[18px] h-full p-1 rounded-tr-xl rounded-br-xl"
//             style={{ backgroundColor: colorCategory }}
//           >
//             {iconCategory}
//           </span>
//           <span>{nameCategory}</span>
//         </SelectItem>
//         <motion.div className="flex gap-x-1">
//           <Button
//             onClick={() => {
//               dispatch(setCategoryIdToEdit(String(documentId)));
//               dispatch(editCategory(true));
//             }}
//             className="bg-orange-500 hover:bg-orange-400"
//           >
//             <Pencil /> {/* Edit */}
//           </Button>
//         </motion.div>
//         <Button
//           onClick={() => {
//             dispatch(deleteCategoryAlertOpen(true));
//             dispatch(setCategoryIdToDelete(String(documentId)));
//           }}
//           className="bg-red-500 hover:bg-red-400"
//         >
//           <Trash2 /> {/* Delete */}
//         </Button>
//       </motion.div>
//     );
//   });
// }
