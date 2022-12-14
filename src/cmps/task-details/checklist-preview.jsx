import { useState } from "react"
import { BsCheck2Square } from "react-icons/bs"
import { ProgressBar } from './progress-bar'
import { TodoList } from '../task-details/todo-list'
import { utilService } from "../../services/util.service"

export const ChecklistPreview = ({ task, checklist, onUpdateTask, checklistIdx }) => {

    const [isEditingTitle, setEditingTitle] = useState(false)
    const [isAddingTodo, setIsAddingTodo] = useState(false)
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const [checklistInfo, setChecklistInfo] = useState(checklist)

    const onDeleteChecklist = (checklistId) => {
        task.checklists = task.checklists.filter(checklist =>
            (checklist.id !== checklistId))
        onUpdateTask(task)
    }

    const onDefocusTxtArea = (ev) => {
        ev.preventDefault()
        saveChecklist(ev, checklist.id)
        setEditingTitle(false)
    }

    const handleChange = ({ target }) => {
        const { name, value } = target
        setChecklistInfo({ ...checklistInfo, [name]: value })
    }

    const saveChecklist = (ev, checklistId) => {
        ev.preventDefault()
        task.checklists = task.checklists.map(checklist =>
            (checklist.id === checklistId ? checklistInfo : checklist))
        onUpdateTask(task)
    }

    const onSaveTodo = (ev, todoId, updatedTodo) => {
        const { id } = checklist
        const updatedChecklist = {
            ...checklist, todos: checklist.todos.map(todo =>
                todo.id === todoId ? updatedTodo : todo)
        }
        const taskToUpdate = {
            ...task,
            checklists: task.checklists.map(checklist => (checklist.id !== id ? checklist :
                updatedChecklist))
        }
        onUpdateTask(taskToUpdate)
    }

    const onRemoveTodo = (todoId) => {
        const { id } = checklist
        const updatedChecklist = {
            ...checklist, todos: checklist.todos.filter(todo =>
                todo.id !== todoId)
        }
        const taskToUpdate = {
            ...task,
            checklists: task.checklists.map(checklist => (checklist.id !== id ?
                checklist : updatedChecklist))
        }
        onUpdateTask(taskToUpdate)
    }

    function onToggleTodo(ev, todoId) {
        ev.preventDefault()
        const updatedChecklist = {
            ...checklist, todos: checklist.todos.map(todo =>
                todo.id !== todoId ? todo : { ...todo, isDone: !todo.isDone })
        }
        task.checklists = task.checklists.map(currChecklist => {
            return (currChecklist.id !== checklist.id ? currChecklist : updatedChecklist)
        })
        setChecklistInfo({ ...checklistInfo })
        onUpdateTask(task)
    }

    const onAddTodo = (title) => {
        if (!newTodoTitle) return
        setIsAddingTodo(false)
        const todoToAdd = {
            id: utilService.makeId(),
            title,
            isDone: false,
        }
        task.checklists[checklistIdx].todos.push(todoToAdd)
        onUpdateTask(task)
        setNewTodoTitle('')
    }

    return (
        <section className="checklist-preview">
            {!isEditingTitle && <section>
                <div className="checklist-header">
                    <BsCheck2Square className="checklist-icon" />
                    <section onClick={() => setEditingTitle(true)} className="checklist-title">
                        {checklist.title}
                    </section>
                    <button onClick={() => onDeleteChecklist(checklist.id)} className="checklist-btn">
                        Delete
                    </button>
                </div>
            </section>}

            {isEditingTitle && <section>
                <BsCheck2Square />
                <textarea
                    className="txt-area-normal"
                    name="title"
                    defaultValue={checklist.title}
                    onClick={() => setEditingTitle(true)}
                    onBlur={(ev) => { onDefocusTxtArea(ev) }}
                    onChange={(ev) => handleChange(ev)}>
                </textarea>
                <div>
                    <button onClick={(ev) => saveChecklist(ev, checklist.id)} className="btn-add">
                        Save
                    </button>
                    <button className="checklist-btn">Close</button>
                </div>
            </section>}
            <ProgressBar checklist={checklist} />
            <TodoList
                onSaveTodo={onSaveTodo}
                onRemoveTodo={onRemoveTodo}
                onToggleTodo={onToggleTodo}
                checklist={checklist} />

            {!isAddingTodo && <button className="checklist-btn add" onClick={() => { setIsAddingTodo(true) }}>
                Add an item
            </button>}

            {isAddingTodo && <section>
                <textarea
                    className="txt-area-normal"
                    autoFocus
                    value={newTodoTitle}
                    onChange={(ev) => setNewTodoTitle(ev.target.value)}
                    placeholder="Add an item"></textarea>
                <div>
                    <button onClick={() => { onAddTodo(newTodoTitle) }} className="btn-add">
                        Add</button>
                    <button className="checklist-btn" onClick={() => setIsAddingTodo(false)} >Cancel</button>
                </div>
            </section>}
        </section>
    )
}