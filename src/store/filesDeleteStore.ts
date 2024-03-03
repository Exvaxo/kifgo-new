import { create } from "zustand";

interface FilesDeleteStore {
  files: string[];
  setFiles: (cb: ((files: string[]) => string[]) | string[]) => void;
}

const useDeleteFiles = create<FilesDeleteStore>()((set) => ({
  files: [],
  setFiles: (cb) => {
    set((state) => ({
      ...state,
      files: typeof cb === "function" ? cb(state.files) : cb,
    }));
  },
}));

export default useDeleteFiles;
