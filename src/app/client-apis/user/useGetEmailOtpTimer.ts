import fetcher from "@/utilities/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGetEmailOtpTimer = () => {
  return useQuery({
    queryKey: ["use-get-email-otp-timer"],
    queryFn: async () => {
      const { data } = await fetcher().get("/user/verify-email");
      return data;
    },
    retry: 1,
  });
};

export default useGetEmailOtpTimer;
