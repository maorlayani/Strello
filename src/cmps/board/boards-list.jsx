import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { getBoard, loadBoards } from '../../store/board.actions'

export const BoardsList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pathname = useLocation().pathname
    const boards = useSelector(state => state.boardModule.boards)

    useEffect(() => {
        if (!boards) dispatch(loadBoards())
    }, [])

    const getBoardThumbnail = (board) => {
        if (board.style?.imgUrl) {
            if (board.style?.thumbUrl) return <img src={board.style.thumbUrl} className="thumbnail"></img>
            else return <img src={board.style.imgUrl} className="thumbnail"></img>
        }
        else if (board.style?.bgColor) return <div style={{ backgroundColor: board.style.bgColor }} className="color-thumb"></div>
    }

    const getActiveLink = (id) => {
        if (pathname.includes(id)) return 'active'
        return ''
    }

    const onSelectedBoard = (boardId) => {
        dispatch(getBoard(boardId))
        navigate(`/board/${boardId}`)
    }

    if (!boards || !boards.length) return

    return (
        <ul className="boards-list">
            {boards.map(board => {
                return <section className="boards-link" key={board._id}>
                    <li className={getActiveLink(board._id)} onClick={() => onSelectedBoard(board._id)}>
                        <span className="flex-left">{getBoardThumbnail(board)}{board.title}</span>
                    </li>
                </section>
            })}
        </ul>
    )
}