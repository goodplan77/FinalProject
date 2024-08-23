import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export default function DogList(){

    let user = useSelector((state:RootState)=>state.user);

    useEffect(()=>{
        axios.get(`http://localhost:8013/banju/user/selectDogs/${user.userNo}`)
            .then(res=>{
                console.log(res);
            })
    },[])

    return(
        <>
        </>
    )
}