import { CSSProperties, RefObject } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./custom-modal.module.css";
import { layerAlignment, ModalPlacement } from "./placements";

interface ModalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  panelRef: RefObject<HTMLDivElement>;
  placement: ModalPlacement;
  transitionDuration: number;
  className?: string;
  ariaLabel: string;
}

export const ModalOverlay = ({
  children,
  isOpen,
  panelRef,
  placement,
  transitionDuration,
  className,
  ariaLabel,
}: ModalOverlayProps) => (
  <div className={`${styles.layer} ${layerAlignment[placement]}`}>
    <CSSTransition
      in={isOpen}
      timeout={transitionDuration}
      classNames={{
        enter: styles[`enter-${placement}`],
        enterActive: styles[`enter-active-${placement}`],
        exit: styles[`exit-${placement}`],
        exitActive: styles[`exit-active-${placement}`],
      }}
      unmountOnExit
      nodeRef={panelRef}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        style={{ "--modal-duration": `${transitionDuration}ms` } as CSSProperties}
        className={`${styles.panel} ${className ?? ""}`}
      >
        {children}
      </div>
    </CSSTransition>
  </div>
);
