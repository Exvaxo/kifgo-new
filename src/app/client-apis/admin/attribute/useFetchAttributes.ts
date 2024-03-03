import { loadAttributes } from "@/app/admin/categories/_actions";
import { useQuery } from "@tanstack/react-query";

const useFetchAttributes = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["use-fetch-attributes", searchTerm],
    queryFn: async () => {
      const attributes = await loadAttributes(searchTerm);
      return attributes;
    },
    retry: 1,
  });
};

export default useFetchAttributes;
