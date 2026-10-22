import { useState } from "react";

import { CustomModal } from "@/components/ui/custom-modal";

const SEEN_KEY = "electrozone:demo-notice-seen";

// Storage can be unavailable (private mode, blocked site data). Then the notice
// simply shows on every visit instead of breaking the page.
const hasSeenNotice = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return false;
  }
};

const rememberNoticeSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, "true");
  } catch {
    // Nothing to do: the notice shows again next time
  }
};

/** Tells first-time visitors that the store is a demo and nothing can be bought. */
export const DemoNoticeModal = () => {
  const [isOpen, setIsOpen] = useState(() => !hasSeenNotice());

  // Closing by any means (button, Escape, backdrop) counts as having seen it
  const close = () => {
    rememberNoticeSeen();
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={close}
      placement="center"
      className="mx-4 w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      ariaLabel="Demo store notice"
    >
      <div className="text-center">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Welcome to Electrozone</h2>

        <p className="mb-3 text-gray-600">
          This is a demo store built as a portfolio project. None of the products are for sale: no
          payment is taken and no orders are shipped.
        </p>

        <p className="mb-6 text-gray-600">
          Feel free to browse, add items to your cart and try the checkout.
        </p>

        <button
          onClick={close}
          className="w-full rounded-md bg-theme-blue px-6 py-3 font-medium text-white transition-colors hover:bg-theme-blue-light focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Got it, start browsing
        </button>
      </div>
    </CustomModal>
  );
};
