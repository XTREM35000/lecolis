import { z } from "zod";

export const loginSchema = z.object({
  fullPhoneNumber: z.string(),
  password: z.string().min(6),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["superadmin", "admin", "client", "guest"]).default("client"),
});

export const createShipmentSchema = z.object({
  recipient: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().min(5, "Phone number is required"),
    address: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required"),
      postalCode: z.string().min(1, "Postal code is required"),
    }),
  }),
  dimensions: z.object({
    length: z.number().min(0, "Length must be positive"),
    width: z.number().min(0, "Width must be positive"),
    height: z.number().min(0, "Height must be positive"),
    weight: z.number().min(0, "Weight must be positive"),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
