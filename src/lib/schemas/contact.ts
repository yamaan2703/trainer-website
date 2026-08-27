import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(120, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30, "Phone number is too long"),
  subject: z
    .string()
    .trim()
    .min(2, "Please add a subject")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
