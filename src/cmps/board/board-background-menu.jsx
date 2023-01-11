import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateBoard } from "../../store/board.actions"

export const BoardBackgroundMenu = ({ board, type }) => {
    const dispacth = useDispatch()

    const setBoardBackgroundColor = (color) => {
        const boardToUpdate = { ...board }
        boardToUpdate.style.bgColor = color
        boardToUpdate.style.imgUrl = null
        boardToUpdate.style.thumbUrl = null
        dispacth(updateBoard(boardToUpdate))
    }

    const setBoardBackgroundImg = (imgUrl, thumbUrl) => {
        const boardToUpdate = { ...board }
        boardToUpdate.style.imgUrl = imgUrl
        boardToUpdate.style.thumbUrl = thumbUrl
        boardToUpdate.style.bgColor = null
        dispacth(updateBoard(boardToUpdate))
    }

    return (
        <section className="board-background-menu">
            {type === 'color' && <div className="background-container">
                {boardService.getBoardBackgrounds().colors.map(color => {
                    return <div
                        key={color}
                        className="background-option"
                        style={{ backgroundColor: color }}
                        onClick={() => setBoardBackgroundColor(color)}>
                    </div>
                })}
            </div>}

            {type === 'img' && <div className="background-container">
                {boardService.getBoardBackgrounds().imgs.map((img, idx) => {
                    return <div
                        key={img.thumbUrl + idx}
                        className="background-option"
                        style={{ backgroundImage: `url(${img.thumbUrl})` }}
                        onClick={() => setBoardBackgroundImg(img.imgUrl, img.thumbUrl)}>
                    </div>
                })}
            </div>}
        </section>
    )
}