import React from "react"
import { GrAdd } from "react-icons/gr"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resizeLabel } from "../store/board.actions"
import { TaskLabel } from "./task-label"
import { TaskModalLabel } from "./task-modal-label"

export const TaskDetailsLabel = ({ task, onUpdateTask, toggleModal }) => {
    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)
    const dispatch = useDispatch()

    const onOpenLabelsModal = () => {
        dispatch(resizeLabel(false))
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
            {task?.labelIds && task?.labelIds.length > 0 && <section className="task-details-label">
                <div className="tag-title">Labels</div>
                <div className="select-labels">
                    <div className="label-container" onClick={onOpenLabelsModal}>
                        <TaskLabel labelIds={task.labelIds} isDetailsOpen={true} />
                    </div>
                    <div onClick={() => toggleModal('labels')} className="plus-icon">
                        <GrAdd />
                    </div>
                </div>
            </section>}
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'labels' &&
                <TaskModalLabel
                    labelIds={task.labelIds}
                    onSetLabel={onSetLabel}
                    toggleModal={toggleModal} />}
        </React.Fragment>
    )
} 