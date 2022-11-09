import React from 'react'
import { useSelector } from 'react-redux'
import { ChecklistModal } from './checklist-modal'
import { ChecklistPreview } from './checklist-preview'

export const TaskChecklist = ({ task, toggleModal, onUpdateTask }) => {

    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)

    return (
        <React.Fragment>
            {task?.checklists?.length > 0 && <section className="task-checklist">
                {task.checklists.map((checklist, idx) => {
                    return <ChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                        checklistIdx={idx}
                        onUpdateTask={onUpdateTask}
                        task={task} />
                })}
            </section>}
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'checklist' &&
                <ChecklistModal
                    toggleModal={toggleModal}
                    onUpdateTask={onUpdateTask}
                    // pos={checklistModalPos}
                    task={task} />}
        </React.Fragment>
    )
}