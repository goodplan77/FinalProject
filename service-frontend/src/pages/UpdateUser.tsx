import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useInput from "../hook/useInput";
import { initUser, User } from "../type/user";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import AddressModal from "../components/AddressModal";
import { closeModal, openModal } from "../features/modalSlice";
import styles from './css/UpdateUser.module.css';
import ReactModal from "react-modal";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function UpdateUserPage() {

    let {user} = useSelector((state:RootState)=>state);

    const dispatch = useDispatch();
    const navi = useNavigate();

    const [updateUser, setUpdateUser] = useState<User>(user);

    const setUserChange = (e:ChangeEvent) => {

        let {name, value} = e.target as HTMLInputElement;
        
        setUpdateUser({
            ...updateUser,
            [name] : value
        });
    }

    const [inputState, setInputState] = useState(false);

    const [newAddress, setNewAddress] = useState({
        postCode : '',
        mainAddress : '',
        detailAddress : ''
    });

    const [modal, setModal] = useState(false);
    // 우편번호 찾기 모달 
    const openModal = ()=>{
        setInputState(true)
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    };

    const handleAddress = (data: any) => {

        console.log(data);
        
        const newAddress = {
            postCode : data.zonecode,
            mainAddress:data.address,
            detailAddress : ''
        }

        setNewAddress(newAddress);

        closeModal();
    };


    const update = ()=>{
        console.log(updateUser);
        axios.patch("http://localhost:8013/banju/user/updateUser",updateUser)
                    .then(res=>{
                        console.log(res);
                    })
    }

    return(
        <>
        <div className={styles.container}>
            <label htmlFor="nickName">닉네임 : </label>
            <input 
                type="text"
                id="nickName"
                name="nickName"
                value={updateUser.nickName}
                onChange={setUserChange}
            />

            <label htmlFor="phone">휴대폰 번호 : </label>
            <input 
                type="text"
                id="phone"
                name="phone"
                value={updateUser.phone}
                onChange={setUserChange}
            />

            { !inputState && 
                <>
                    <label htmlFor="address">주소 : </label>
                    <input 
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        readOnly
                    />
                    <button type="button" className={styles.button} onClick={openModal}>
                        검색
                    </button>

                </>
            }
            
            { inputState &&
                <>
                    <label htmlFor='newAddress' className={styles.label}>주소</label>
                    <div className={styles.address_container}>
                        <div className={styles.postCode_container}>
                            <input 
                                type="text"
                                id='postCode'
                                name='postCode'
                                value={newAddress.postCode}
                                placeholder='우편번호'
                                className={styles.postCode}
                            />
                        </div>
                        <input 
                            type="text"
                            id='mainAddress'
                            name='mainAddress'
                            value={newAddress.mainAddress}                    
                            placeholder='기본 주소'
                            className={styles.mainAddress}
                        />
                        <input 
                            type="text"
                            id='detailAddress'
                            name='detailAddress'
                            value={newAddress.detailAddress}
                            placeholder='상세 주소'
                            className={styles.detailAddress}
                            onChange={(e) => {
                                let {value} = e.target as HTMLInputElement;
                                setNewAddress({
                                    ...newAddress,
                                    detailAddress : value
                                })
                                
                                const totalAddress = `(${newAddress.postCode}) ${newAddress.mainAddress} ${newAddress.detailAddress}`;

                                setUpdateUser((prev:User) => {
                                    return {...prev, address : totalAddress}
                                })
                            }}
                        />
                    </div>
                </>
            }

                <button 
                    type='button' 
                    className={styles.button}
                    style={{
                        width : '50%',
                        alignSelf : 'center',
                        marginTop : '50px'
                    }}
                    onClick={update}
                >수정</button>

                <ReactModal 
                    isOpen={modal}
                    className={styles.modal_container}
                    onRequestClose={closeModal} // 모달 외부 클릭 시 닫기
                    overlayClassName={styles.overlay}
                >
                    <div className={styles.modal_header}>
                        <h3 style={{margin : 5, paddingTop : '10px'}}>우편번호 찾기</h3>
                        <button onClick={closeModal} className={styles.closeButton}>&times;</button>
                    </div>
                    <div className={styles.modal_content}>
                        <DaumPostcodeEmbed 
                            onComplete={handleAddress}
                        />
                    </div>
                </ReactModal>

        </div>
        </>
    )
}
