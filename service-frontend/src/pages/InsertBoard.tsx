import { useNavigate } from "react-router-dom";
import styles from './css/InsertBoard.module.css';
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { Board, initialBoard } from "../type/board";
import useInput from "../hook/useInput";

export default function InsertBoard() {
    const navi = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소에 대한 ref 생성

    const [newBoard, handleInputChange] = useInput<Board>(initialBoard);

    const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 미리보기 URL을 저장할 상태

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 선택된 파일들을 저장할 상태

    const [currentBoardCode, setCurrentBoardCode] = useState<string>('C'); // 선택된 게시판 코드를 관리하는 상태

    const handleBoardCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBoardCode(e.target.value); // 선택된 게시판 코드를 상태로 저장
        handleInputChange(e); // 기존의 입력 핸들러도 호출
    };

    const insertBoard = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
         console.log(newBoard);
        // 텍스트 데이터를 FormData에 추가
        formData.append("board",JSON.stringify(newBoard));

        // 선택된 파일들을 FormData에 추가
        selectedFiles.forEach((file) => {
            formData.append(`files`, file);
        });

        console.log(formData);

        axios
            .post('http://localhost:8013/banju/board/insertBoard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response);
                navi(-1);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // "+" 버튼 클릭 시 숨겨진 파일 입력 요소를 클릭
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = selectedFiles.length + newFiles.length;

            if (totalFiles > 5) { // 최대 5장의 파일만 업로드 가능
                alert("최대 5장의 사진만 업로드할 수 있습니다.");
            } else {
                setSelectedFiles(prevFiles => {
                    const updatedFiles = [...prevFiles, ...newFiles];

                    // 미리보기 URL 생성
                    const newPreviewUrls = updatedFiles.map(file => URL.createObjectURL(file));
                    setPreviewUrls(newPreviewUrls);

                    return updatedFiles;
                });
            }
        }
    };

    return (
        <>
            <div className={styles.mainHeader}>
                <div className={styles.backButton} onClick={() => navi('/')}>
                    <img className={styles.back} src={`${process.env.PUBLIC_URL}/images/back.png`} alt="back" />
                </div>
                <div className={styles.projectName}>
                    <div className={styles.boardTitle}>
                        <p>새 게시글</p>
                    </div>
                </div>
            </div>

            <div className={styles.insertBoard}>
                <div className={styles.boardCate}>
                    <p>게시글 카테고리</p>
                </div>
                <form id="boardEnrollForm" onSubmit={insertBoard}>
                    <div className={styles.cates}>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="C" id="btn1" onChange={handleBoardCodeChange} defaultChecked />
                            <label htmlFor="btn1">일반</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="S" id="btn2" onChange={handleBoardCodeChange} />
                            <label htmlFor="btn2">중고</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="A" id="btn3" onChange={handleBoardCodeChange} />
                            <label htmlFor="btn3">입양</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="M" id="btn4" onChange={handleBoardCodeChange} />
                            <label htmlFor="btn4">실종</label>
                        </div>
                    </div>

                    <div className={styles.titleStroke}>
                        <div className={styles.titleBox}>
                            <input className={styles.title} type="text" name="title" placeholder="제목을 입력해주세요" onChange={handleInputChange} required />
                        </div>
                    </div>

                    {currentBoardCode === 'M' && (
                        <>
                            <div className={styles.contentStroke}>
                                <div className={styles.contentBox}>
                                    <textarea className={styles.content} name="content" placeholder="내용을 상세히 입력해주세요
                                    • (예시)
                                    • 견종
                                    • 이름
                                    • 털색
                                    • 성별
                                    • 특징
                                    • 실종장소
                                    • 실종날짜" onChange={handleInputChange} required />
                                </div>
                            </div>
                        </>
                    )}
                    
                    {currentBoardCode !== 'M' && (
                        <>
                            <div className={styles.contentStroke}>
                                <div className={styles.contentBox}>
                                    <textarea className={styles.content} name="content" placeholder="내용을 입력하세요" onChange={handleInputChange} required />
                                </div>
                            </div>
                        </>
                    )}

                    {currentBoardCode === 'C' && (
                        <>
                            <div className={styles.picture}>
                                <button type="button" onClick={handleFileClick} className={styles.customFileButton}>
                                    <p className={styles.plus}>+</p>
                                    <p>{selectedFiles.length} / 5</p>
                                </button>
                                <input className={styles.insertP} type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                            </div>
                            <div className={styles.previewContainer}>
                                {previewUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`preview ${index}`} className={styles.previewImage} />
                                ))}
                            </div>
                        </>
                    )}

                    {currentBoardCode !== 'C' && (
                        <>
                            <div className={styles.picture}>
                                <div>
                                    <button type="button" onClick={handleFileClick} className={styles.customFileButton}>
                                        <p className={styles.plus}>+</p>
                                        <p>{selectedFiles.length} / 5</p>
                                    </button>
                                    <input className={styles.insertP} type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} required />
                                </div>
                                <div className={styles.previewContainer}>
                                    {previewUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`preview ${index}`} className={styles.previewImage} style={{ width: "100px", height: "100px" }} />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.surely}>
                                <p>**해당 게시글은 사진첨부가 필수입니다**</p>
                            </div>
                        </>
                    )}

                    <div className={styles.choicies}>
                        <div className={styles.choice} onClick={() => navi(-1)}>
                            <p>취소하기</p>
                        </div>
                        <input type="submit" className={styles.choice} value="게시하기" />
                    </div>
                </form>
            </div>

            <div className={styles.mainNavi}>
                <div className={styles.naviHome} onClick={() => navi('/')}>
                    <img className={styles.home} src={`${process.env.PUBLIC_URL}/images/home.png`} alt="back" />
                </div>
                <div className={styles.naviHam}>
                    <img className={styles.ham} src={`${process.env.PUBLIC_URL}/images/ham.png`} alt="back" />
                </div>
                <div className={styles.naviChat}>
                    <img className={styles.chat} src={`${process.env.PUBLIC_URL}/images/message.png`} alt="back" />
                </div>
                <div className={styles.naviMy} onClick={() => navi('/mypage')}>
                    <img className={styles.my} src={`${process.env.PUBLIC_URL}/images/myPage.png`} alt="back" />
                </div>
            </div>
        </>
    )
}
