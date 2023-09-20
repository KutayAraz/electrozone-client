import { CSSTransition } from "react-transition-group";
import styles from "./CustomModal.module.css";
import { ModalOverlayProps, ModalStyleType } from "./models";

export function ModalOverlay({
  children,
  isOpen,
  width,
  top,
  bottom,
  left,
  right,
  height,
  direction,
  transitionDuration,
  transitionType,
}: ModalOverlayProps) {
  const modalStyle: ModalStyleType = {
    top,
    left,
    bottom,
    right,
    width,
    height,
  };

  if (direction === "center") {
    modalStyle.top = "50%";
    modalStyle.left = "50%";
    modalStyle.transform = "translate(-50%, -50%)";
  }

  const classNames = {
    enter: styles[`modal-enter-${direction}-${transitionType}`],
    enterActive: styles[`modal-enter-active-${direction}-${transitionType}`],
    exit: styles[`modal-exit-${direction}-${transitionType}`],
    exitActive: styles[`modal-exit-active-${direction}-${transitionType}`],
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={transitionDuration}
      classNames={classNames}
      unmountOnExit
    >
      <div className={styles.modal} style={modalStyle}>
        {children}
      </div>
    </CSSTransition>
  );
}
