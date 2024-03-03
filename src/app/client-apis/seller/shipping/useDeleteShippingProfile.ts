import { deleteShippingProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";

import { useMutation } from "@tanstack/react-query";

const useDeleteShippingProfile = () => {
  return useMutation({
    mutationKey: ["delete-shipping-profile"],
    mutationFn: async (id: string) => {
      if (!id) return null;
      const deleted = await deleteShippingProfile(id);
      return deleted;
    },
  });
};

export default useDeleteShippingProfile;
