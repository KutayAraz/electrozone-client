import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import { Backdrop } from "./Backdrop";
import { ModalOverlay } from "./ModalOverlay";
import { ModalPlacement } from "./placements";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  placement?: ModalPlacement;
  className?: string;
  autoCloseDuration?: number;
  transitionDuration?: number;
  children: React.ReactNode;
}

export const CustomModal = ({
  isOpen,
  onClose,
  ariaLabel,
  placement = "center",
  className,
  autoCloseDuration,
  transitionDuration = 300,
  children,
}: CustomModalProps) => {
  const location = useLocation();

  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Lets the effects below leave `onClose` out of their dependencies without
  // capturing a stale callback.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      return;
    }
    onCloseRef.current();
  }, [location.key]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();

        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab inside the dialog - `aria-modal` on its own does not do this.
      // `inert` subtrees still match the selector but cannot take focus, so a
      // modal that hides content behind `inert` has to have them filtered out.
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.closest("[inert]"));

      if (focusable.length === 0) {
        event.preventDefault();

        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Focus can end up outside the panel entirely - blurred when its subtree
      // went inert, for one. Pull it back rather than letting Tab escape.
      if (!panelRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    return () => {
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !autoCloseDuration) return;

    const timer = setTimeout(() => onCloseRef.current(), autoCloseDuration);

    return () => clearTimeout(timer);
  }, [isOpen, autoCloseDuration]);

  return createPortal(
    <>
      <Backdrop isOpen={isOpen} transitionDuration={transitionDuration} onClose={onClose} />
      <ModalOverlay
        isOpen={isOpen}
        panelRef={panelRef}
        placement={placement}
        transitionDuration={transitionDuration}
        className={className}
        ariaLabel={ariaLabel}
      >
        {children}
      </ModalOverlay>
    </>,
    document.body,
  );
};
