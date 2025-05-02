import { ContactForm } from "@/features/contact/components/contact-form";
import { useSendMessage } from "@/features/contact/hooks/use-send-message";

export const ContactPage = () => {
  const { sendMessage, isSending } = useSendMessage();

  return (
    <div className="page-spacing">
      <ContactForm onSendMessage={sendMessage} isSending={isSending} />
    </div>
  );
};
