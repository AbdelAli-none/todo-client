import type { TodoStrapi } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateTodo = (
  selectedCategoryId: string,
  selectedPriorityId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    // with CUD operations (update, delete, create)
    mutationFn: async (dataTodo: TodoStrapi) => {
      const { title, description, isDone } = dataTodo;
      const jwt = localStorage.getItem("token");

      const me = await fetch("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      }).then((r) => r.json());

      const payload = {
        data: {
          title,
          description,
          isDone: isDone ?? false,
          category: selectedCategoryId,
          priority: selectedPriorityId,
          owner: me.id,
        },
      };

      const res = await axios.post("http://localhost:1337/api/todos", payload, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      console.error("Create todo failed:", error.response?.data || error);
    },
  });
};
