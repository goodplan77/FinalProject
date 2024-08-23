import { useState } from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import styles from './styles/AddressModal.module.css';

export default function AddressModal(){


    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState({
        postCode : '',
        mainAddress : '',
        detailAddress : ''
    });

    function openModal(){
        setModal(true);
    }

    function closeModal(){
        setModal(false);
    }

    const handleAddress = (data: any) => {

        console.log(data);
        
        const address = {
            postCode : data.zonecode,
            mainAddress:data.address,
            detailAddress : ''
        }

        setAddress(address);

        closeModal();
    };

    return(
        <>

            <Modal 
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
                    <DaumPostcode 
                        onComplete={handleAddress}
                    />
                </div>
            </Modal>

        </>
    )
}