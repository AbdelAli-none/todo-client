import { API_URL } from "@/lib/API_LINK";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCompletedTodos = () => {
  const jwt = localStorage.getItem("token");

  if (!jwt) return { data: [], isLoading: false, error: null } as const;

  return useQuery({
    queryKey: ["completedTodos"],
    queryFn: async () => {
      const meRes = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const userId = meRes.data.id;

      const completedTodosRes = await axios.get(
        `${API_URL}/api/todos?filters[owner][id][$eq]=${userId}&sort:completedAt:desc&filters[completedAt][$ne]=`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return completedTodosRes.data.data || [];
    },
  });
};
