import { useNavigate } from 'react-router-dom';
import styles from './styles/ProductBoardManagePage.module.css';
import { useEffect, useState } from 'react';
import { initProductList, Product } from '../../../type/product';
import { selectAllProduct, selectOneProduct } from '../../../features/productSlice'
import axios from 'axios';
import DetailProductModal from '../../../components/DetailProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import DeleteProductModal from '../../../components/DeleteProductModal';

export default function ProductBoardManagePage() {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filterTerm, setFilterTerm] = useState(''); // 실제 검색에 사용될 필터 상태
    const [itemsPerPage] = useState(4); // 페이지당 항목 수

    const [productImgUrl, setProductImgUrl] = useState<string[]>([]);

    // 모달 상태 확인용 state 영역
    const [data, setData] = useState<Product | null>();
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);

    const filteredproducts = products.filteredProducts.filter(product =>
        (product.title || '').toLowerCase().includes(filterTerm.toLowerCase()) // 제목에 검색어 포함 여부
    );

    useEffect(() => {
        const fetchImagePath = async () => {
            try {
                const response = await axios.get("http://localhost:8013/banju/admin/board/ProductboardList");
                dispatch(selectAllProduct(response.data));

                const imageUrls = await Promise.all(
                    response.data.map(async (value: Product) => {
                        const imgResponse = await axios.get(`http://localhost:8013/banju/api/board/admin/product/${value.productNo}`);
                        return imgResponse.data; // 각 이미지 URL을 배열로 반환
                    })
                );

                setProductImgUrl(imageUrls); // 상태를 한 번에 업데이트

            } catch (error) {
                console.error('이미지 경로를 불러오는데 실패했습니다.', error);
            }
        };

        fetchImagePath();
    }, []);

    useEffect(() => {
        const fetchImagePath = async () => {
            try {
                const imageUrls = await Promise.all(
                    currentItems.map(async (value: Product) => {
                        const imgResponse = await axios.get(`http://localhost:8013/banju/api/board/admin/product/${value.productNo}`);
                        return imgResponse.data; // 각 이미지 URL을 배열로 반환
                    })
                );
                setProductImgUrl(imageUrls); // 상태를 한 번에 업데이트
            } catch (error) {
                console.error('이미지 경로를 불러오는데 실패했습니다.', error);
            }
        };

        fetchImagePath();
    },[currentPage]);

    // 1. 제목 검색 기능
    const handleSearch = () => {
        setFilterTerm(searchTerm); // 검색어를 실제 필터링에 사용될 상태로 설정
        setSearchTerm('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
            setSearchTerm('');
        }
    };

    // 2. 삭제 모달
    const setDeleteModal = (e:React.MouseEvent<HTMLButtonElement> , product:Product) => {
        e.stopPropagation();
        const oneProduct = dispatch(selectOneProduct(product));
        setData((oneProduct.payload));
        setShowDeleteModal(true);
    }

    const hideDeleteModal = () => {
        setShowDeleteModal(false);
    };

    // 3. 상세 보기 모달
    const setDetailModal = (e: React.MouseEvent<HTMLDivElement>, product: Product) => {
        e.stopPropagation();
        const oneProduct = dispatch(selectOneProduct(product));
        setData((oneProduct.payload));
        setShowDetailModal(true);
    };

    const hideDetailModal = () => {
        setShowDetailModal(false);
    };

    // 4. 페이지네이션 통합 데이터 확인용 기능
    const totalItems = products.filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.max(0, indexOfLastItem - itemsPerPage);
    const currentItems = filteredproducts.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalItems));

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    className={`${styles.page} ${currentPage === i ? styles.activePage : ''}`}
                    onClick={() => {
                        setCurrentPage(i);
                    }}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    //5. 상품 상태 확인용
    const productStatus = (type:string) => {
        switch(type){
            case 'Y': return  '⭕';
            case 'N': return  '❌';
            default : return '⁉'
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>포인트 상품 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="상품 이름 검색"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className={styles.searchButton} onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.ProductModifyArea}>
                <div className={styles.pagination}>
                    {renderPageNumbers()}
                </div>
                <div className={styles.addProductButton} >
                    <button className={styles.addButton} onClick={() => navi('/adminPage/productBoardInsertPage')}>포인트 상품 추가</button>
                </div>
            </div>
            <div className={styles.productGrid}>
                {currentItems.map((product, index) => {
                    return (
                        <div key={index} className={styles.productCard}
                            onClick={(e) => setDetailModal(e, product)}
                        >
                            <div className={styles.deleteButtonArea}>
                                <button className={styles.deleteButton} onClick={(e) =>setDeleteModal(e,product)}>X</button>
                            </div>
                            <img
                                src={`http://localhost:8013/banju${productImgUrl[index]}`}
                                alt="상품 이미지"
                                className={styles.productImage}
                            />
                            <div className={styles.productDetailsCotainer}>
                                <div className={styles.productDetails}>
                                    <div className={styles.productPoints}>
                                        <span>P</span>
                                        <span>{product.price}</span>
                                    </div>
                                    <div className={styles.productLikes}>
                                        ❤<span>{product.likes}</span>
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles.footerItem}>
                                        🎁<span>{product.qty}</span>
                                    </div>
                                    <div className={styles.footerItem}>
                                        <span>{productStatus(product.status)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {
                showDetailModal && <DetailProductModal product={data} hideModal={hideDetailModal}></DetailProductModal>
            }
            {
                showDeleteModal && <DeleteProductModal product={data} hideModal={hideDeleteModal}></DeleteProductModal>
            }
        </div>
    )
}