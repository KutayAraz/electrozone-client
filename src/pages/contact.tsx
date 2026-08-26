import { PageHelmet } from "@/components/seo/PageHelmet";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { useSendMessage } from "@/features/contact/hooks/useSendMessage";

export const ContactPage = () => {
  const { sendMessage, isSending } = useSendMessage();

  return (
    <>
      <PageHelmet
        title="Contact Us | Electrozone"
        description="Have questions or suggestions? Send an e-mail."
      />
      <div className="page-spacing">
        <ContactForm onSendMessage={sendMessage} isSending={isSending} />
      </div>
    </>
  );
};
