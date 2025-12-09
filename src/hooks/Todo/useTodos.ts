import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTodos = () => {
  const jwt = localStorage.getItem("token");
  if (!jwt) return { data: [], isLoading: false, error: null } as const;
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const meRes = await axios.get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      const userId = meRes.data.id;

      const res = await axios.get(
        `http://localhost:1337/api/todos?filters[owner][id][$eq]=${userId}&populate[0]=category&populate[1]=priority&fields=title,description,isDone,completedAt&sort=priority.valuePriority:desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return res.data.data || [];
    },
    enabled: !!jwt,
    placeholderData: [], // during loading
    initialData: [],
  });
};
