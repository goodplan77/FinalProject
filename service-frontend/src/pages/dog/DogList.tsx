import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Dog } from "../../type/dog";

export default function DogList(){

    let user = useSelector((state:RootState)=>state.user);
    let [dogs, setDogs] = useState<Dog[]>([]);
    
    useEffect(()=>{
        axios.get(`http://localhost:8013/banju/user/selectDogs/${user.userNo}`)
            .then(res=>{
                setDogs(res.data)
            })
    },[])

    return(
        <table>
            <tr>
                <th>프로필 사진</th>
                <th>이름</th>
                <th>생일</th>
                <th>견종</th>
                <th>성별</th>
                <th>메모</th>
            </tr>
            {
                dogs.map((dog:Dog)=>{
                    return(
                        <tr>
                            <td>{dog.dogName}</td>
                            <td>{dog.dogName}</td>
                            <td>{dog.birthday}</td>
                            <td>{dog.breed}</td>
                            <td>{dog.gender}</td>
                            <td>{dog.note}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
}