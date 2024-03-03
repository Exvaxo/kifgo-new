import { createPolicyProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { CreatePolicyInputType } from "@/app/shop/onboarding/stock-your-shop/Settings";

import { useMutation } from "@tanstack/react-query";

const useCreatePolicy = () => {
  return useMutation({
    mutationKey: ["create-policy"],
    mutationFn: async (body: CreatePolicyInputType) => {
      const policyProfile = await createPolicyProfile(body);
      return policyProfile;
    },
  });
};

export default useCreatePolicy;
