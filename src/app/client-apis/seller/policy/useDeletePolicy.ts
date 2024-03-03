import { deletePolicyProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";

import { useMutation } from "@tanstack/react-query";

const useDeletePolicy = () => {
  return useMutation({
    mutationKey: ["delete-policy"],
    mutationFn: async (id: string) => {
      if (!id) return null;
      const deleted = await deletePolicyProfile(id);
      return deleted;
    },
  });
};

export default useDeletePolicy;
