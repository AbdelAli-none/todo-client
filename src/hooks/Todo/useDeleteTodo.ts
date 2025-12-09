import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTodo = () => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      await axios.delete(`http://localhost:1337/api/todos/${documentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
//
