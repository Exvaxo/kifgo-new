import { z } from "zod";

export const FirebaseMedia = z.object({
  url: z.string({ required_error: "Required." }).trim().min(1, "Required."),
  ref: z.string().trim().optional().nullable(),
  file: z.any().optional().nullable(),
});

export const ImageType = z.object({
  highRes: FirebaseMedia,
  lowRes: FirebaseMedia,
  alt: z.string().trim().optional().nullable(),
});

export const Video = FirebaseMedia;
