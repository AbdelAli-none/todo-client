// import type { TodoStrapi } from "@/types";
import { API_URL } from "@/lib/API_LINK";
import type { TodoStrapi } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditTodo = (todoDocumentId: string) => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo: TodoStrapi) => {
      const { title, description, isDone, category, priority } = updatedTodo;

      // console.log(updatedTodo);

      const res = await axios.put(
        `${API_URL}/api/todos/${todoDocumentId}`,
        {
          data: {
            title,
            description,
            isDone,
            category: category.documentId,
            priority: priority.documentId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      console.log(error.response.message);
    },
  });
};
