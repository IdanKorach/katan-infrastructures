import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "שם מלא נדרש")
    .regex(/^[a-zA-Z\u0590-\u05FF\s]+$/, "השם יכול להכיל רק אותיות"),
  email: z.email(),
  phone: z
    .string()
    .min(1, "טלפון נדרש")
    .regex(/^05[0-9]-?\d{7}$/, "מספר טלפון לא תקין (050-1234567)"),
  subject: z
    .enum(["general", "project", "support"], {
      message: "בחר נושא",
    }),
  message: z
    .string()
    .min(1, "הודעה נדרשת")
    .min(10, "ההודעה חייבת להיות לפחות 10 תווים"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;