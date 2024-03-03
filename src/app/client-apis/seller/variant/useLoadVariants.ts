import { AvailableVariant } from "@/app/shop/onboarding/stock-your-shop/Variation";
import { loadVariants } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useLoadVariants = () => {
  return useQuery({
    queryKey: ["use-load-variants"],
    queryFn: async () => {
      try {
        const variants =
          (await loadVariants()) as unknown as AvailableVariant[];
        console.log({ variants });
        return variants;
      } catch (error) {
        console.log({ error });
      }
    },
    retry: 1,
  });
};

export default useLoadVariants;
