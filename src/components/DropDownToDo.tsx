"use client";

import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./UI/dropdown-menu";

import { Button } from "./UI/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./UI/Dialog";
import { FieldLabel } from "./UI/field";
import { Input } from "./UI/input";
import type { TodoStrapi } from "@/types";
import { SelectCategory } from "./SelectCategory";
import { SelectPriority } from "./SelectPriority";
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
import { toast } from "sonner";
import { Label } from "./UI/label";
import { Textarea } from "./UI/textarea";
import { useDeleteTodo } from "@/hooks/Todo/useDeleteTodo";
import { useEditTodo } from "@/hooks/Todo/useEditTodo";
import { useMarkTodoPending } from "@/hooks/Todo/useMarkTodoPending";

type DropdownMenuDialogProps = {
  todoInfo: TodoStrapi;
};

export const DropdownMenuDialog = ({ todoInfo }: DropdownMenuDialogProps) => {
  // states
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updatedToDo, setUpdateToDo] = useState<TodoStrapi>(todoInfo);

  // global states

  const {
    documentId,
    title: todoTitle,
    description: todoDescription,
    category: todoCategory,
    priority: todoPriority,
  } = todoInfo;

  const {
    title,
    description,
    isDone,
    category: { iconCategory, nameCategory, colorCategory },
    priority: { levelPriority },
  } = updatedToDo;

  // hooks
  const todoToDelete = useDeleteTodo();
  const todoToEdit = useEditTodo(String(documentId));
  const markTodoPending = useMarkTodoPending(String(documentId));

  const isDisabled =
    (todoTitle == title &&
      todoCategory.nameCategory == nameCategory &&
      todoPriority.levelPriority == levelPriority &&
      todoDescription == description &&
      todoCategory.colorCategory == colorCategory) ||
    !title ||
    !iconCategory ||
    !nameCategory ||
    description.length < 10 ||
    !colorCategory ||
    !levelPriority;

  return (
    <>
      <div className="ml-auto">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              aria-label="Open menu"
              size="icon-sm"
              className="bg-transparent drop-shadow-sm shadow-gray"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="opacity-95">
            <DropdownMenuLabel>To Do Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              {
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    if (isDone) {
                      toast.warning(
                        "Want to tweak one? Just flip it back to Pending first 😏",
                        {
                          action: {
                            label: "Undo completion",
                            onClick: () => {
                              markTodoPending.mutate();
                              toast.success("Todo moved back to pending!");
                            },
                          },
                          duration: 5000,
                        }
                      );
                    } else {
                      setShowEditDialog(true); // open dialog of edit todo
                    }
                  }}
                >
                  Edit
                </DropdownMenuItem>
              }
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setShowDeleteDialog(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialog For Edit ToDo */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Your Todo</DialogTitle>
              <DialogDescription>
                Keep your productivity flowing — update your todo with any new
                details or changes that matter.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Todo Title</Label>
                <Input
                  value={updatedToDo["title"]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUpdateToDo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                  id="title"
                  name="title"
                  placeholder="What needs to be done?"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Label</Label>
                <SelectCategory
                  selectedCategory={updatedToDo.category}
                  setUpdateToDo={setUpdateToDo}
                />
              </div>
              <div className="grid gap-3">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  value={updatedToDo["description"]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUpdateToDo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                  id="description"
                  name="description"
                  placeholder="Describe more your todo (please fill this in ✨)"
                  rows={4}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="priority">Todo Priority</Label>
                <SelectPriority
                  selectedPriority={updatedToDo["priority"]}
                  setUpdateToDo={setUpdateToDo}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild onClick={() => setShowEditDialog(false)}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditDialog(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isDisabled}
                type="submit"
                onClick={() => {
                  todoToEdit.mutate(updatedToDo);
                  // console.log(updatedToDo);
                  setShowEditDialog(false);
                }}
              >
                Update Todo
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* Dialog For Delete ToDo */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gray-200 text-red-500 border-1 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                setShowDeleteDialog(false);
                todoToDelete.mutate(String(documentId));
                // setToDos((prev) => prev.filter((todo) => todo.id !== id));
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
