import { CSSProperties, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./custom-modal.module.css";

interface BackdropProps {
  isOpen: boolean;
  transitionDuration: number;
  onClose: () => void;
}

export const Backdrop = ({ isOpen, transitionDuration, onClose }: BackdropProps) => {
  const nodeRef = useRef<HTMLButtonElement>(null);

  return (
    <CSSTransition
      in={isOpen}
      timeout={transitionDuration}
      classNames={{
        enter: styles["backdrop-enter"],
        enterActive: styles["backdrop-enter-active"],
        exit: styles["backdrop-exit"],
        exitActive: styles["backdrop-exit-active"],
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <button
        ref={nodeRef}
        type="button"
        className={styles.backdrop}
        style={{ "--modal-duration": `${transitionDuration}ms` } as CSSProperties}
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
    </CSSTransition>
  );
};
