import { useLocation, useNavigate } from "react-router-dom";
import styles from './styles/AdoptList.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectAllBoard } from "../../features/boardSlice";
import { Board } from "../../type/board";

export default function AdoptList() {
    const navi = useNavigate();

    const missings = useSelector((state: RootState) => state.boards);

    const boards = useSelector((state: RootState) => state.boards);

    const [showModal, setShowModal] = useState(false);

    const [imageUrls , setImageUrls] = useState<string[]>([]);

    const dispatch = useDispatch();

    const adopts = useSelector((state: RootState) => state.boards);

    useEffect(() => {
        const fetchBoardList = async () => {
            try{
                const response = await axios.get("http://localhost:8013/banju/board/adoptList")
                console.log(response.data);
                dispatch(selectAllBoard(response.data));

                if (response.data) {
                    const imageUrls = await Promise.all(
                        response.data.map(async (value: Board) => {
                            return axios.get(`http://localhost:8013/banju/api/board/A/${value.boardNo}`)
                                .then((response) => {
                                    return response.data.imageList[0] || ''; // 첫 번째 이미지 URL 또는 빈 문자열 반환
                                })
                                .catch((error) => {
                                    console.log(error);
                                    return ''; // 에러 발생 시 빈 문자열 반환
                                });
                        })
                    );
                    setImageUrls(imageUrls);
                }
 
            } catch (error) {
                console.error('에러가 발생했습니다.', error);
            }
        }
       
        fetchBoardList();
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const sortByLikes = () => {
        // 좋아요 순 정렬
        dispatch(selectAllBoard([...boards].sort((a, b) => b.likes - a.likes)));
        toggleModal();
    };

    const sortByViews = () => {
        // 조회수 순 정렬
        dispatch(selectAllBoard([...boards].sort((a, b) => b.views - a.views)));
        toggleModal();
    };

    const sortByOldest = () => {
        // 오래된 순 정렬
        dispatch(selectAllBoard([...boards].sort((a, b) => new Date(a.enrollDate).getTime() - new Date(b.enrollDate).getTime())));
        toggleModal();
    };

    const sortByNewest = () => {
        // 최신순 정렬
        dispatch(selectAllBoard([...boards].sort((a, b) => new Date(b.enrollDate).getTime() - new Date(a.enrollDate).getTime())));
        toggleModal();
    };
    return (
        <>
            <div className={styles.categorys}>
                <div className={styles.cateClassic} onClick={() => navi('/BoardList')}>
                    <p>일반</p>
                </div>
                <div className={styles.cateUsed} onClick={() => navi('/usedList')}>
                    <p>중고</p>
                </div>
                <div className={styles.cateBuy} onClick={() => navi('/adoptList')}>
                    <p>입양</p>
                </div>
                <div className={styles.cateLost} onClick={() => navi('/missingList')}>
                    <p>실종</p>
                </div>
                <div className={styles.cateLine} onClick={toggleModal}>
                    <p>... </p>
                </div>
            </div>

            {
                adopts.map((board, index) => {
                    return (
                        <div key={board.boardNo}>

                            <div className={styles.used}>
                                <div className={styles.usedContent} onClick={() => navi('/BoardDetail/' + board.boardNo)}>
                                <img className={styles.img} src={imageUrls[index] ? `http://localhost:8013/banju${imageUrls[index]}` : `${process.env.PUBLIC_URL}/images/logo.png`} alt ="view"></img>
                                    <div className={styles.upAndDown}>
                                        <div className={styles.contentUp}>
                                            <div className={styles.contentTitle}>
                                                <p>{board.title}</p>
                                            </div>
                                            <div className={styles.upRight}>
                                                <div className={styles.contentInfo}>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/view.png`} alt="view" />
                                                    <p className={styles.viewNo}>{board.views}</p>
                                                </div>
                                                <p className={styles.contentDate}>{board.enrollDate}</p>
                                            </div>
                                        </div>

                                        <div className={styles.contentDown}>
                                            <p className={styles.downNick}>{board.nickName}</p>
                                            <div className={styles.downRight}>

                                                <div className={styles.contentLike}>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/like.png`} alt="like" />
                                                    <p>{board.likes}</p>
                                                    <img className={styles.view} src={`${process.env.PUBLIC_URL}/images/comment.png`} alt="comment" />
                                                    <p>{board.comment?.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }




            <div className='plus' style={{
                backgroundColor: "#02CCFE",
                width: "70px",
                height: "70px",
                borderRadius: "35px",
                opacity: "50%",
                position: "fixed",
                bottom: "70px",
                right: "10px",
            }} onClick={() => navi('/insertBoard')}>
                <img className='plus-pen' src={`${process.env.PUBLIC_URL}/images/pen.png`} alt="글쓰기" style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    width: "50px",
                    height: "50px"
                }} />
            </div>


            {/* 정렬 모달 창 */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={toggleModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button onClick={sortByLikes}>인기순</button>
                        <button onClick={sortByViews}>조회수순</button>
                        <button onClick={sortByOldest}>오래된순</button>
                        <button onClick={sortByNewest}>최신순</button>
                    </div>
                </div>
            )}
        </>
    )
}