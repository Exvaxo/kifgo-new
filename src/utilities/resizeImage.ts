import { fromBlob } from "image-resize-compress";
type Options = {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
};
export async function resizeImage(
  file: File,
  { quality, width, height, format }: Options,
) {
  const resizedFile = await fromBlob(file, quality, width, height, format);
  return resizedFile;
}
