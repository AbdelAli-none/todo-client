import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMe = () => {
  const jwt = localStorage.getItem("token");
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const meRes = await axios.get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return meRes.data || {};
    },
    enabled: !!jwt,
  });
};
