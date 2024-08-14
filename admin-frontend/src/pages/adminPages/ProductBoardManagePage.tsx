import { useNavigate } from 'react-router-dom';
import styles from './ProductBoardManagePage.module.css';

export default function ProductBoardManagePage() {
    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 상품 관리</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="상품 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.addProductButton} onClick={() => navi('/adminPage/productBoardInsertPage')}>
                <button className={styles.addButton}>포인트 상품 추가</button>
            </div>
            <div className={styles.productGrid}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={styles.productCard}>
                        <img
                            src="https://via.placeholder.com/150"
                            alt="상품 이미지"
                            className={styles.productImage}
                        />
                        <div className={styles.productDetails}>
                            <div className={styles.productPoints}>
                                <span>P</span>
                                <span>7500</span>
                            </div>
                            <div className={styles.productLikes}>
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="좋아요 아이콘"
                                    className={styles.icon}
                                />
                                <span>123</span>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.footerItem}>
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="재고 아이콘"
                                    className={styles.icon}
                                />
                                <span>12</span>
                            </div>
                            <div className={styles.footerItem}>
                                <img
                                    src="https://via.placeholder.com/20"
                                    alt="날짜 아이콘"
                                    className={styles.icon}
                                />
                                <span>2024.12.12</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}