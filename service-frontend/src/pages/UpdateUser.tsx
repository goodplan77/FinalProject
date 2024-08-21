import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useInput from "../hook/useInput";
import { initUser, User } from "../type/user";
import axios from "axios";
import { useState } from "react";
import AddressModal from "../components/AddressModal";
import { closeModal, openModal } from "../features/modalSlice";

export default function UpdateUserPage() {

    let {user, modal} = useSelector((state:RootState)=>state);
    const dispatch = useDispatch();
    const navi = useNavigate();
    const [updateUser, setUpdateUser] = useInput<User>(user);

    const update = ()=>{
        axios.patch("http://localhost:8013/banju/user/updateUser",updateUser)
                    .then(res=>{
                        console.log(res);
                    })
    }

    return(
        <>
            <input 
                type="text"
                id="nickName"
                name="nickName"
                value={updateUser.nickName}
                onChange={setUpdateUser}
            />
            <input 
                type="text"
                id="nickName"
                name="nickName"
                value={updateUser.nickName}
                onChange={setUpdateUser}
            />
            <input 
                type="text"
                id="nickName"
                name="nickName"
                value={updateUser.nickName}
                onChange={setUpdateUser}
            />

            <button type="button" className='' onClick={()=>{
                dispatch(openModal(modal));
            }}>
                검색
            </button>
            <button type="button" className='' onClick={()=>{
                dispatch(closeModal(modal));
            }}>
                닫기
            </button>

            {modal && <AddressModal/>}

            <button onClick={update}>수정</button>
        </>
    )
}
