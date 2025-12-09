import type { TodoStrapi } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCategory = () => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const todosResponse = await axios.get(
        "http://localhost:1337/api/todos?populate[category][fields]=nameCategory,colorCategory,iconCategory&populate[priority][fields]=iconPriority,levelPriority,valuePriority&fields=description,isDone,title&sort=priority.valuePriority:desc", // ← your real endpoint
        {
          params: {
            "filters[category][documentId][$eq]": documentId,
          },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const todosToDelete = todosResponse.data.data; // in here to make a valid data to consume

      // Step 2: Delete all those todos (in parallel = fast!)
      if (todosToDelete.length > 0) {
        await Promise.all(
          todosToDelete.map((todo: TodoStrapi) =>
            axios.delete(`http://localhost:1337/api/todos/${todo.documentId}`, {
              headers: { Authorization: `Bearer ${jwt}` },
            })
          )
        );
      }

      // finally delete the category itself!
      await axios.delete(`http://localhost:1337/api/categories/${documentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    },
    // Refresh those queries
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
