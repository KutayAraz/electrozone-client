import styles from "./custom-modal.module.scss";

type BackdropProps = {
  onClose: () => void;
};

export const Backdrop = ({ onClose }: BackdropProps) => {
  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    />
  );
};
