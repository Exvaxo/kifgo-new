import { loadRootCategories } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

export type LoadCategory = {
  id: string;
  title: string;
  parentId?: string;
  path?: string[];
};
const useGetRootCategories = () => {
  return useQuery({
    queryKey: ["use-get-root-categories"],
    queryFn: async () => {
      const categories = (await loadRootCategories()) as LoadCategory[];
      return categories;
    },
    retry: 1,
  });
};

export default useGetRootCategories;
