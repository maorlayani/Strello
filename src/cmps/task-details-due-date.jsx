import React, { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { utilService } from "../services/util.service"
import { DatePickerModal } from "./date-picker-modal"


export const TaskDetailsDueDate = ({ task, onUpdateTask }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(null)

    const onCompleteDueDate = () => {
        task.dueDate.isDone = !task.dueDate.isDone
        const dueDateAction = task.dueDate.isDone ? 'complete' : 'incomplete'
        const activity = {
            txt: `marked the due date on ${task.title} ${dueDateAction}`,
            task: {
                id: task.id,
                title: ""
            }
        }
        onUpdateTask(task, activity)
    }

    const onToggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    return (
        <React.Fragment>
            <section className="task-details-due-date">
                <div className="tag-title">Due date</div>
                <div className="due-date-container">
                    <div className={"due-date-checkbox " + (task.dueDate.isDone ? "is-done" : "")} onClick={onCompleteDueDate}></div>
                    <div className={"due-date-content " + (task.dueDate.isDone ? "is-done" : "")} onClick={onToggleDatePicker}>
                        <div className="due-date-time">{utilService.formatDate(task.dueDate)}</div>
                        {!task.dueDate.isDone && <div className={"due-date-tag " + utilService.getDueDateTag(task.dueDate.date)}></div>}
                        {task.dueDate.isDone && <div className="due-date-tag is-done">complete</div>}
                        <div className="due-date-dropdwon-icon"><IoIosArrowDown /></div>
                    </div>
                </div>
            </section>
            {isDatePickerOpen && <DatePickerModal onToggleDatePicker={onToggleDatePicker} task={task} onUpdateTask={onUpdateTask} />}
        </React.Fragment>
    )
}