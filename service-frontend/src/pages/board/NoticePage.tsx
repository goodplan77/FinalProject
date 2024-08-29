import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import axios from "axios";
import { selectAllBoard } from "../../features/boardSlice";
import styles from './styles/PetInfoPage.module.css'

export default function NoticePage() {

    const navi = useNavigate();

    const dispatch = useDispatch();

    const boards = useSelector((state: RootState) => state.boards);

    const handleClick = (boardNo: number) => {
        navi(`/boardDetail/${boardNo}`);
    };

    useEffect(() => {
        axios.get("http://localhost:8013/banju/board/noticePage")
            .then((response) => {
                console.log(response);
                dispatch(selectAllBoard(response.data));
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    return (
        <>
            {
                boards.map((board) => {
                    return (
                        <div key={board.boardNo}>
                            {/* 보드 카테고리바 아래에 보드 리스트입니다. */}
                            <div className={styles.classic}>
                                <div className={styles.classicContent} onClick={() => handleClick(board.boardNo)}>
                                    <div className={styles.upAndDown}>
                                        <div className={styles.contentUp}>
                                            <div className={styles.contentTitle}>
                                                <p>{board.title}</p>
                                            </div>
                                            <div className={styles.contentE}></div>
                                            <div className={styles.upRight}>
                                                <div className={styles.contentInfo}>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                                    <p className={styles.viewNo}>{board.views}</p>
                                                </div>
                                                <p className={styles.contentDate}>{board.enrollDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}