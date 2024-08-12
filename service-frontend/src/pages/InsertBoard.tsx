import { useNavigate } from "react-router-dom";
import styles from './css/InsertBoard.module.css';
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { Board, initialBoard } from "../type/board";
import useInput from "../hook/useInput";

export default function InsertBoard() {
    const navi = useNavigate();

    const [newBoard, handleInputChange] = useInput<Board>(initialBoard);

    const insertBoard = (e: FormEvent) => {
        e.preventDefault(); // 제출되면 새로고침 되니까 새로고침을 막으려고하는 것이다.
        console.log(newBoard);
        axios
            .post('http://localhost:8013/banju/board/insertBoard', newBoard)
            .then((response) => {
                console.log(response);
                navi(-1); // 바로 이동하면 안된다. 여기에 작성을 해야한다.
            })
            .catch((error) => {
                console.log(error);
            });
    }


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
                            <input type="radio" className={styles.select} name="boardCode" value="C" id="btn1" onChange={handleInputChange} defaultChecked/>
                            <label htmlFor="btn1">일반</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="S" id="btn2" onChange={handleInputChange}/>
                            <label htmlFor="btn2">중고</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="A" id="btn3" onChange={handleInputChange}/>
                            <label htmlFor="btn3">입양</label>
                        </div>
                        <div className={styles.cate}>
                            <input type="radio" className={styles.select} name="boardCode" value="M" id="btn4" onChange={handleInputChange}/>
                            <label htmlFor="btn4">실종</label>
                        </div>
                    </div>

                    <div className={styles.titleStroke}>
                        <div className={styles.titleBox}>
                            <input className={styles.title} type="text" name="title" placeholder="제목을 입력해주세요" onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className={styles.contentStroke}>
                        <div className={styles.contentBox}>
                            <textarea className={styles.content} name="content" placeholder="내용을 입력하세요" onChange={handleInputChange} required/>
                        </div>
                    </div>

                    <div className={styles.picture}>
                        <p>+</p>
                    </div>

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