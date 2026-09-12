import { useState } from "react";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { ContactSchema } from "../schemas/contact-schema";

export const useSendMessage = () => {
  const dispatch = useAppDispatch();

  const [isSending, setIsSending] = useState<boolean>(false);

  const notifyFailure = () =>
    dispatch(
      displayNotification({
        type: NotificationType.ERROR,
        message: "Your message couldn't be sent. Please try again later.",
      }),
    );

  const sendMessage = async (data: ContactSchema) => {
    try {
      setIsSending(true);
      const result = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        notifyFailure();

        return false;
      }

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "Your message was sent successfully. Thank you!",
        }),
      );

      return true;
    } catch {
      notifyFailure();

      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
};
