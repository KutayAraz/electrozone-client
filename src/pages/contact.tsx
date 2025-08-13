import { PageHelmet } from "@/components/seo/page-helmet";
import { ContactForm } from "@/features/contact/components/contact-form";
import { useSendMessage } from "@/features/contact/hooks/use-send-message";

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
