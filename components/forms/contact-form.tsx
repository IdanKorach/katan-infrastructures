"use client";

import { useActionState, useState, useEffect } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addContactMessageAction } from "@/actions/contact-actions";
import { contactFormSchema } from "@/lib/validations/contact-schema";
import { Loader2Icon } from "lucide-react";

const initialState = {
  success: false,
  error: {},
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    addContactMessageAction,
    initialState
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate field using Zod
  const validateField = (name: string, value: string): string => {
    try {
      const fieldSchema = contactFormSchema.pick({
        [name]: true,
      } as any);
      fieldSchema.parse({ [name]: value });
      return "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || "";
      }
      return "";
    }
  };

  // Handle field change
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  // Handle field blur
  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, subject: value });
    setTouched({ ...touched, subject: true });

    const error = validateField("subject", value);
    setErrors({ ...errors, subject: error });
  };

  useEffect(() => {
    if (state.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTouched({});
      setErrors({});
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-4xl mx-auto p-8 bg-card rounded-lg border"
    >
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">צור קשר</h2>
        <div className="h-1 w-30 bg-primary rounded"></div>
      </div>

      {/* Server-side error messages */}
      {state.error && Object.keys(state.error).length > 0 && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 space-y-2">
          {Object.entries(state.error).map(([field, messages]) => (
            <p key={field} className="text-destructive text-sm">
              {(messages as string[])[0]}
            </p>
          ))}
        </div>
      )}

      {/* Success message */}
      {state.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{state.message}</p>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            id="name"
            name="name"
            placeholder="שם מלא *"
            value={formData.name}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            className={`w-full border-2 transition ${
              touched.name && errors.name
                ? "border-destructive"
                : "border-border hover:border-primary focus:border-primary"
            }`}
          />
          {touched.name && errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Input
            id="email"
            name="email"
            placeholder="אימייל *"
            type="email"
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            className={`w-full border-2 transition ${
              touched.email && errors.email
                ? "border-destructive"
                : "border-border hover:border-primary focus:border-primary"
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Input
          id="phone"
          name="phone"
          placeholder="טלפון * (050-1234567)"
          value={formData.phone}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          className={`w-full border-2 transition ${
            touched.phone && errors.phone
              ? "border-destructive"
              : "border-border hover:border-primary focus:border-primary"
          }`}
        />
        {touched.phone && errors.phone && (
          <p className="text-destructive text-sm">{errors.phone}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <input type="hidden" name="subject" value={formData.subject} />
        <Select
          dir="rtl"
          value={formData.subject}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger
            className={`w-full border-2 transition ${
              touched.subject && errors.subject
                ? "border-destructive"
                : "border-border hover:border-primary focus:border-primary"
            }`}
          >
            <SelectValue placeholder="בחר נושא *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">שאלה כללית</SelectItem>
            <SelectItem value="project">פנייה לפרויקט</SelectItem>
            <SelectItem value="support">תמיכה</SelectItem>
          </SelectContent>
        </Select>
        {touched.subject && errors.subject && (
          <p className="text-destructive text-sm">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Textarea
          placeholder="תוכן הפנייה * (לפחות 10 תווים)"
          name="message"
          value={formData.message}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          className={`w-full min-h-40 border-2 transition resize-none ${
            touched.message && errors.message
              ? "border-destructive"
              : "border-border hover:border-primary focus:border-primary"
          }`}
        />
        {touched.message && errors.message && (
          <p className="text-destructive text-sm">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full md:w-1/3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded transition cursor-pointer disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2Icon className="size-4 mr-2 animate-spin" />
            שולח...
          </>
        ) : (
          "שלח הודעה"
        )}
      </Button>
    </form>
  );
}
