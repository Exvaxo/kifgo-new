import {
  loadRootCategories,
  loadSubCategories,
} from "@/app/shop/onboarding/stock-your-shop/_actions";
import { LoadCategory } from "./useGetRootCategories";

import { useMutation } from "@tanstack/react-query";

const useGetSubCategories = () => {
  return useMutation({
    mutationKey: ["use-get-sub-categories"],
    mutationFn: async (parentId: string) => {
      const categories = (await loadSubCategories(parentId)) as LoadCategory[];
      return categories;
    },
  });
};

export default useGetSubCategories;
