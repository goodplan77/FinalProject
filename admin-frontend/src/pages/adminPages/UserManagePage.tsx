import { useEffect, useState } from 'react';
import styles from './UserManagePage.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { User } from '../../type/User';

export default function UserManagePage() {

    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [checkedList , setChekcedList] = useState<User[]>([])

    function checkHandled (e:React.ChangeEvent<HTMLInputElement>) {
        setChecked(!checked);
    }

    function checklistconsole () {
        console.log("바보");
    }

    function checktest (e:React.ChangeEvent<HTMLInputElement>) {
        console.dir(e.target.parentNode);
    }


    const Users = useSelector((state: RootState) => state.boards);

    useEffect (() => {
        axios.get("http://localhost:8013/banju/admin/user/UserList")
        .then((response) => {
            console.log(response);
        }).catch((response) => {
            console.log(response);
        })
    },[])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원 관리 페이지</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="사용자 이름 검색"
                    className={styles.searchInput}
                />
            </div>
            <button className={styles.deleteButton} onClick={checklistconsole}>삭제</button>
            <div className={styles.memberList}>
                <div className={styles.memberListHeader}>
                    <input type="checkbox" 
                    className={styles.checkbox}
                    checked = {checked}
                    onChange={(e) => checkHandled(e)}
                    />
                    <span className={styles.headerItem}>ID</span>
                    <span className={styles.headerItem}>이메일</span>
                    <span className={styles.headerItem}>닉네임</span>
                    <span className={styles.headerItem}>가입일</span>
                    <span className={styles.headerItem}>활성화</span>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.memberRow} id = {`id`+index}>
                        <input type="checkbox" className={styles.checkbox0}
                        onChange={(e) => checktest(e)}
                        />
                        <span className={styles.memberId}>ID0001</span>
                        <span className={styles.memberEmail}>goodplan77@naver.com</span>
                        <span className={styles.memberNickname}>닉네임111</span>
                        <span className={styles.memberJoinDate}>2024.07.16</span>
                        <div className={styles.toggleContainer}>
                            <div className={styles.toggle}></div>
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <span className={styles.page}>1</span>
                <span className={styles.page}>2</span>
                <span className={styles.page}>3</span>
                <span className={styles.pageGap}>...</span>
                <span className={styles.page}>67</span>
                <span className={styles.page}>68</span>
            </div>
        </div>
    )
}