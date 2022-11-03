import React, { useEffect, useState, useRef } from "react"
import { Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom"
import { TaskLabel } from "./task-label"
import { TaskMember } from "./task-member"
import { updateTask } from "../store/board.actions"
import { useDispatch, useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { Loader } from "./loader"

export const TaskPreview = ({ task, groupId, index, openQuickEdit }) => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const taskRef = useRef()
    const [isFullCover, setIsFullCover] = useState(false)
    // const [windowWidth, setWidth] = useState(window.innerWidth)
    // const [windowHeight, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        if (task.style) setIsFullCover(task.style.bg.fullCover)
        // setWidth(window.innerWidth)
        // setHeight(window.innerHeight)
    }, [])

    const setTaskCoverStyle = () => {
        let style = {}
        if (!task.style) return style
        if (task.style.bg.color) style = { backgroundColor: task.style.bg.color }
        else if (task.style.bg.imgUrl) {
            style = {
                backgroundImage: `url(${task.style.bg.imgUrl})`,
                backgroundSize: "cover",
                height: "180px"
            }
        }
        return style
    }

    const onGoToDetails = () => {
        navigate(`/board/${board._id}/${groupId}/${task.id}`)
    }

    const isWatchByUser = () => {
        if (!task.memberIds || !task.watcedMemberIds) return
        let isWatch = false
        task.memberIds.forEach(member => {
            if (task.watcedMemberIds.includes(member)) isWatch = true
        })
        return isWatch
    }

    const completeDue = (ev) => {
        ev.stopPropagation()
        task.dueDate.isDone = !task.dueDate.isDone
        const dueDateAction = task.dueDate.isDone ? 'complete' : 'incomplete'
        const activity = {
            txt: `marked the due date on ${task.title} ${dueDateAction}`,
            task: {
                id: task.id,
                title: ""
            }
        }
        dispatch(updateTask(board._id, groupId, task, activity))
    }

    const getTodosStatus = (checklists) => {
        let todoCount = 0
        let completeTodoCount = 0
        checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                todoCount++
                if (todo.isDone) completeTodoCount++
            })
        })
        return { todoCount, completeTodoCount }
    }

    const setTodosForDisplay = (checklists) => {
        const { completeTodoCount, todoCount } = getTodosStatus(checklists)
        return `${completeTodoCount}/${todoCount}`
    }

    const getTodoClassname = (checklists) => {
        const { completeTodoCount, todoCount } = getTodosStatus(checklists)
        if (completeTodoCount === todoCount) return 'done'
        return ''
    }

    // if (task.id === 'c301') console.log('render TASK PREVIEW', task.memberIds)
    if (!task) return <Loader />
    return (
        <Draggable
            draggableId={task.id}
            index={index}>
            {(provided) => (
                <section
                    ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-preview"
                    onClick={onGoToDetails}>
                    <div className="btn-quick-edit hide" onClick={(ev) => openQuickEdit(ev, groupId, task)}>
                    </div>
                    {!isFullCover && task?.style &&
                        <div className="task-cover" style={setTaskCoverStyle()}></div>}
                    {task?.key === "video" && <iframe src={task.title}></iframe>}
                    {!isFullCover && task?.key !== "video" &&
                        <div className="task-preview-content">
                            {task?.labelIds && <TaskLabel
                                labelIds={task.labelIds}
                            />}
                            <span>{task.title}</span>
                            <div className={"badges-container " +
                                (!task?.memberIds && task?.dueDate ? "adjust-height" : "")} >
                                <div className="left-badges-container">
                                    {isWatchByUser() && <div className="viewed-by-user"></div>}
                                    {task?.dueDate &&
                                        <div
                                            className={"due-date-container " +
                                                (task?.dueDate.isDone ? "done due-task-display" : utilService.getDueDateTag(task.dueDate.date))}
                                            onClick={completeDue}>
                                            <div className="due-date-icon"></div>
                                            <span className="due-date-txt">{utilService.formatDate(task.dueDate, true)}</span>
                                        </div>}

                                    {task.desc && <div className="task-desc-icon"></div>}
                                    {task?.attachments?.length > 0 && <div className="attachment-badge-container">
                                        <div className="attachment-badge"></div>
                                        <span>{task.attachments.length}</span>
                                    </div>}

                                    {task?.checklists?.length > 0 && <div className={"checklist-container " + getTodoClassname(task.checklists)}>
                                        <div className="checklist-icon"></div>
                                        <span className="checklist-todos">{setTodosForDisplay(task.checklists)}</span>
                                    </div>}
                                </div>

                                <div className="right-badges-container">
                                    {task?.memberIds && <TaskMember
                                        memberIds={task.memberIds}
                                        isTaskDetailsOpen={false} />}
                                </div>
                            </div>
                        </div>}

                    {isFullCover && task?.style?.bg?.imgUrl &&
                        <div className="task-preview-content add-border" style={setTaskCoverStyle()}>
                            <span className="title-img-cover">{task.title}</span>
                        </div>}

                    {isFullCover && task?.style?.bg?.color &&
                        <React.Fragment>
                            <div className="task-cover" style={setTaskCoverStyle()}></div>
                            <div className="task-preview-content" style={setTaskCoverStyle()}>
                                <span>{task.title}</span>
                            </div>
                        </React.Fragment>}
                </section >
            )}
        </Draggable >
    )
}
