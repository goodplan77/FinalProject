import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/SearchPage.module.css';
import { SearchKeyword } from '../type/board';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectAllBoard } from '../features/boardSlice';
import { useEffect } from 'react';
import { RootState } from '../store/store';

export default function SearchPage() {
    const navi = useNavigate();
    const boards = useSelector((state: RootState) => state.boards);
    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState<SearchKeyword>({
        title: ''
    });

    const searchTitle = () => {
        axios.get(`http://localhost:8013/banju/board/searchTitle/${searchKeyword.title}`)
            .then((response) => {
                console.log(response);
                const boardData = response.data;

                if (boardData.length === 0) {
                    alert("검색하신 제목이 없습니다. 다시 검색해 주세요.");
                } else {
                    dispatch(selectAllBoard(boardData));
                }

                // 검색어 입력란 초기화
                setSearchKeyword({ title: '' });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword({
            ...searchKeyword,
            [e.target.name]: e.target.value
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchTitle();
        }
    };

    useEffect(() => {
        dispatch(selectAllBoard([]));
    }, [dispatch]);

    const handleClick = (boardNo: number) => {
        navi(`/boardDetail/${boardNo}`);
    };

    return (
        <>
            <div className={styles.searchContainer}>
                <div className={styles.searchGroup}>
                    <input
                        className={styles.searchInput}
                        placeholder="제목 검색"
                        name="title"
                        value={searchKeyword.title}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <div className={styles.searchIcon} onClick={searchTitle}></div>
                    <button className={styles.cancelButton} onClick={() => navi(-1)}>취소</button>
                </div>
            </div>
            {boards.map((board) => (
                <div key={board.boardNo}>
                    <div className={styles.classic}>
                        <div className={styles.classicContent} onClick={() => handleClick(board.boardNo)}>
                            <div className={styles.img}></div>
                            <div className={styles.upAndDown}>
                                <div className={styles.contentUp}>
                                    <div className={styles.contentTitle}>
                                        <p>{board.title}</p>
                                    </div>
                                    <div className={styles.upRight}>
                                        <div className={styles.contentInfo}>
                                            <img
                                                className={styles.view}
                                                src={`${process.env.PUBLIC_URL}/images/view.png`}
                                                alt="view"
                                            />
                                            <p className={styles.viewNo}>{board.views}</p>
                                        </div>
                                        <p className={styles.contentDate}>{board.enrollDate}</p>
                                    </div>
                                </div>

                                <div className={styles.contentDown}>
                                    <p className={styles.downNick}>{board.nickName}</p>
                                    <div className={styles.downRight}>
                                        <div className={styles.emptyPlace}></div>
                                        <div className={styles.contentLike}>
                                            <img
                                                className={styles.view}
                                                src={`${process.env.PUBLIC_URL}/images/like.png`}
                                                alt="like"
                                            />
                                            <p>{board.likes}</p>
                                            <img
                                                className={styles.view}
                                                src={`${process.env.PUBLIC_URL}/images/comment.png`}
                                                alt="comment"
                                            />
                                            {/* <p>{board.comment.length}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
