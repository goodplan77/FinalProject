import { ChangeEvent, FormEvent, useState } from "react";
import { Dog, initDog } from "../../type/dog";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import styles from './styles/InsertDog.module.css';
import { useNavigate } from "react-router-dom";

export default function InsertDog() {

    let [imgDog, setImgDog] = useState<File>();
    let [dog, setDog] = useState<Dog>(initDog);

    const navi = useNavigate();

    let user = useSelector((state: RootState) => state.user);

    const handleInputChange = (e: ChangeEvent) => {

        let { name, value } = e.target as HTMLInputElement;

        setDog({
            ...dog,
            [name]: value
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let upfile = e.target.files[0];
            setImgDog(upfile);
        }
    };

    const setGender = (value: string) => {
        setDog({
            ...dog,
            gender: value
        })
    }

    const setMain = (value: string) => {
        setDog({
            ...dog,
            isMain: value
        })
    }

    const enrollDog = (e: FormEvent) => {

        let formData = new FormData();

        if (imgDog) {
            let upfile = imgDog as File;
            formData.append("upfile", upfile, upfile && upfile.name);
        }

        formData.append("userNo", JSON.stringify(user.userNo));
        formData.append("dog", JSON.stringify(dog));

        axios.post("http://localhost:8013/banju/user/insertDog", formData)
            .then(() => {
                alert('반려견 추가 작업이 완료 되었습니다.');
                navi('/mypage');
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer} style={{ backgroundImage: '/images/icon.png' }}>
                <div className={styles.iconContainer}>
                    <label htmlFor="upfile">
                        <img src="/images/pen.png" alt="사진 등록" className={styles.iconImg} />
                    </label>
                    <input
                        type="file"
                        className={styles.insertP}
                        id="upfile"
                        name="upfile"
                        style={{ display: 'none' }}
                        onChange={handleFileChange} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dogName">개이름 :</label>
                <input
                    type="text"
                    id="dogName"
                    name="dogName"
                    value={dog.dogName}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="breed">견종 :</label>
                <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={dog.breed}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="birthday">생일 :</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={dog.birthday}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="gender">성별 :</label>
                <button onClick={() => setGender('M')}>수컷</button>
                <button onClick={() => setGender('F')}>암컷</button>
            </div>

            <div className={styles.formGroup}>
                <label>대표 반려견 설정 :</label>
                <button onClick={() => { setMain('Y') }}>설정</button>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="note">메모 :</label>
                <textarea
                    id="note"
                    name="note"
                    value={dog.note}
                    onChange={handleInputChange}
                />
            </div>

            <button type="submit" onClick={enrollDog}>등록</button>
        </div>
    )

}