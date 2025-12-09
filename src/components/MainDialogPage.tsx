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
import { SelectCategory } from "./SelectCategory";
import React, { useState } from "react";
import { SelectPriority } from "./SelectPriority";
import type { TodoStrapi } from "@/types";
import { FieldLabel } from "./UI/field";
import { Textarea } from "./UI/textarea";
import { useToDoInfo } from "@/hooks/ToDoInfo(local)/useToDoInfo";
import { AddCategoryPage } from "./AddCategoryPage";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { AlertDeleteDialogPage } from "./AlertDeleteCategoryPage";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { mainDialogOpen } from "@/app/features/UI/uiSlice";
import { useCreateTodo } from "@/hooks/Todo/useCreateTodo";
import { useNavigate } from "react-router";

export const MainDialogPage = React.memo(() => {
  // States
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(
    null
  );
  const [selectedPriorityId, setSelectedPriorityId] = useState<null | string>(
    null
  );

  const minimumLength = 10;
  const [minimum, setMinimum] = useState<number>(minimumLength);

  // custom hooks
  const { toDo, setToDo } = useToDoInfo();

  // related to redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.openCloseHandler.isMainDialogOpen
  );
  //
  const defaultToDo: TodoStrapi = {
    title: "",
    description: "",
    isDone: false,
    completedAt: "",
    category: {
      nameCategory: "",
      iconCategory: "",
      colorCategory: "",
    },
    priority: {
      iconPriority: "",
      levelPriority: "",
      valuePriority: 0,
    },
  };

  const {
    title,
    description,
    category: { nameCategory, iconCategory },
    priority: { levelPriority },
  } = toDo;

  // console.log(toDo);

  const createTodoMutation = useCreateTodo(
    String(selectedCategoryId),
    String(selectedPriorityId)
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => dispatch(mainDialogOpen(open))}
      >
        <DialogContent className="sm:max-w-[425px] pb-2">
          <DialogHeader className="!text-center">
            <DialogTitle>Your Next Todo</DialogTitle>
            <DialogDescription>
              Quickly add a new task to your list. You can edit or mark it as
              done later.
            </DialogDescription>
          </DialogHeader>
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="my-4"
          >
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Todo Title</Label>
                <Input
                  value={toDo["title"]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setToDo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                  id="title"
                  name="title"
                  placeholder="What needs to be done?"
                />
              </div>
              <div className="grid">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  value={toDo["description"]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setToDo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                    setMinimum(minimumLength - value.length);
                  }}
                  id="description"
                  name="description"
                  placeholder="Describe more your todo (please fill this in ✨)"
                  rows={4}
                  minLength={10}
                  className={`mt-3 mb-1 rounded p-2 border focus:border-none duration-700
                      ${
                        minimum <= 0 &&
                        "focus-visible:ring-2 focus-visible:ring-green-300"
                      }`}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 10 characters required.(
                  {minimum <= 0 ? "Valid" : `insert ${minimum} character(s)`})
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Label</Label>
                <SelectCategory setSelectedCategoryId={setSelectedCategoryId} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="priority">Todo Priority</Label>
                <SelectPriority setSelectedPriorityId={setSelectedPriorityId} />
              </div>
            </div>
          </form>
          <DialogFooter>
            <DialogClose
              asChild
              onClick={() => dispatch(mainDialogOpen(false))}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setToDo(defaultToDo);
                  dispatch(mainDialogOpen(false));
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={
                !title ||
                !nameCategory ||
                !iconCategory ||
                description.length < 10 ||
                !levelPriority
              }
              type="submit"
              onClick={() => {
                dispatch(mainDialogOpen(false));
                setToDo(defaultToDo);
                createTodoMutation.mutate(toDo);
                return navigate("/");
              }}
            >
              Save Todo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddCategoryPage />

      <EditCategoryDialog />
      <AlertDeleteDialogPage />
    </>
  );
});
