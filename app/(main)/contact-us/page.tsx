import SectionHeader from "@/components/common/section-header";
import { HandshakeIcon } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";

export default function contactPage() {
  return (
    <section className="py-20" >
      <div className="wrapper">
        <SectionHeader
          title="צור קשר"
          icon={HandshakeIcon}
          description="נשמח לשמוע ממך! אם יש לך שאלות, הצעות או בקשות, אל תהסס לפנות אלינו באמצעות טופס יצירת הקשר שלנו או באמצעות פרטי ההתקשרות המופיעים למטה. צוות קטן תשתיות כאן כדי לסייע לך בכל שלב של הפרויקט שלך."
        />
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
