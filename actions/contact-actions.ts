"use server";

import { db } from "@/db";
import { inquiriesTable } from "@/db/schema";
import { contactFormSchema } from "@/lib/validations/contact-schema";

export const addContactMessageAction = async (prevState: any, formData: FormData) => {
  const result = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  console.log(result)

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten(),
      message: ""
    };
  }

  // Save to database
//   await db.insert(inquiriesTable).values(result.data);

  return {
    success: true,
    error: {},
    message: "ההודעה נשלחה בהצלחה!"
  };
};