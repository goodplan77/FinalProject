import { useNavigate } from "react-router-dom";
import styles from './css/InsertBoard.module.css';

export default function InsertBoard() {
    const navi = useNavigate();

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
                <div className={styles.cates}>
                    <div className={styles.cate}>
                        <p>일반</p>
                    </div>
                    <div className={styles.cate}>
                        <p>중고</p>
                    </div>
                    <div className={styles.cate}>
                        <p>입양</p>
                    </div>
                    <div className={styles.cate}>
                        <p>실종</p>
                    </div>
                </div>

                <div className={styles.titleStroke}>
                    <div className={styles.titleBox}>
                        <input className={styles.title} type="text" placeholder="제목을 입력해주세요" />
                    </div>
                </div>
                <div className={styles.contentStroke}>
                    <div className={styles.contentBox}>
                        <textarea className={styles.content} placeholder="내용을 입력하세요" />
                    </div>
                </div>

                <div className={styles.picture}>
                    <p>+</p>
                </div>

                <div className={styles.choicies}>
                    <div className={styles.choice}>
                        <p>취소하기</p>
                    </div>
                    <div className={styles.choice}>
                        <p>게시하기</p>
                    </div>
                </div>



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