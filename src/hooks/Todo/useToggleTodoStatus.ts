import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useToggleTodoStatus = (isDone: boolean) => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const completeTodoAt = new Date().toISOString().split("T")[0];

  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await axios.put(
        `http://localhost:1337/api/todos/${documentId}`,
        {
          data: {
            isDone: !isDone,
            completedAt: !isDone ? completeTodoAt : "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
