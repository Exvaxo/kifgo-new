import { createShippingProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";

import { CreateShippingProfileInputType } from "@/app/shop/onboarding/stock-your-shop/Shipping";
import { useMutation } from "@tanstack/react-query";

const useCreateShippingProfile = () => {
  return useMutation({
    mutationKey: ["create-shipping-profile"],
    mutationFn: async (body: CreateShippingProfileInputType) => {
      const shippingProfile = await createShippingProfile(body);
      return shippingProfile;
    },
  });
};

export default useCreateShippingProfile;
