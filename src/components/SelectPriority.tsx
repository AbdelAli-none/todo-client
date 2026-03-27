import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./UI/select";
import type { TodoStrapi, TPriorityItemStrapi } from "@/types";
import { usePriorities } from "@/hooks/Priorities/usePriorities";
import { SkeletonCategories } from "./SkelatonCategories";
import { capitalize } from "@/utils/capital";
import { useToDoInfo } from "@/hooks/ToDoInfo(local)/useToDoInfo";
import { useDispatch } from "react-redux";
import { setIdPriorityToEditTodo } from "@/app/features/IDs/IDsSlice";

type SelectPriorityProps = {
  selectedPriority?: {
    documentId?: string;
    iconPriority: string;
    levelPriority: string;
    valuePriority: number;
  };
  setUpdateToDo?: React.Dispatch<React.SetStateAction<TodoStrapi>>;
  setSelectedPriorityId?: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SelectPriority = React.memo(
  ({
    selectedPriority,
    setUpdateToDo,
    setSelectedPriorityId,
  }: SelectPriorityProps) => {
    const [selected, setSelected] = React.useState<string | undefined>();

    const { documentId, iconPriority, levelPriority, valuePriority } =
      selectedPriority || {};

    React.useEffect(() => {
      if (documentId && iconPriority && levelPriority && valuePriority) {
        setSelected(
          `${iconPriority}|${levelPriority}|${documentId}|${valuePriority}`,
        );
      }
    }, [documentId]);

    const { setToDo } = useToDoInfo();
    const dispatch = useDispatch();
    const { data: prioritySelectList, isLoading, error } = usePriorities();

    if (isLoading) {
      return <SkeletonCategories />;
    }

    if (error) {
      console.log(error);
    }

    if (!prioritySelectList) return;

    return (
      <Select
        value={selected}
        onValueChange={(value) => {
          setSelected(value);

          const [iconPriority, levelPriority, documentId, valuePriority] =
            value.split("|");

          setSelectedPriorityId && setSelectedPriorityId(String(documentId));
          dispatch(setIdPriorityToEditTodo(documentId));

          setToDo((prev) => ({
            ...prev,
            priority: {
              iconPriority,
              levelPriority: levelPriority,
              valuePriority: Number(valuePriority),
            },
          }));

          setUpdateToDo &&
            setUpdateToDo((prev) => ({
              ...prev,
              priority: {
                documentId,
                iconPriority,
                levelPriority,
                valuePriority: Number(valuePriority),
              },
            }));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Give your task a priority boost 🚀" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Levels</SelectLabel>
            {prioritySelectList.map((priorityItem: TPriorityItemStrapi) => {
              const { iconPriority, levelPriority, documentId, valuePriority } =
                priorityItem;
              return (
                <SelectItem
                  key={documentId}
                  value={`${iconPriority}|${levelPriority}|${documentId}|${valuePriority}`}
                >{`${iconPriority} ${capitalize(levelPriority)}`}</SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
);
