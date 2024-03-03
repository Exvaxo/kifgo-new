import {
  getPolicyProfiles,
  getShippingProfiles,
} from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetPolicies = () => {
  return useQuery({
    queryKey: ["use-get-policies"],
    queryFn: async () => {
      const policyProfiles = await getPolicyProfiles();
      return policyProfiles;
    },
    retry: 1,
  });
};

export default useGetPolicies;
