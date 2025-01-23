import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./custom-modal.module.scss";

interface ModalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  widthClass: string;
  heightClass: string;
  topClass?: string;
  bottomClass?: string;
  leftClass?: string;
  rightClass?: string;
  direction: string;
  transitionDuration: number;
  transitionType: string;
  className?: string;
  role?: string;
  "aria-modal"?: string;
  "aria-label"?: string;
  tabIndex?: number;
}

export const ModalOverlay = ({
  children,
  isOpen,
  widthClass = "",
  topClass = "",
  bottomClass = "",
  leftClass = "",
  rightClass = "",
  heightClass = "",
  direction,
  transitionDuration,
  transitionType,
  className,
}: ModalOverlayProps) => {
  const nodeRef = useRef(null);

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
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className={` 
          ${styles.modal} 
          ${widthClass} 
          ${topClass} 
          ${bottomClass} 
          ${leftClass} 
          ${rightClass} 
          ${heightClass}
          ${className}
        `}
      >
        {children}
      </div>
    </CSSTransition>
  );
};
