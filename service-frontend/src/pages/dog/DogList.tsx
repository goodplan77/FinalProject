import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Dog } from "../../type/dog";
import styles from './styles/DogList.module.css';

export default function DogList() {
    let user = useSelector((state: RootState) => state.user);
    let [dogs, setDogs] = useState<Dog[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8013/banju/user/selectDogs/${user.userNo}`)
            .then(res => {
                setDogs(res.data);
            });
    }, [user.userNo]);

    // 월-일 형식으로 변환하는 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1 필요)
        const day = String(date.getDate()).padStart(2, '0'); // 일
        return `${month}-${day}`;
    }

    return (
        <table className={styles.dogListTable}>
            <thead>
                <tr className={styles.headerItem}>
                    <th>대표</th>
                    <th>이름</th>
                    <th>생일</th>
                    <th>견종</th>
                    <th>성별</th>
                    <th>메모</th>
                </tr>
            </thead>
            <tbody>
                {
                    dogs.map((dog: Dog) => {
                        return (
                            <tr className={styles.dataItem} key={dog.dogNo}>
                                <td className={`${styles.categoryData} ${styles.isMain}`}>{dog.isMain}</td>
                                <td className={`${styles.categoryDataTitle} ${styles.dogName}`}>{dog.dogName}</td>
                                <td className={`${styles.categoryData} ${styles.birthday}`}>{formatDate(dog.birthday)}</td>
                                <td className={`${styles.categoryData} ${styles.breed}`}>{dog.breed}</td>
                                <td className={`${styles.categoryData} ${styles.gender}`}>{dog.gender}</td>
                                <td className={`${styles.categoryData} ${styles.note}`}>{dog.note}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}