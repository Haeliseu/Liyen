import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Veuillez indiquer votre nom (2 caractères minimum).")
    .max(100, "Nom trop long."),
  email: z.string().email("Adresse email invalide."),
  phone: z
    .string()
    .regex(/^[\d\s+\-()]{0,20}$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(2000, "Message trop long (2000 caractères maximum)."),
});

export type ContactData = z.infer<typeof contactSchema>;
