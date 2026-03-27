import { API_URL } from "@/lib/API_LINK";
import type { CategoryStrapi } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditCategory = (categoryDocumentId: string) => {
  const jwt = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCategory: CategoryStrapi) => {
      const { colorCategory, iconCategory, nameCategory } = updatedCategory;

      const res = await axios.put(
        `${API_URL}/api/categories/${categoryDocumentId}`,
        {
          data: {
            iconCategory,
            nameCategory,
            colorCategory,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
