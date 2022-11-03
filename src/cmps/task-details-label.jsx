import React, { useState } from "react"
import { GrAdd } from "react-icons/gr"
import { useDispatch } from "react-redux"
import { resizeLabel } from "../store/board.actions"
import { TaskLabel } from "./task-label"
import { TaskModalLabel } from "./task-modal-label"

export const TaskDetailsLabel = ({ task, onUpdateTask }) => {
    const dispatch = useDispatch()
    const [isLabelModal, setIsLabelModal] = useState(false)
    const [labelModalPos, setLabelModalPos] = useState(null)

    const onOpenLabelsModal = () => {
        dispatch(resizeLabel(false))
    }

    const toggleLabelsModal = (ev) => {
        if (ev) ev.stopPropagation()
        setIsLabelModal(!isLabelModal)
        if (!isLabelModal && isLabelModal !== null) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()
            const grandFatherEl = parentEl.parentNode
            const style = {
                top: grandFatherEl.offsetTop,
                left: grandFatherEl.offsetLeft + (730 - 304)
            }
            let pos = {
                position: position,
                style: style
            }
            setLabelModalPos(pos)
            setIsLabelModal(true)
        } else {
            setIsLabelModal(false)
        }
    }

    const onSetLabel = (ev, isLabelOnTask, labelId) => {
        if (ev) ev.stopPropagation()
        if (!isLabelOnTask) {
            if (!task.labelIds) task.labelIds = [labelId]
            else task.labelIds.push(labelId)
        } else {
            const idx = task.labelIds.findIndex(label => label === labelId)
            task.labelIds.splice(idx, 1)
        }
        onUpdateTask(task)
    }

    return (
        <React.Fragment>
            {task?.labelIds.length > 0 && <section className="task-details-label">
                <div className="tag-title">Labels</div>
                <div className="select-labels">
                    <div className="label-container" onClick={onOpenLabelsModal}>
                        <TaskLabel labelIds={task.labelIds} isDetailsOpen={true} />
                    </div>
                    <div onClick={toggleLabelsModal} className="plus-icon">
                        <GrAdd />
                    </div>
                </div>
            </section>}
            {isLabelModal && <TaskModalLabel
                labelIds={task.labelIds}
                onSetLabel={onSetLabel}
                toggleLabelsModal={toggleLabelsModal}
                labelModalPos={labelModalPos} />}
        </React.Fragment>
    )
} 