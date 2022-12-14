import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import closeIcon from '../../../assets/img/icon-close-task-details.svg'
import { boardService } from "../../../services/board.service"
import { utilService } from "../../../services/util.service"
import { updateBoard } from "../../../store/board.actions"

export const EditLabelModal = ({ toggleEditLabelModal, labelForEdit, onSetLabel }) => {

    const [backgroundColors, setBackgroundColors] = useState([])
    const [newLabelStyle, setNewLabelStyle] = useState({})
    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        loadBackGround()
        setNewLabelStyle({
            id: labelForEdit.id || utilService.makeId(),
            title: labelForEdit.title,
            color: labelForEdit.color
        })
    }, [])

    const loadBackGround = () => {
        setBackgroundColors(boardService.getLabelsColors())
    }

    const onUpdateTitle = (ev) => {
        setNewLabelStyle({ ...newLabelStyle, title: ev.target.value })
    }

    const onSetColor = (color) => {
        setNewLabelStyle({ ...newLabelStyle, color })
    }

    const onEditLabel = (ev) => {
        ev.preventDefault()
        toggleEditLabelModal()
        const idx = board.labels.findIndex(label => label.id === newLabelStyle.id)
        if (idx < 0) board.labels.push(newLabelStyle)
        else board.labels.splice(idx, 1, newLabelStyle)
        dispatch(updateBoard(board))
    }

    const onDeleteLabel = async (labelId) => {
        board.labels = board.labels.filter(label => label.id !== labelId)
        board.groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task?.labelIds) {
                    task.labelIds = task.labelIds.filter(labelId => labelId !== newLabelStyle.id)
                }
                if (task.id === params.taskId) {
                    onSetLabel(undefined, true, labelId)
                }
            })
        })
        await dispatch(updateBoard(board))
        toggleEditLabelModal()
    }

    return (
        <section className="edit-label-modal">
            <img src={closeIcon} onClick={toggleEditLabelModal} className="close-btn" />
            <div className="title">Edit label</div>

            <form onSubmit={onEditLabel}>
                <label className="sub-title">Title</label>
                <input name="label-title" type="text" onChange={onUpdateTitle} value={newLabelStyle.title} />
            </form>

            <section>
                <span className="sub-title">Select a color</span>
                <ul className="label-color-list">
                    {backgroundColors.map(color =>
                        <li className="label-color-item" key={color}>
                            <div onClick={() => onSetColor(color)} className={`label-color ${color === newLabelStyle.color ? 'selected' : ''}`} style={{ backgroundColor: color }} />
                        </li>)}
                </ul>
            </section>
            <div className="border"></div>
            <div className="btns-edit-label-container">
                <button className="btn btn-save" onClick={onEditLabel}>Save</button>
                <button className="btn btn-delete" onClick={() => onDeleteLabel(newLabelStyle.id)}>Delete</button>
            </div>
        </section>
    )
}