import { useEffect } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { BackdropProps, CustomizableModalProps } from "./models";
import styles from "./CustomModal.module.css";
import { useLocation } from "react-router-dom";

export function Backdrop({ onClose }: BackdropProps) {
  return <div className={styles.backdrop} onClick={onClose} />;
}

export const CustomizableModal = ({
  onClose,
  isOpen,
  children,
  width,
  height,
  top,
  bottom,
  left,
  right,
  direction,
  autoCloseDuration,
  transitionType,
  transitionDuration = 300,
}: CustomizableModalProps) => {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location]);
  
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
        width={width}
        height={height}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
        direction={direction}
        transitionDuration={transitionDuration}
        transitionType={transitionType}
      >
        {children}
      </ModalOverlay>
    </>
  );
};

export default CustomizableModal;
