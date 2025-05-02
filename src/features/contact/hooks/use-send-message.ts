import { useState } from "react";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

import { ContactSchema } from "../schemas/contact-schema";

export const useSendMessage = () => {
  const dispatch = useAppDispatch();

  const [isSending, setIsSending] = useState<boolean>(false);

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

      if (result.ok) {
        dispatch(
          displayNotification({
            type: NotificationType.SUCCESS,
            message: "Your message was sent successfuly. Thank you!",
          }),
        );
      }
    } catch (error) {
      dispatch(
        displayNotification({
          type: NotificationType.ERROR,
          message: "Your message was sent successfuly. Thank you!",
        }),
      );
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
};
