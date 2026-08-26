import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ContactSchema, contactSchema } from "../schemas/contact-schema";

type ContactFormProps = {
  onSendMessage: (data: ContactSchema) => void;
  isSending: boolean;
};

export const ContactForm = ({ onSendMessage, isSending }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactSchema) => {
    onSendMessage(data);
    setValue("message", "");
  };

  const inputClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-theme-blue focus:border-theme-blue";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Contact Us</h2>
      <p className="mb-4">
        Any feedback or suggestions on the project would be greatly appreciated!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="hidden"
            {...register("access_key")}
            value={`${import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}`}
          />
          <label htmlFor="name" className="block text-sm">
            Name (Optional)
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm ">
            Email (Optional)
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className={inputClasses}
            placeholder="you@example.com"
          />
          {errors.email && <p className={errorMessageClasses}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm">
            Message<span aria-hidden="true">*</span>
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            className={inputClasses}
            placeholder="Your message..."
          />
          {errors.message && <p className={errorMessageClasses}>{errors.message.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            aria-label="Send Message"
            className={`${
              isSending ? "bg-gray-200" : "bg-theme-blue hover:bg-theme-purple"
            }  mb-2 max-w-[50%] rounded-lg px-10 py-2 font-[500] text-white`}
            disabled={isSending}
          >
            {isSending ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};
