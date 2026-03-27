import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMe } from "../useMe";
import { API_URL } from "@/lib/API_LINK";

const STRAPI_URL = `${API_URL}/api`;

export const useUpcomingTodos = () => {
  const { data: meInfo, isLoading } = useMe();
  const jwt = localStorage.getItem("token");

  return useQuery({
    queryKey: ["upcomingTodos"],
    queryFn: async () => {
      const upcomingTodos = await axios.get(
        `${STRAPI_URL}/todos?filters[owner][id][$eq]=${meInfo.id}&populate[0]=category&populate[1]=priority&fields=title,description,isDone,completedAt&filters[isDone][$eq]=false&sort=priority.valuePriority:desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return upcomingTodos.data.data || [];
    },
    enabled: !!jwt && !!meInfo?.id && !isLoading,
  });
};
