import { useNavigate } from 'react-router-dom';
import styles from './styles/ProductBoardInsertPage.module.css';
import { useState } from 'react';
import { initProduct } from '../../../type/product';
import axios from 'axios';

export default function ProductBoardInsertPage() {

    const navi = useNavigate();
    const [product , setProduct] = useState(initProduct);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setProduct({
            ...product,
            [name] : value
        })
    }

    function handleButtonClick() {
        const fileInput = document.getElementById('fileInput');
        if(fileInput){
            fileInput.click();
        }else {
            console.error("파일 입력 요소를 찾을 수 없습니다.");
        }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]; // 파일 입력 필드에서 첫 번째 파일을 가져옴
        if (file) {
          setSelectedImage(file); // 선택된 파일을 상태에 저장
      
          const reader = new FileReader(); // FileReader 객체 생성
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string); // 파일이 읽힌 후 미리보기 URL을 상태에 저장
          }
          reader.readAsDataURL(file); // 파일을 읽어서 Data URL로 변환
        }
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 방지
        const formData = new FormData();
        console.log(product);
        formData.append('productJson', JSON.stringify(product));
        if(selectedImage){
            formData.append('file' , selectedImage);
            axios.post("http://localhost:8013/banju/admin/board/insertProductBoard" , formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                }})
                .then((response) => {
                    alert(response.data.msg);
                    navi('../productBoardManagePage');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert("사진을 반드시 첨부해주세요.")
        }

      };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 교환 상품 정보 작성</h1>
            <form className={styles.formContent} onSubmit={handleSubmit}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>상품 이름</label>
                            <input
                                type="text"
                                placeholder="상품 이름을 입력하세요."
                                className={styles.textInput}
                                onChange={handleInputChange}
                                name = "title"
                                value={product.title}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>포인트 설정</label>
                            <input
                                type="number"
                                placeholder="포인트 값을 입력하세요."
                                className={styles.textInput}
                                onChange={handleInputChange}
                                name = "price"
                                value={product.price}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>초기 재고수 설정</label>
                            <input
                                type="number"
                                placeholder="상품 재고수를 입력하세요."
                                className={styles.textInput}
                                onChange={handleInputChange}
                                name = "qty"
                                value={product.qty}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>내용 작성</label>
                            <textarea
                                placeholder="상품에 대한 상세 정보를 입력하세요."
                                className={styles.textArea}
                                onChange={handleInputChange}
                                name = "content"
                                value={product.content}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                <div className={styles.uploadSection}>
                        <div className={styles.uploadIcon} onClick={handleButtonClick}>
                        <input type="file" id='fileInput' accept="image/*" style={{display : 'none'}} onChange={handleImageChange}></input>
                        {previewUrl ? (
                            <div>
                                <img src={previewUrl} alt="Selected Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            </div>
                        )
                        : (
                            <div style={{display : 'flex' , flexDirection : 'column'}}>
                                <svg width="80" height="80" viewBox="0 0 24 24"><path fill="#000000" d="M5 20v-2h14v2H5m7-14l5 5h-3v6h-4v-6H7l5-5z" /></svg>
                                <div className={styles.uploadText}>사진 파일 업로드</div>
                            </div>
                        )}
                        </div>
                    </div>
                   
                    <div className={styles.buttonGroup}>
                        <button className={styles.cancelButton} onClick={() => {
                        navi('../productBoardManagePage');
                        }}>취소</button>
                        <button className={styles.submitButton} type='submit'>게시</button>
                    </div>
                </div>
            </form>
        </div>
    )
}