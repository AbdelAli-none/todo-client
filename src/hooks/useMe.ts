import { API_URL } from "@/lib/API_LINK";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMe = () => {
  const jwt = localStorage.getItem("token");
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const meRes = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return meRes.data || {};
    },
    enabled: !!jwt,
  });
};
