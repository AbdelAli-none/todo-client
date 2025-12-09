import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategories = () => {
  const jwt = localStorage.getItem("token");
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:1337/api/categories?fields[0]=colorCategory&fields[1]=iconCategory&fields[2]=nameCategory",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return res.data.data;
    },
  });
};
