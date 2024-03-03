import { updateAttributeName } from "@/app/admin/attributes/_actions";

import { useMutation } from "@tanstack/react-query";

const useUpdateAttributeName = () => {
  return useMutation({
    mutationKey: ["update-attribute-name"],
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      await updateAttributeName(id, name);
      return "updated";
    },
  });
};

export default useUpdateAttributeName;
