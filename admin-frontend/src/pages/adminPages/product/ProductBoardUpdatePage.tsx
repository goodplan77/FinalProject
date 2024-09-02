import { useNavigate } from 'react-router-dom';
import styles from './styles/ProductBoardInsertPage.module.css';
import { useEffect, useState } from 'react';
import { initProduct, Product } from '../../../type/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';

export default function ProductBoardUpdatePage() {

    // state, navi , slice 관리 영역
    const navi = useNavigate();
    const cacheProduct = useSelector((state: RootState) => state.products);
    const [product , setProduct] = useState(cacheProduct.oneProduct);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // 입력값 제어 영역
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setProduct({
            ...product,
            [name] : value
        })
    };

    // 초기 이미지 불러오기 영역 useEffect
    useEffect(() => {
        axios.get(`http://localhost:8013/banju/api/board/admin/product/${product.productNo}`)
        .then((response) => {
            setImageUrl(response.data);
        })
        .catch((error) => {
          console.error('이미지 로드 중 오류 발생:', error);
          setImageUrl(`${process.env.PUBLIC_URL}/images/not-found.png`);
        });
      }, []);

    // 파일 입력 버튼 영역 (파일 입력 버튼 역할)
    function handleButtonClick() {
        const fileInput = document.getElementById('fileInput');
        if(fileInput){
            fileInput.click();
        }else {
            console.error("파일 입력 요소를 찾을 수 없습니다.");
        }
    }

    // 로컬에서 가져온 파일을 화면에 출력하기 위한 영역
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]; // 파일 입력 필드에서 첫 번째 파일을 가져옴
        const maxLength = 100; // 파일 이름의 최대 길이 제한

        if (file) {

            if (file.name.length > maxLength) {
                alert(`파일 이름이 너무 깁니다. ${maxLength}자 이하로 줄여주세요.`);
                return;
            }

          setSelectedImage(file); // 선택된 파일을 상태에 저장
      
          const reader = new FileReader(); // FileReader 객체 생성
          reader.onloadend = () => {
            setImageUrl(reader.result as string); // 파일이 읽힌 후 미리보기 URL을 상태에 저장
          }
          reader.readAsDataURL(file); // 파일을 읽어서 Data URL로 변환
        }
      }

      // 데이터 입력 요청 영역
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 방지
        const formData = new FormData();
        formData.append('productJson', encodeURIComponent(JSON.stringify(product)));
        if(selectedImage){
            formData.append('file' , selectedImage);
            axios.post("http://localhost:8013/banju/admin/board/updateProduct" , formData)
                .then((response) => {
                    alert(response.data.msg);
                    navi('../productBoardManagePage');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else if (window.confirm('업로드된 파일이 없습니다. 그대로 진행 하시겠습니까?')) {
            axios.post("http://localhost:8013/banju/admin/board/updateProduct" , formData)
                .then((response) => {
                    alert(response.data.msg);
                    navi('../productBoardManagePage');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
      };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 교환 상품 정보 수정</h1>
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
                                maxLength={100}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>포인트 설정</label>
                            <input
                                type="text"
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
                                type="text"
                                placeholder="초기 재고 값을 입력하세요."
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
                                maxLength={1000}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadIcon} onClick={handleButtonClick}>
                        <input type="file" id='fileInput' accept="image/*" style={{display : 'none'}} onChange={handleImageChange}></input>
                        <img
                                src={`http://localhost:8013/banju${imageUrl}` || `${process.env.PUBLIC_URL}/images/upload.png`}
                                alt="게시글 이미지"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                                onError={(e) => {
                                e.currentTarget.src = `${process.env.PUBLIC_URL}/images/upload.png`; // 이미지 로드 실패 시 대체 이미지
                                }}
                            />
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