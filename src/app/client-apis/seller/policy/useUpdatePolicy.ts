import { updatePolicyProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { CreatePolicyInputType } from "@/app/shop/onboarding/stock-your-shop/Settings";

import { useMutation } from "@tanstack/react-query";

const useUpdatePolicy = () => {
  return useMutation({
    mutationKey: ["update-policy"],
    mutationFn: async ({
      body,
      id,
    }: {
      body: CreatePolicyInputType;
      id: string | null;
    }) => {
      if (!id) return null;
      const shippingProfile = await updatePolicyProfile(body, id);
      return shippingProfile;
    },
  });
};

export default useUpdatePolicy;
