import { getShippingProfiles } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetShippingProfiles = () => {
  return useQuery({
    queryKey: ["use-get-shipping-profiles"],
    queryFn: async () => {
      const shippingProfiles = await getShippingProfiles();
      return shippingProfiles;
    },
    retry: 1,
  });
};

export default useGetShippingProfiles;
