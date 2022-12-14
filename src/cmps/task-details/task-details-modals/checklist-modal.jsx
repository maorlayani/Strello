import closeIcon from '../../../assets/img/icon-close-task-details.svg'
import { utilService } from '../../../services/util.service'

export const ChecklistModal = ({ toggleModal, task, onUpdateTask }) => {

    const onAddChecklist = (ev) => {
        ev.preventDefault()
        if (!ev.target.checklistTitle.value) return
        const title = ev.target.checklistTitle.value
        toggleModal()
        const newChecklist = {
            id: utilService.makeId(),
            title,
            todos: [],
        }
        if (task?.checklists) task.checklists.push(newChecklist)
        else task.checklists = [newChecklist]
        onUpdateTask(task)
    }

    return (
        <section className="checklist-modal" >
            <section className="header">
                Add checklist
                <img src={closeIcon} onClick={toggleModal} alt="close" className="close-btn" />
            </section>
            <section className="main">
                <section className="title">
                    Title
                </section>

                <form onSubmit={onAddChecklist}>
                    <label htmlFor="checklistTitle">
                        <input type="text" placeholder="Checklist" name="checklistTitle" className="checklist-search-input" />
                    </label>
                    <button className="btn-add">Add</button>
                </form>

            </section>
        </section>
    )
}