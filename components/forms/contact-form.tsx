"use client";

import { useState } from "react";
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
import { addContactMessage } from "@/actions/contact-actions";

export default function ContactForm() {
  const handleSubmit = async (formData: FormData) => {
    await addContactMessage(formData);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "שם מלא נדרש";
        // Only Hebrew and English letters, spaces allowed
        if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(value)) {
          return "השם יכול להכיל רק אותיות";
        }
        break;
      case "email":
        if (!value.trim()) return "אימייל נדרש";
        if (!value.includes("@")) return "אימייל לא תקין";
        break;
      case "phone":
        if (!value.trim()) return "טלפון נדרש";
        // Israeli phone: Must be exactly 10 digits
        // Mobile: 05X-XXXXXXX (05 + 8 digits)
        // Landline: 0X-XXXXXXX (0 + 9 digits, but we'll focus on mobile for now)
        const phoneRegex = /^05[0-9]-\d{7}$|^05[0-9]\d{7}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ""))) {
          return "מספר טלפון לא תקין (050-1234567 = 10 ספרות)";
        }
        break;
      case "subject":
        if (!value) return "בחר נושא";
        break;
      case "message":
        if (!value.trim()) return "הודעה נדרשת";
        if (value.trim().length < 10) {
          return "ההודעה חייבת להיות לפחות 10 תווים";
        }
        break;
    }
    return "";
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

  // Handle field blur (when leaving input)
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

  // Validate all fields on submit
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // // Handle submit
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     console.log("Form has errors");
  //     return;
  //   }

  //   console.log("Form is valid:", formData);
  // };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-8 bg-card rounded-lg border">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">צור קשר</h2>
        <div className="h-1 w-16 bg-primary rounded"></div>
      </div>

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
        <Select dir="rtl" value={formData.subject} onValueChange={handleSelectChange}>
          <SelectTrigger className={`w-full border-2 transition ${
            touched.subject && errors.subject
              ? "border-destructive"
              : "border-border hover:border-primary focus:border-primary"
          }`}>
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
        className="w-full md:w-1/3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded transition cursor-pointer"
      >
        שלח הודעה
      </Button>
    </form>
  );
}