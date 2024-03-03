import axios from "axios";
import isValid from "./isValid";

const fetcher = () => {
  let token = "";
  let unParsedToken: string | undefined | null;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    unParsedToken = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_TOKEN_PREFIX}_token`,
    );
  }

  if (isValid(unParsedToken)) token = JSON.parse(unParsedToken || " ");

  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000 * 15,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log({ errorFromInterceptor: error });
    },
  );

  return axiosClient;
};

export default fetcher;
