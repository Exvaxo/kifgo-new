import { loadCategorySuggestion } from "@/app/shop/onboarding/stock-your-shop/_actions";
import { useQuery } from "@tanstack/react-query";

const useLoadCategorySuggestions = (searchTerm: string) => {
  return useQuery({
    queryKey: ["use-load-category-suggestions", searchTerm],
    queryFn: async () => {
      const suggestions = await loadCategorySuggestion(searchTerm);
      return suggestions;
    },
    retry: 1,
  });
};

export default useLoadCategorySuggestions;
