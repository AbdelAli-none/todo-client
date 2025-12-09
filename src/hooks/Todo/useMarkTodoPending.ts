import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useMarkTodoPending = (todoDocumentId: string) => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `http://localhost:1337/api/todos/${todoDocumentId}`,
        {
          data: {
            isDone: false,
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
    onError: (error: any) => {
      console.log(error.response.message);
    },
  });
};
