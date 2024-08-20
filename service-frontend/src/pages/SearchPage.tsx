import { useNavigate } from 'react-router-dom';
import styles from './css/SearchPage.module.css';

export default function SearchPage() {
    const navi = useNavigate();

    return (
        <>
            <div className={styles.searchContainer}>
                <div className={styles.searchGroup}>
                    <input className={styles.searchInput} placeholder="검색" />
                    <div className={styles.searchIcon}></div>
                    <button className={styles.cancelButton} onClick={() => navi(-1)}>취소</button>
                </div>
            </div>
        </>
    )
}