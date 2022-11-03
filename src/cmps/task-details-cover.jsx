import React from "react"
import { useState } from "react"
import { TaskDetailsCoverModal } from "./task-modal-cover"
import { FaWindowMaximize } from 'react-icons/fa'

export const TaskDetailsCover = ({ task, onBack, onUpdateTask }) => {

    const [showModal, setShowModal] = useState(false)
    const onShowModal = () => {
        setShowModal(!showModal)
    }

    if (!task?.style) return
    // console.log('render TASk-DETAILS-COVER')
    return (
        <React.Fragment>
            <section className="task-cover" style={{ backgroundColor: task.style.bg.color }} >
                <button onClick={onBack} className="btn close"></button>
                {task?.style?.bg?.imgUrl && <div className="img-cover" style={{ backgroundImage: `url(${task.style.bg.imgUrl})` }} ></div>}
                <div onClick={onShowModal} className="btn cover">
                    <span className="bts-icon"><FaWindowMaximize /></span>
                    <span className="btn-cover-txt">Cover</span>
                </div>
            </section>
            {showModal && <TaskDetailsCoverModal
                task={task}
                onShowModal={onShowModal}
                onUpdateTask={onUpdateTask}
                setShowModal={setShowModal}
            />}
        </React.Fragment>
    )
}