import axios from "axios";

const axiosPunlice = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "https://task-management-server-sigma-silk.vercel.app/",
});

const useAxiosPublice = () => {
  return axiosPunlice;
};

export default useAxiosPublice;
