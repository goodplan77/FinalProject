import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export default function Boards(){

    const boards = useSelector((state:RootState) => state.boards)

    return (
        <div className="result">
            {
                boards.map((board) => {
                    return (
                        <div>
                            board.title
                        </div>
                    )
                })

            }
        </div>
    )
}