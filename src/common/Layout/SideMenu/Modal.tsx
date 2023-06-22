/* eslint-disable prettier/prettier */
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.css";
import { BackdropProps, ModalOverlayProps, ModalProps, State } from "./models";
import {ReactComponent as CloseButton } from "@assets/svg/close-button.svg"

function Backdrop({ onClose }: BackdropProps) {
  return <div className={styles.backdrop} onClick={onClose} />;
}

function ModalOverlay({ children, isOpen }: ModalOverlayProps) {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles["modal-enter"],
        enterActive: styles["modal-enter-active"],
        exit: styles["modal-exit"],
        exitActive: styles["modal-exit-active"],
      }}
      unmountOnExit
    >
      <div className={styles.modal}>{children}</div>
    </CSSTransition>
  );
}

function Modal({ onClose, children }: ModalProps) {
  const sideNavOpen = useSelector<State, boolean>(
    (state) => state.ui.sideNavOpen
  );
  return (
    <>
      {sideNavOpen && <Backdrop onClose={onClose} />}
      <ModalOverlay isOpen={sideNavOpen}>{children}</ModalOverlay>
      {sideNavOpen && (
        <button onClick={onClose} className={styles["close-button"]}>
          <CloseButton width={32} height={32}/>
        </button>
      )}
    </>
  );
}

export default Modal;
