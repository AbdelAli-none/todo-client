import type { CategoryStrapi } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataCategory: CategoryStrapi) => {
      const { iconCategory, nameCategory, colorCategory } = dataCategory;
      const jwt = localStorage.getItem("token");

      const payload = {
        data: {
          iconCategory,
          nameCategory,
          colorCategory,
        },
      };

      const res = await axios.post(
        "http://localhost:1337/api/categories",
        payload,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error: any) => {
      console.log("Create category failed", error.response?.data || error);
    },
  });
};
