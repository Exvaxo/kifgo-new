import fetcher from "@/utilities/fetcher";
import { useQuery } from "@tanstack/react-query";

const useGetResetPasswordOtpTimer = () => {
  return useQuery({
    queryKey: ["use-get-reset-otp-timer"],
    queryFn: async () => {
      const { data } = await fetcher().get("/user/forgot-password");
      return data;
    },
    retry: 1,
  });
};

export default useGetResetPasswordOtpTimer;
