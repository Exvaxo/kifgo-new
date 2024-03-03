import { getShippingProfile } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetShippingProfile = (id: string | null) => {
  return useQuery({
    queryKey: ["use-get-shipping-profile", id],
    queryFn: async () => {
      if (!id) return null;
      const shippingProfile = await getShippingProfile(id);
      return shippingProfile || null;
    },
    retry: 1,
  });
};

export default useGetShippingProfile;
