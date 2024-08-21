import axios from "axios";
import styles from "./css/DetailModal.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../type/product";

export default function DetailProductModal ({product , hideModal} : {product:Product|undefined|null , hideModal: () => void}) {
    
    const navi = useNavigate();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageArea , setImageArea] = useState(false);

    useEffect(() => {
        if(product){
            axios.get(`http://localhost:8013/banju/api/board/admin/product/${product.productNo}`, {
                responseType: 'blob',
              })
              .then((response) => {
                const url = URL.createObjectURL(response.data);
                setImageArea(true);
                setImageUrl(url);
              })
              .catch((error) => {
                console.error('이미지 로드 중 오류 발생:', error);
                setImageUrl(`${process.env.PUBLIC_URL}/images/not-found.png`);
              });
        }
      }, []);

      return(
        <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    {product && (<>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>상품 상세 보기</h2>
                            <button className={styles.closeButton} onClick={hideModal}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                            <h2>{product.title}</h2>
                            {
                                imageArea && (<img
                                    src={imageUrl || `${process.env.PUBLIC_URL}/images/upload.png`}
                                    alt="상품 이미지"
                                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                                    onError={(e) => {
                                    e.currentTarget.src = `${process.env.PUBLIC_URL}/images/upload.png`; // 이미지 로드 실패 시 대체 이미지
                                    }}
                                />)
                            }
                            <div>
                                <th>고유 ID</th>
                                <td>{product.productNo}</td>
                            </div>
                            <div>
                                <th>포인트</th>
                                <td>{product.price}</td>
                            </div>
                            <div>
                                <th>남은 재고</th>
                                <td>{product.qty}</td>
                            </div>
                            <div>
                                <th>내용</th>
                                <td>{product.content}</td>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                                <button className={styles.cancelButton} onClick={hideModal}>취소</button>
                                <button className={styles.confirmButton} onClick={() => navi('../productBoardUpdatePage')}>수정</button>
                        </div>
                    </>)}
                </div>
        </div> 
    )
}