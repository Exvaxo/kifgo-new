import { AvailableVariant } from "@/app/shop/onboarding/stock-your-shop/Variation";
import { loadVariants } from "@/app/shop/onboarding/stock-your-shop/_actions";
import fetcher from "@/utilities/fetcher";
import { useQuery } from "@tanstack/react-query";

const useLoadVariants = () => {
  return useQuery({
    queryKey: ["use-load-variants"],
    queryFn: async () => {
      try {
        const { data: variants } = await fetcher().get("/variant");
        console.log({ variants });

        let v = variants as unknown as AvailableVariant[];
        return v;
      } catch (error) {
        console.log({ error });
      }
    },
    retry: 1,
  });
};

export default useLoadVariants;
