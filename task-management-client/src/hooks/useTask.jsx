import { useContext } from "react";
import useAxiosPublice from "./useAxiosPublice";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../auth/AuthProvider";

const useTask = () => {
  const { user } = useContext(AuthContext);
  const axiosPunlice = useAxiosPublice();

  // user email
  const email = user?.email;

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks-get"],
    queryFn: async () => {
      const res = await axiosPunlice.get(`/tasks/${email}`);
      return res.data;
    },
  });

  return [tasks, refetch];
};

export default useTask;
