import { z } from "zod";

export const institutionSchema = z.object({
  institution: z
    .string()
    .min(2, "Veuillez indiquer le nom de votre structure.")
    .max(200, "Nom trop long."),
  contact_name: z.string().min(2, "Veuillez indiquer votre nom.").max(100, "Nom trop long."),
  role: z.string().min(2, "Veuillez indiquer votre fonction.").max(100, "Fonction trop longue."),
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

export type InstitutionData = z.infer<typeof institutionSchema>;
