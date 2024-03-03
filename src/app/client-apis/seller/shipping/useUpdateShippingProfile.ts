import {
  createShippingProfile,
  updateShippingProfile,
} from "@/app/shop/onboarding/stock-your-shop/_actions";

import { CreateShippingProfileInputType } from "@/app/shop/onboarding/stock-your-shop/Shipping";
import { useMutation } from "@tanstack/react-query";

const useUpdateShippingProfile = () => {
  return useMutation({
    mutationKey: ["update-shipping-profile"],
    mutationFn: async ({
      body,
      id,
    }: {
      body: CreateShippingProfileInputType;
      id: string | null;
    }) => {
      if (!id) return null;
      const shippingProfile = await updateShippingProfile(body, id);
      return shippingProfile;
    },
  });
};

export default useUpdateShippingProfile;
