import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateTask, removeTask, resizeLabel, setTaskDetailsModal } from '../store/board.actions'
import { useSelector } from "react-redux"
import { TaskChecklist } from "../cmps/task-checklist"
import { DetailsActivities } from "../cmps/task-details-activities"
import { TaskDetailsCover } from "../cmps/task-details-cover"
import { Loader } from "../cmps/loader"
import { useNavigate, useParams } from "react-router-dom"
import { boardService } from "../services/board.service"
import { TaskDetailsTitle } from "../cmps/task-details-title"
import { TaskDetailsMember } from "../cmps/task-details-member"
import { TaskDetailsLabel } from "../cmps/task-details-label"
import { TaskDetailsDueDate } from "../cmps/task-details-due-date"
import { TaskDetailsDesc } from "../cmps/task-details-desc"
import { TaskDetailsAttachment } from "../cmps/task-details-attachment"
import { TaskDetailsSideMenu } from "../cmps/task-details-side-menu"

export const TaskDetails = () => {
    const stateBoard = useSelector(state => state.boardModule.board)
    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { boardId, groupId, taskId } = useParams()

    const [currentGroupTitle, setGroupTitle] = useState(null)
    const [task, setTask] = useState(null)

    useEffect(() => {
        loadTaskDetails()
        if (taskDetailsModal.isOpen) toggleModal()
    }, [])

    const loadTaskDetails = async () => {
        try {
            const group = await boardService.getGroupById(boardId, groupId)
            const task = await boardService.getTaskById(boardId, groupId, taskId)
            setGroupTitle(group.title)
            setTask(task)
        } catch (err) {
            console.log('Cannot load task', err)
        }
    }

    const onUpdateTask = (taskForUpdate, activity) => {
        if (!taskForUpdate) return
        dispatch(updateTask(boardId, groupId, taskForUpdate, activity))
    }

    const onBack = () => {
        dispatch(resizeLabel(false))
        navigate(-1)
        toggleModal()
    }

    const onRemoveTask = () => {
        onBack()
        dispatch(removeTask(boardId, groupId, task))
    }

    const clickedOnModal = (ev) => {
        ev.stopPropagation()
    }

    const toggleModal = (type = null) => {
        dispatch(setTaskDetailsModal(!taskDetailsModal.isOpen, type))
    }

    if (!task) return <Loader />
    return (
        <section className="task-details-main" >
            <div className="black-screen" onClick={onBack}>
                <section className="task-details-container" onClick={clickedOnModal}>
                    <TaskDetailsCover
                        task={task}
                        onBack={onBack}
                        toggleModal={toggleModal}
                        onUpdateTask={onUpdateTask} />

                    <div className="task-main-container">
                        {!task?.style &&
                            <button onClick={onBack} className="btn close"></button>}

                        <TaskDetailsTitle
                            task={task}
                            groupTitle={currentGroupTitle}
                            onUpdateTask={onUpdateTask} />

                        <div className="task-main-middle-container">
                            <div className="task-main-container-left">

                                <section className="tags">
                                    <TaskDetailsMember
                                        task={task}
                                        onUpdateTask={onUpdateTask}
                                        toggleModal={toggleModal} />
                                    <TaskDetailsLabel
                                        task={task}
                                        onUpdateTask={onUpdateTask}
                                        toggleModal={toggleModal} />
                                </section>

                                <TaskDetailsDueDate
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                    toggleModal={toggleModal} />

                                <TaskDetailsDesc
                                    task={task}
                                    onUpdateTask={onUpdateTask} />

                                <TaskDetailsAttachment
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                    toggleModal={toggleModal} />

                                <TaskChecklist
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                    toggleModal={toggleModal} />

                                <DetailsActivities
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                    groupId={groupId} />
                            </div>

                            <TaskDetailsSideMenu
                                toggleModal={toggleModal}
                                onRemoveTask={onRemoveTask}
                                task={task}
                            />

                        </div>
                    </div>
                </section>
            </div >
        </section >
    )
}