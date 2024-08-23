import styles from './styles/ClauseModal.module.css'

interface ModalProps {
    show: boolean;
    onClose: () => void;
    content: string;
}

export default function ClauseModal({ show, onClose, content }: ModalProps) {
    if (!show) return null;

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <div className={styles.modalBody}>
                        {content}
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.confirmButton} onClick={onClose}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}