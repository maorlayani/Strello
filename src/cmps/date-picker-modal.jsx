import { DatePicker } from "./date-picker"
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useState } from "react"

export const DatePickerModal = ({ toggleModal, task, onUpdateTask }) => {

    const [dateClicked, setDate] = useState(new Date())

    const onDayClick = (date) => {
        setDate(date)
    }

    const onUpdateDueDate = () => {
        task.dueDate = {
            date: dateClicked.getTime(),
            isDone: false,
            createdAt: Date.now()
        }
        onUpdateTask(task)
        toggleModal()
    }

    const onRemoveDueDate = () => {
        delete task.dueDate
        onUpdateTask(task)
        toggleModal()
    }

    return (
        <section className="date-picker-modal">
            <div className="date-picker-title-container">
                <div className="date-picker-title-content">
                    <h3 className="date-picker-title">Dates</h3>
                    <img src={closeIcon} onClick={toggleModal} className="btn-close-date-picker" />
                </div>
                <hr className="date-picker-hr" />
            </div>
            <DatePicker onDayClick={onDayClick} dateClicked={dateClicked} />
            <div className="btn-date-container">
                <div className="btn-date-picker btn-save-date" onClick={onUpdateDueDate}>Save</div>
                <div className="btn-date-picker btn-remove-date" onClick={onRemoveDueDate}>Remove</div>
            </div>
        </section>
    )
}