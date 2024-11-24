import styles from "./CustomModal.module.scss";

type BackdropProps = {
    onClose: () => void;
}

export const Backdrop = ({ onClose }: BackdropProps) => {
    return <div className={styles.backdrop} onClick={onClose} />;
}