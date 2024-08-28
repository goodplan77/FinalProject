import { useNavigate } from "react-router-dom";
import styles from './styles/InsertBoard.module.css';
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { Board, initialBoard } from "../../type/board";
import useInput from "../../hook/useInput";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function InsertBoard() {
    const navi = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newBoard, handleInputChange] = useInput<Board>(initialBoard);
    const [filePreviewMap, setFilePreviewMap] = useState<Map<File, string>>(new Map());
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [currentBoardCode, setCurrentBoardCode] = useState<string>('C');
    let loginUser = useSelector((state:RootState)=>state.user);

    const handleBoardCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentBoardCode(e.target.value);
        handleInputChange(e);
    };

    const insertBoard = (e: FormEvent) => {
        e.preventDefault();
          
        const formData = new FormData();
        formData.append("board", JSON.stringify({
            ...newBoard,
            userNo : loginUser.userNo
        }));

        selectedFiles.forEach((file) => {
            formData.append(`files`, file);
        });

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
    };

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = selectedFiles.length + newFiles.length;

            if (totalFiles > 5) {
                alert("최대 5장의 사진만 업로드할 수 있습니다.");
            } else {
                setSelectedFiles((prevFiles) => {
                    const updatedFiles = [...prevFiles, ...newFiles];

                    // 미리보기 URL 생성
                    const newFilePreviewMap = new Map(filePreviewMap);
                    newFiles.forEach((file) => {
                        const url = URL.createObjectURL(file);
                        newFilePreviewMap.set(file, url);
                    });
                    setFilePreviewMap(newFilePreviewMap);

                    return updatedFiles;
                });
            }
        }
    };

    const handleImageClick = (file: File) => {
        setFilePreviewMap((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.delete(file);
            return newMap;
        });

        setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    return (
        <>


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
                                {Array.from(filePreviewMap.entries()).map(([file, url]) => (
                                    <img
                                        key={url}
                                        src={url}
                                        alt={`preview`}
                                        className={styles.previewImage}
                                        onClick={() => handleImageClick(file)} // 이미지 클릭 시 핸들러 호출
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {currentBoardCode !== 'C' && (
                        <>
                            <div className={styles.picture}>
                                <button type="button" onClick={handleFileClick} className={styles.customFileButton}>
                                    <p className={styles.plus}>+</p>
                                    <p>{selectedFiles.length} / 5</p>
                                </button>
                                <input className={styles.insertP} type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} required/>
                            </div>
                            <div className={styles.previewContainer}>
                                {Array.from(filePreviewMap.entries()).map(([file, url]) => (
                                    <img
                                        key={url}
                                        src={url}
                                        alt={`preview`}
                                        className={styles.previewImage}
                                        onClick={() => handleImageClick(file)} // 이미지 클릭 시 핸들러 호출
                                    />
                                ))}
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

            
        </>
    );
}
