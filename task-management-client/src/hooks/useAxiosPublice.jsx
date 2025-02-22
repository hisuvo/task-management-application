import axios from "axios";

const axiosPunlice = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosPublice = () => {
  return axiosPunlice;
};

export default useAxiosPublice;
