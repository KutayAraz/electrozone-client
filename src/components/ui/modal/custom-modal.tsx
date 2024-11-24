import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Backdrop } from "./backdrop";
import { ModalOverlay } from "./modal-overlay";

type CustomModalProps = {
  widthClass: string;
  heightClass: string;
  topClass?: string;
  bottomClass?: string;
  leftClass?: string;
  rightClass?: string;
  direction: "top" | "bottom" | "left" | "right" | "center";
  autoCloseDuration?: number;
  transitionDuration?: number;
  transitionType: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CustomModal = ({
  onClose,
  isOpen,
  children,
  widthClass,
  heightClass,
  topClass,
  bottomClass,
  leftClass,
  rightClass,
  direction,
  autoCloseDuration,
  transitionType,
  transitionDuration = 300,
  className
}: CustomModalProps) => {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Attach the event listener
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    // Detach the event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);


  useEffect(() => {
    // Disable scrolling on the main page when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    let timer: ReturnType<typeof setTimeout>;
    if (isOpen && autoCloseDuration) {
      timer = setTimeout(onClose, autoCloseDuration);
    }
    return () => {
      // Re-enable scrolling when the component unmounts or when the modal closes
      document.body.style.overflow = "";
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, autoCloseDuration, onClose]);

  return (
    <>
      {isOpen && <Backdrop onClose={onClose} />}
      <ModalOverlay
        isOpen={isOpen}
        widthClass={widthClass}
        heightClass={heightClass}
        topClass={topClass}
        bottomClass={bottomClass}
        leftClass={leftClass}
        rightClass={rightClass}
        direction={direction}
        transitionDuration={transitionDuration}
        transitionType={transitionType}
        className={className}
      >
        {children}
      </ModalOverlay>
    </>
  );
};
