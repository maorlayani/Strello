import React, { useState } from "react"
import { FaWindowMaximize } from 'react-icons/fa'
import { useForm } from "../hooks/useForm"

export const TaskDetailsTitle = ({ task, groupTitle, onUpdateTask }) => {
    const [isEditTitle, setEditTitle] = useState(null)
    const [updatedTask, handleChange, setUpdatedTask] = useForm({})

    const toggleEditTitle = () => {
        setUpdatedTask(task)
        setEditTitle(!isEditTitle)
    }

    const onUpdateTaskTitle = () => {
        task.title = updatedTask.title
        onUpdateTask(task)
        toggleEditTitle()
    }

    return (
        <div className="task-details-title">
            <span className="title-icon"><FaWindowMaximize /></span>
            <section className="title-content">
                {!isEditTitle &&
                    <div className="task-title" onClick={toggleEditTitle}>{task.title}</div>}
                {isEditTitle &&
                    <form className="task-details-form" onSubmit={onUpdateTaskTitle}>
                        <input className="title-text-area"
                            value={updatedTask.title}
                            onChange={handleChange}
                            name="title"
                            type="text" />
                    </form>}
                <div className="group-title-of-task">in list {groupTitle}</div>
            </section>
        </div>
    )
}