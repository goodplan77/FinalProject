import { useNavigate } from 'react-router-dom';
import styles from './styles/EventBoardInsertPage.module.css';
import { useState } from 'react';
import { initialBoard } from '../../../type/board';
import axios from 'axios';

export default function EventBoardInsertPage() {

    const navi = useNavigate();
    const [board , setBoard] = useState(initialBoard);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
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
            setPreviewUrl(reader.result as string); // 파일이 읽힌 후 미리보기 URL을 상태에 저장
          }
          reader.readAsDataURL(file); // 파일을 읽어서 Data URL로 변환
        }
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 방지

        // 입력값 검증
        if (!board.title.trim()) {
            alert('제목을 입력하세요.');
            return;
        }

        if (!board.content.trim()) {
            alert('내용을 입력하세요.');
            return;
        }

        const formData = new FormData();

        const updatedBoard = {
            ...board,
            boardCode: 'E'
        };

        formData.append('boardJson', encodeURIComponent(JSON.stringify(updatedBoard)));
        if(selectedImage){
            formData.append('file' , selectedImage);
        }

        axios.post("http://localhost:8013/banju/admin/board/insertEventboard" , formData)
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
            <h1 className={styles.title}>이벤트 등록</h1>
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
                    <div className={styles.uploadSection} onClick={handleButtonClick}>
                        <input type="file" id='fileInput' accept="image/*" style={{display : 'none'}} onChange={handleImageChange}></input>
                        {previewUrl ? (
                            <div>
                                <img src={previewUrl} alt="Selected Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            </div>
                        )
                        : (
                            <div className={styles.initImage}>
                                <svg width="80" height="80" viewBox="0 0 24 24"><path fill="#000000" d="M5 20v-2h14v2H5m7-14l5 5h-3v6h-4v-6H7l5-5z" /></svg>
                                <div className={styles.uploadText}>사진 파일 업로드</div>
                            </div>
                        )}
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