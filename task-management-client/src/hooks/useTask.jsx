import useAxiosPublice from "./useAxiosPublice";
import { useQuery } from "@tanstack/react-query";

const useTask = () => {
  const axiosPunlice = useAxiosPublice();

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks-get"],
    queryFn: async () => {
      const res = await axiosPunlice.get("/tasks");
      return res.data;
    },
  });

  return [tasks, refetch];
};

export default useTask;
