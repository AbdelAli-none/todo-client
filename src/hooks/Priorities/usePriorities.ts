import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const jwt = localStorage.getItem("token");
export const usePriorities = () => {
  return useQuery({
    queryKey: ["priorities"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:1337/api/priorities?fields[0]=iconPriority&fields[1]=levelPriority&fields[2]=valuePriority&sort[0]=valuePriority:desc",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(res.data.data);
      return res.data.data;
    },
  });
};
