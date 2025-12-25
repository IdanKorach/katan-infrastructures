import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name required").regex(/^[a-zA-Z\u0590-\u05FF\s]+$/),
    email: z.email(),
    phone: z.string().regex(/^05[0-9]-?\d{7}$/, "Invalid phone"),
    subject: z.enum(["general", "project", "support"]),
    message: z.string().min(10, "Min 10 chars"),
})
