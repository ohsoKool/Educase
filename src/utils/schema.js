import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().refine((val) => val >= -90 && val <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.number().refine((val) => val >= -180 && val <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

export const userLocation = z.object({
  latitude: z.number().refine((val) => val >= -90 && val <= 90, {
    message: "Latitude must be between -90 and 90",
  }),
  longitude: z.number().refine((val) => val >= -180 && val <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});
