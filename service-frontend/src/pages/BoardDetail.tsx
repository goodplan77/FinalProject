import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from './css/BoardDetail.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectAllBoard } from "../features/boardSlice";
import { initialBoard } from "../type/board";

export default function BoardDetail() {

    const [board, setBoard] = useState(initialBoard);

    const { boardNo } = useParams();

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/board/boardDetail/${boardNo}`)
            .then((response) => {
                setBoard(response.data);
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    return (
        <>
            <ScrollToTop />
            <div>
                <div key={board.boardNo}>
                    <div className={styles.top}>
                        <div className={styles.profileImg}></div>
                        <p className={styles.nick}>닉네임</p>
                        <p className={styles.enrollDate}>{board.enrollDate}</p>
                        <div className={styles.boardCode}>
                            <p>
                                {board.boardCode == 'C' && '일반'
                                || board.boardCode == 'S' && '중고'
                                || board.boardCode == 'A' && '입양'
                                || board.boardCode == 'M' && '실종'}
                            </p>
                        </div>
                    </div>
                    <div className={styles.text}>
                        <p>{board.title}</p>
                        <p>{board.content}</p>
                    </div>
                </div>
            </div>


        </>
    )


}