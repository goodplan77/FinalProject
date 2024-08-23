import axios from 'axios';
import styles from './styles/EventBoardInsertPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';

export default function EventBoardUpdatePage() {

    const navi = useNavigate();
    const cacheBoard = useSelector((state: RootState) => state.boards);
    const [board , setBoard] = useState(cacheBoard.oneBoard);

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/api/board/admin/board/${board.boardCode}/${board.boardNo}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setImageUrl(url);
        })
        .catch((error) => {
          console.error('이미지 로드 중 오류 발생:', error);
          setImageUrl(`${process.env.PUBLIC_URL}/images/not-found.png`);
        });
      }, []);
    
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let {name , value} = e.target;
        setBoard({
            ...board,
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
            setImageUrl(reader.result as string); // 파일이 읽힌 후 미리보기 URL을 상태에 저장
          }
          reader.readAsDataURL(file); // 파일을 읽어서 Data URL로 변환
        }
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 방지
        const formData = new FormData();
        
        const updatedBoard = {
            ...board,
            boardCode: 'E'
        };

        formData.append('boardJson', JSON.stringify(updatedBoard));
        if(selectedImage){
            formData.append('file' , selectedImage);
        }

        axios.post("http://localhost:8013/banju/admin/board/updateBoardFormData" , formData)
            .then((response) => {
                alert(response.data.msg);
                navi('../eventBoardManage');
            })
            .catch((error) => {
                console.log(error);
            })
      };

      return (
        <div className={styles.container}>
            <h1 className={styles.title}>이벤트글 수정</h1>
            <form className={styles.formContent} onSubmit={handleSubmit}>
                <div className={styles.leftSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>제목</label>
                            <input
                                type="text"
                                placeholder="제목을 입력하세요."
                                className={styles.textInput}
                                onChange={handleInputChange}
                                name = "title"
                                value={board.title}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label className={styles.inputLabel}>내용 작성</label>
                            <textarea
                                placeholder="내용을 입력하세요."
                                className={styles.textArea}
                                onChange={handleInputChange}
                                name = "content"
                                value={board.content}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadIcon} onClick={handleButtonClick}>
                        <input type="file" id='fileInput' accept="image/*" style={{display : 'none'}} onChange={handleImageChange}></input>
                        <img
                                src={imageUrl || `${process.env.PUBLIC_URL}/images/upload.png`}
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
                        navi('../eventBoardManage');
                        }}>취소</button>
                        <button className={styles.submitButton} type='submit'>게시</button>
                    </div>
                </div>
            </form>
        </div>
    )
}