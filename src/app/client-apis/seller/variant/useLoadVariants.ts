import { AvailableVariant } from "@/app/shop/onboarding/stock-your-shop/Variation";
import { loadVariants } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useLoadVariants = () => {
  return useQuery({
    queryKey: ["use-load-variants"],
    queryFn: async () => {
      const variants = (await loadVariants()) as unknown as AvailableVariant[];
      console.log({ variants });
      return variants;
    },
    retry: 1,
  });
};

export default useLoadVariants;
