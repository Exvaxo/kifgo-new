import fetcher from "@/utilities/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

const useWhoAmI = () => {
  return useMutation({
    mutationKey: ["who-am-i"],
    mutationFn: async () => {
      const { data } = await fetcher().get("/user/whoami");
      return data;
    },
  });
};

const useWhoAmIFetch = () => {
  return useQuery({
    queryKey: ["who-am-i-fetch"],
    queryFn: async () => {
      const { data } = await fetcher().get("/user/whoami");
      return data;
    },
  });
};

export { useWhoAmI, useWhoAmIFetch };
