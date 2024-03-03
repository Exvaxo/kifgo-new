import { loadAttributes } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useGetCategoryAttrs = (id?: string) => {
  return useQuery({
    queryKey: ["use-get-category-attrs", id],
    queryFn: async () => {
      if (!id) return null;
      const categories = await loadAttributes(id);
      console.log({ categories });
      return categories;
    },
    retry: 1,
  });
};

export default useGetCategoryAttrs;
