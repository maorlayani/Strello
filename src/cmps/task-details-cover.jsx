import React from "react"
import { TaskDetailsCoverModal } from "./task-modal-cover"
import { FaWindowMaximize } from 'react-icons/fa'
import { useSelector } from "react-redux"

export const TaskDetailsCover = ({ task, onBack, onUpdateTask, toggleModal }) => {

    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)

    return (
        <React.Fragment>
            {task?.style && <section className="task-cover" style={{ backgroundColor: task.style.bg.color }} >
                <button onClick={onBack} className="btn close"></button>
                {task?.style?.bg?.imgUrl && <div className="img-cover" style={{ backgroundImage: `url(${task.style.bg.imgUrl})` }} ></div>}
                <div onClick={() => toggleModal('cover')} className="btn cover">
                    <span className="bts-icon"><FaWindowMaximize /></span>
                    <span className="btn-cover-txt">Cover</span>
                </div>
            </section>}
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'cover' && <TaskDetailsCoverModal
                task={task}
                toggleModal={toggleModal}
                onUpdateTask={onUpdateTask} />}
        </React.Fragment>
    )
}