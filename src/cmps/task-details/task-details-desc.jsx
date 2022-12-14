import React, { useRef, useState } from "react"
import { GrTextAlignFull } from "react-icons/gr"
import { useForm } from "../../hooks/useForm"

export const TaskDetailsDesc = ({ task, onUpdateTask }) => {
    const [isEditDescription, setEditDescription] = useState(null)
    const [updatedTask, handleChange, setUpdatedTask] = useForm({})
    const refInput = useRef(null)

    const toggleEditDescription = () => {
        setUpdatedTask(task)
        setEditDescription(!isEditDescription)
    }

    const onSaveTaskDesc = () => {
        task.desc = updatedTask.desc
        onUpdateTask(task)
        toggleEditDescription()
    }

    return (
        <section className={`task-details-desc ${isEditDescription ? 'edit-status' : ''}`}>
            <div className="description-main-content">
                <div className="description-icon"><GrTextAlignFull /></div>
                <div className="description-title">Description</div>
                {!isEditDescription && task.desc &&
                    <button className="btn-edit-description"
                        onClick={toggleEditDescription}>Edit</button>}
            </div>
            {!isEditDescription && !task.desc &&
                <div className="description-placeholder"
                    onClick={toggleEditDescription} >Add a more detailed description...
                </div>}
            {!isEditDescription && task.desc &&
                <div className="static-description"
                    onClick={toggleEditDescription}>{task.desc}
                </div>}
            <div className="description-edit-container">
                {isEditDescription && <textarea className="description-textarea"
                    placeholder="Add a more detailed description..."
                    name="desc"
                    onChange={handleChange}
                    value={updatedTask.desc}
                    ref={refInput} />}
                {isEditDescription &&
                    <React.Fragment>
                        <button className="btn-desc save"
                            onClick={onSaveTaskDesc}>Save</button>
                        <button className="btn-desc close"
                            onClick={toggleEditDescription}>Cancel</button>
                    </React.Fragment>}
            </div>
        </section>
    )
}