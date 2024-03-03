import { getPolicy } from "@/app/api/policy/policy.service";
import {
  getPolicyProfile,
  getShippingProfile,
} from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetPolicy = (id: string | null) => {
  return useQuery({
    queryKey: ["use-get-policy-profile", id],
    queryFn: async () => {
      if (!id) return null;
      const policyProfile = await getPolicyProfile(id);
      return policyProfile || null;
    },
    retry: 1,
  });
};

export default useGetPolicy;
