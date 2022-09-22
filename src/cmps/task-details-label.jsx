import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const TaskDetailsLabel = ({ labelIds, onSetLabel }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)

    const getLabel = (labelId) => {
        const currentLabel = board.labels.find(label => label.id === labelId)
        const isTaskLabel = checkTaskLabel(labelId)
        if (currentLabel?.color)
            return (
                <li key={currentLabel.id} className="label-details">
                    <label className="checkbox-label">
                        <input type="checkbox" defaultChecked={isTaskLabel} onChange={() => onSetLabel(isTaskLabel, currentLabel.id)}></input>
                        <div className="label-details-body" style={{ backgroundColor: currentLabel.color }}>
                            {currentLabel.title}
                        </div>
                    </label>
                    <button className="btn-edit">🖋</button>
                </li>
            )
    }

    const checkTaskLabel = (labelId1) => {
        if (!labelIds) return
        const checkedLabel = labelIds.find(labelId => labelId === labelId1)
        console.log('checkedLabel', checkedLabel)
        if (checkedLabel) return true
        return false
        // return checkedLabel
    }
    console.log("render modal")
    return (
        <div className="task-label-container" >
            <ul>
                {board.labels.map(label => {
                    return (getLabel(label.id))
                })}
            </ul>
        </div>
    )
}
