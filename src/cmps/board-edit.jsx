import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { boardService } from '../services/board.service'
import { addBoard } from '../store/board.actions'

export const BoardEdit = ({ toggleCreateBoardModal }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [board, handleChange, setBoard] = useForm({
        title: '',
        style: {
            bgColor: null,
            imgUrl: boardService.getBackground('url')[0]
        }
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const onSaveBoard = async (ev) => {
        ev.preventDefault()
        const activity = {
            txt: 'created this board',
            task: {
                task: "",
                title: ""
            }
        }
        try {
            const savedBoard = await dispatch(addBoard(board, activity))
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('Cannot save board', err)
        }
    }

    const getBackground = (type) => {
        const imgUrl = boardService.getBackground(type)
        return imgUrl
    }

    const setBoardBackground = (type, background) => {
        const boardToUpdate = board
        if (type === 'url') {
            boardToUpdate.style.imgUrl = background.imgUrl
            boardToUpdate.style.thumbUrl = background.thumbUrl
            boardToUpdate.style.bgColor = null
        }
        else if (type === 'color') {
            boardToUpdate.style.bgColor = background
            boardToUpdate.style.imgUrl = null
            boardToUpdate.style.thumbUrl = null
        }
        setBoard({ ...boardToUpdate })
    }

    const checkIsSelected = (background) => {
        if (board.style.imgUrl === background || board.style.bgColor === background) {
            return true
        }
    }

    const getCoverBackground = () => {
        let style = {}
        if (board.style.imgUrl) {
            style.backgroundImage = `url(${board.style.imgUrl})`
        }
        else if (board.style.bgColor) {
            style.backgroundColor = board.style.bgColor
        }
        return style
    }

    return (
        <section className="add-board">
            <div className="add-board-title-container">
                <div className="add-board-title">Create board</div>
                <button className="btn-close-add btn-close-modal" onClick={toggleCreateBoardModal}></button>
            </div>

            <div className="scroll-container">

                <div className="cover-display-container">
                    <div className="cover-display" style={getCoverBackground()}>
                        <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
                    </div>
                </div>

                <div className="background-picker-container">
                    <div className="background-picker-label-container">
                        <label>Background</label>
                    </div>
                    <div className="background-picker">
                        <ul className="image-picker">
                            {getBackground('url').map(img => {
                                return <li key={img.thumbUrl}>
                                    <button
                                        style={{ backgroundImage: `url(${img.thumbUrl})` }}
                                        onClick={() => setBoardBackground('url', img)}>
                                        {checkIsSelected(img.imgUrl) &&
                                            <span className="marked" style={{ backgroundColor: "#091e4233" }}>
                                            </span>}
                                        {!checkIsSelected(img.imgUrl) &&
                                            <span className="unmarked"></span>}
                                    </button>
                                </li>
                            })}
                        </ul>
                        <ul className="color-picker">
                            {getBackground('color').map(color => {
                                return <li key={color}>
                                    <button
                                        style={{ backgroundColor: color }}
                                        onClick={() => setBoardBackground('color', color)}>
                                        {checkIsSelected(color) &&
                                            <span className="marked" style={{ backgroundColor: "#091e4233" }}></span>}
                                        {!checkIsSelected(color) &&
                                            <span className="unmarked"></span>}
                                    </button>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>

                <form onSubmit={onSaveBoard}>
                    <div className="title-label-container">
                        <label htmlFor="title">Board title<span>*</span></label>
                    </div>
                    <input
                        ref={inputRef}
                        value={board.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        id="title"
                        required />
                    {!board.title && <div className="user-msg-container">
                        <span>👋</span>
                        <p>Board title is required</p>
                    </div>}

                    <button className={"btn-create-board " + (board.title ? "btn-enabled" : "btn-disabled")}>Create</button>
                </form>
            </div>
        </section >
    )
}