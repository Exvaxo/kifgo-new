import fetcher from "@/utilities/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

const useSendVerificationEmail = () => {
  return useMutation({
    mutationKey: ["use-send-verification-email"],
    mutationFn: async () => {
      const { data } = await fetcher().post("/user/verify-email/send");
      return data;
    },
  });
};

export default useSendVerificationEmail;
