import axios from "axios";
import { Product } from "../type/product"
import styles from "./css/DeleteModal.module.css"

export default function DeleteProductModal({ product, hideModal }: { product: Product | undefined | null; hideModal: () => void }) {

    const deleteProduct = () => {
        axios.post("http://localhost:8013/banju/admin/board/deleteProduct", product)
            .then((response) => {
                alert(response.data.msg);
                hideModal();
            }).catch((error) => {
                alert(error.response.data.msg);
                hideModal();
            })
    }

    return (
        <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>상품 삭제</h2>
                <button className={styles.closeButton} onClick={hideModal}>X</button>
            </div>
            {
                product && (
                    <>
                         <div className={styles.modalBody}>
                            <div key={product.productNo} className={styles.boardItem}>
                                <div>NO : {product.productNo}</div>
                                <div>제목 : {product.title}</div>
                            </div>
                            <h3>해당 상품을 비 활성화 처리 하시겠습니까?</h3>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                            <button className={styles.confirmButton} onClick={deleteProduct}>비활성화</button>
                        </div>
                    </>
                )
            }
        </div>
    </div>
    )
}