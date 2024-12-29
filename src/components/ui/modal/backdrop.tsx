import { memo } from "react";

import styles from "./custom-modal.module.scss";

type BackdropProps = {
  onClose: () => void;
};

export const Backdrop = memo(({ onClose }: BackdropProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    />
  );
});

Backdrop.displayName = "Backdrop";
