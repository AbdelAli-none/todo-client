import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCompletedTodos = () => {
  const jwt = localStorage.getItem("token");

  if (!jwt) return { data: [], isLoading: false, error: null } as const;

  return useQuery({
    queryKey: ["completedTodos"],
    queryFn: async () => {
      const meRes = await axios.get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const userId = meRes.data.id;

      const completedTodosRes = await axios.get(
        `http://localhost:1337/api/todos?filters[owner][id][$eq]=${userId}&sort:completedAt:desc&filters[completedAt][$ne]=`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return completedTodosRes.data.data || [];
    },
  });
};
