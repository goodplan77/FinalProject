import { useNavigate } from 'react-router-dom';
import styles from './ProductBoardManagePage.module.css';
import { useEffect, useState } from 'react';
import { initProductList } from '../../type/product';
import axios from 'axios';

export default function ProductBoardManagePage() {
    const navi = useNavigate();
    const [products , setProducts] = useState(initProductList);

    useEffect(() => {
        axios.get("http://localhost:8013/banju/admin/board/ProductboardList")
            .then((response) => {
                console.log(response);
                setProducts(response.data);
            }).catch((response) => {
                console.log(response);
            })
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 상품 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="상품 검색"
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.addProductButton} >
                <button className={styles.addButton} onClick={() => navi('/adminPage/productBoardInsertPage')}>포인트 상품 추가</button>
            </div>
            <div className={styles.productGrid}>
                {products.map((product , index) => {
                    const imgPath = `http://localhost:8013/banju/api/board/admin/product/${product.productNo}`;
                    console.log(imgPath);
                    if(imgPath){
                        return(
                            <div key={index} className={styles.productCard}>
                            <img
                                src={imgPath}
                                alt="상품 이미지"
                                className={styles.productImage}
                            />
                            <div className={styles.productDetails}>
                                <div className={styles.productPoints}>
                                    <span>P</span>
                                    <span>{product.price}</span>
                                </div>
                                <div className={styles.productLikes}>
                                    <img
                                        src="https://via.placeholder.com/20"
                                        alt="좋아요 아이콘"
                                        className={styles.icon}
                                    />
                                    <span>{product.likes}</span>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.footerItem}>
                                    <img
                                        src="https://via.placeholder.com/20"
                                        alt="재고 아이콘"
                                        className={styles.icon}
                                    />
                                    <span>{product.qty}</span>
                                </div>
                                <div className={styles.footerItem}>
                                    <img
                                        src="https://via.placeholder.com/20"
                                        alt="날짜 아이콘"
                                        className={styles.icon}
                                    />
                                    <span>????</span>
                                </div>
                            </div>
                        </div>
                        )
                    } else {
                        return (
                            <>
                            </>
                        )
                    }
                    
                })}
            </div>
        </div>
    )
}