import { updateAttributeName } from "@/app/admin/attributes/_actions";
import { updateCategoryAttributes } from "@/app/admin/categories/_actions";

import { useMutation } from "@tanstack/react-query";

const useUpdateAttribute = () => {
  return useMutation({
    mutationKey: ["update-attribute-category"],
    mutationFn: async ({
      id,
      attributes,
    }: {
      id: string | null;
      attributes: string[];
    }) => {
      if (!id) return;
      await updateCategoryAttributes(id, attributes);
      return "updated";
    },
  });
};

export default useUpdateAttribute;
