import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resizeLabel } from "../../store/board.actions"

export const TaskLabel = ({ labelIds, isDetailsOpen }) => {

    const board = useSelector(state => state.boardModule.board)
    const task = useSelector(state => state.boardModule.task)
    const resizeLabelState = useSelector(state => state.boardModule.resizeLabel)
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isDetailsOpen) dispatch(resizeLabel(false))
    }, [])

    const getLabel = (labelId) => {
        return board.labels.find(label => label.id === labelId)
    }
    const getLabelStyle = (labelId) => {
        const label = getLabel(labelId)
        if (label?.color) {
            return { backgroundColor: label.color }
        } else {
            return { display: "none" }
        }
    }
    const getLabelTitle = (labelId) => {
        const label = getLabel(labelId)
        if (label?.title) return label.title
        else return ''
    }

    const toggaleLabelSize = (ev) => {
        ev.stopPropagation()
        if (isDetailsOpen) return
        dispatch(resizeLabel(isClicked))
        setIsClicked(!isClicked)
    }

    return (
        <div className="task-label-container">
            {labelIds.map(labelId => {
                return <button
                    key={labelId}
                    onClick={toggaleLabelSize}
                    className={`btn-label ${resizeLabelState ? 'clicked' : ''}`}
                    // style={{ backgroundColor: getLabel(labelId).color }}>
                    style={getLabelStyle(labelId)}>
                    {isDetailsOpen && <span className="label-title">
                        {getLabelTitle(labelId)}
                    </span>}
                    {resizeLabelState && <span className="label-title">
                        {getLabelTitle(labelId)}
                    </span>}
                </button>
            })}
        </div>
    )
}

