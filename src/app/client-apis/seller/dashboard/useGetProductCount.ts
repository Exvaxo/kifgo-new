import { getProductCount } from "@/app/shop/dashboard/_actions";
import { loadAttributes } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetProductCount = () => {
  return useQuery({
    queryKey: ["use-get-product-count"],
    queryFn: async () => {
      const count = await getProductCount();
      return count;
    },
    retry: 1,
  });
};

export default useGetProductCount;
