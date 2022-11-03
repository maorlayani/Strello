import { useEffect, useState } from "react"
import { TaskDetailsCoverModal } from "../cmps/task-modal-cover"
import { useDispatch } from "react-redux"
import { updateTask, removeTask, resizeLabel } from '../store/board.actions'
import { HiUser } from 'react-icons/hi'
import { BsTagFill, BsCheck2Square, BsClock } from 'react-icons/bs'
import { HiArchive } from 'react-icons/hi'
import { FaWindowMaximize } from 'react-icons/fa'
import { ImAttachment } from 'react-icons/im'
import { AbilityCreator } from "../cmps/ability-creator"
import { useSelector } from "react-redux"
import { AttachmentModal } from "../cmps/attachment-modal"
import moment from 'moment'
import { AttachmentNameEditModal } from "../cmps/task-details-modals/attachment-name-edit-modal"
import { ChecklistModal } from "../cmps/checklist-modal"
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
// import { TaskDetailsAttachment } from "../cmps/task-details-attachment"

export const TaskDetails = () => {

    const imgJson = useSelector(state => state.boardModule.imgJson)
    const stateBoard = useSelector(state => state.boardModule.board)
    const stateTask = useSelector(state => state.boardModule.task)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { boardId, groupId, taskId } = useParams()

    const [showModal, setShowModal] = useState(null)
    const [currentGroupTitle, setGroupTitle] = useState(null)
    const [isMemberModal, setIsMemberModal] = useState(null)
    const [isAttachmentModal, setIsAttachmentModal] = useState(false)
    const [isEditAttachName, setIsEditAttachName] = useState(false)
    const [isChecklistModal, setIsChecklistModal] = useState(false)
    const [checklistModalPos, setChecklistModalPos] = useState(null)

    const [attachModalPos, setAttachModalPos] = useState(null)
    const [editAttachNameModalPos, setEditAttachNameModalPos] = useState(null)
    const [attachmentToEdit, setAttachmentToEdit] = useState(null)
    const [task, setTask] = useState(null)

    useEffect(() => {
        loadTaskDetails()
    }, [])

    useEffect(() => {
        setIsAttachmentModal(false)
        if (imgJson) onSetAttachment(false)
    }, [imgJson])

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

    const getTime = (imgJson) => {
        return moment(imgJson.addedAt).fromNow()
    }

    const onUpdateTask = (taskForUpdate, activity) => {
        if (!taskForUpdate) return
        dispatch(updateTask(boardId, groupId, taskForUpdate, activity))
    }

    const onBack = () => {
        dispatch(resizeLabel(false))
        navigate(-1)
    }

    const onShowModal = () => {
        setShowModal(!showModal)
    }

    const toggleMembersModal = () => {
        setIsMemberModal(!isMemberModal)
    }

    const toggleChecklistModal = (ev) => {
        if (ev) ev.preventDefault()
        if (!isChecklistModal) {
            const grandadEl = ev.currentTarget.parentNode.parentNode
            const pos = {
                top: grandadEl.offsetTop,
                left: grandadEl.offsetLeft + 426
            }
            setChecklistModalPos(pos)
            setIsChecklistModal(true)
        } else {
            setIsChecklistModal(false)
        }
    }

    const toggleEditAttachNameModal = (ev, attachmentId) => {
        setAttachmentToEdit(attachmentId)

        if (!isEditAttachName) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()

            const style = {
                top: ev.target.offsetTop - 300,
                left: ev.target.offsetLeft
            }
            let pos = {
                position: position,
                style: style
            }

            setEditAttachNameModalPos(pos)
            setIsEditAttachName(!isEditAttachName)
        } else {
            setIsEditAttachName(false)
        }
    }

    const toggleAttachmentModal = (ev) => {
        if (!isAttachmentModal) {
            const grandParentEl = ev.currentTarget.parentNode.parentNode
            const position = grandParentEl.getBoundingClientRect()
            const style = {
                top: grandParentEl.offsetTop - 100,
                left: grandParentEl.offsetLeft + (730 - 304)
            }
            let pos = {
                position: position,
                style: style
            }
            setAttachModalPos(pos)
            setIsAttachmentModal(!isAttachmentModal)
        } else {
            setIsAttachmentModal(false)
        }
    }

    const onSetAttachment = (addOrRemove, attachId) => {
        if (!addOrRemove) {
            if (!task.attachments) task.attachments = [(imgJson)]
            else task.attachments.unshift((imgJson))
        } else {
            const idx = task.attachments.findIndex(img => img.id === attachId)
            task.attachments.splice(idx, 1)
        }
        onUpdateTask(task)
    }

    const onRemoveTask = () => {
        dispatch(removeTask(boardId, groupId, task))
    }

    const onSaveTask = async (ev) => {
        ev.preventDefault()
        dispatch(updateTask(boardId, groupId, task))
    }

    const clickedOnModal = (ev) => {
        ev.stopPropagation()
    }

    if (!task) return <Loader />
    // console.log('render TASK-DETAILS***')
    return (
        <section className="task-details-main" >
            <div className="black-screen" onClick={onBack}>
                <section className="task-details-container" onClick={clickedOnModal}>
                    <TaskDetailsCover
                        task={task}
                        onBack={onBack}
                        onShowModal={onShowModal}
                        onUpdateTask={onUpdateTask} />

                    <div className="task-main-container">
                        {!(task?.style && (task.style.bg.imgUrl !== null || task.style.bg.color !== null)) &&
                            <button onClick={onBack} className="btn close"></button>}

                        <TaskDetailsTitle
                            task={task}
                            groupTitle={currentGroupTitle}
                            onUpdateTask={onUpdateTask} />

                        <div className="task-main-middle-container">
                            <div className="task-main-container-left">

                                <section className="tags">
                                    {task?.memberIds && <TaskDetailsMember
                                        task={task}
                                        onUpdateTask={onUpdateTask} />}
                                    {task?.labelIds && <TaskDetailsLabel
                                        task={task}
                                        onUpdateTask={onUpdateTask} />}
                                </section>

                                {task?.dueDate && <TaskDetailsDueDate
                                    task={task}
                                    onUpdateTask={onUpdateTask} />}

                                <TaskDetailsDesc
                                    task={task}
                                    onUpdateTask={onUpdateTask} />
                                {/* {task?.attachments && <TaskDetailsAttachment
                                    task={task}
                                    onUpdateTask={onUpdateTask} />} */}
                                {task?.attachments && task?.attachments?.length > 0 && <section className="attachment">
                                    <div className="attachment-title">
                                        <span className="icon"><ImAttachment /></span>
                                        <span className="section-title">Attachment</span>
                                    </div>
                                    <div className="attachment-body-and-btn">
                                        {task?.attachments.map(attachment => {
                                            return <div className="attachment-body" key={attachment.id}>
                                                <img className="img-attached" src={`${attachment.url}`} />
                                                <div className="attachment-details">
                                                    <span className="url-name">{attachment.urlName}{attachment.fileFormat ? `.${attachment.fileFormat}` : ''}</span>
                                                    <div className="add-time-and-btns">
                                                        <span className="Added-at">Added {getTime(attachment)}</span>
                                                        <span>-</span>
                                                        <span key={`${attachment.id}-dBtn`} className="btn-delete-attachment" onClick={() => onSetAttachment(true, attachment.id)} title={'Delete attachment for ever'}>Delete</span>
                                                        <span>-</span>
                                                        <span key={`${attachment.id}-eBtn`} className="btn-delete-attachment" onClick={(ev) => toggleEditAttachNameModal(ev, attachment.id)} title={'Edit attachment name'}>Edit</span>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        {isEditAttachName && <AttachmentNameEditModal toggleEditAttachNameModal={toggleEditAttachNameModal} attachmentId={attachmentToEdit} task={task} onUpdateTask={onUpdateTask} editAttachNameModalPos={editAttachNameModalPos} />}
                                        <button className="btn attachment" onClick={toggleAttachmentModal}>
                                            <span className="ability">Add an attachment</span>
                                        </button>
                                    </div>
                                </section>}
                                {isAttachmentModal && <AttachmentModal toggleAttachmentModal={toggleAttachmentModal} attachModalPos={attachModalPos} />}

                                {task?.checklists?.length > 0 && <TaskChecklist
                                    checklists={task.checklists}
                                    board={boardId}
                                    group={groupId}
                                    task={task}
                                />}

                                <DetailsActivities
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                    groupId={groupId} />
                            </div>

                            <div className="task-main-container-right">
                                <span className="add-to-card">Add to card</span>
                                <AbilityCreator callBackF={toggleMembersModal} iconCmp={HiUser} name={'Members'} />
                                {/* <button className="btn abilities" onClick={toggleLabelsModal}> */}
                                <button className="btn abilities" >
                                    <span className="icon"><BsTagFill /></span>
                                    <span className="ability">Labels</span>
                                </button>
                                {isChecklistModal && <ChecklistModal toggleChecklistModal={toggleChecklistModal} pos={checklistModalPos} boardId={boardId} groupId={groupId} task={task} />}
                                <button className="btn abilities" onClick={toggleChecklistModal}>
                                    <span className="icon"><BsCheck2Square /></span>
                                    <span className="ability">Checklist</span>
                                </button>
                                {/* {isDatePickerOpen && <DatePickerModal onToggleDatePicker={onToggleDatePicker} task={task} onUpdateTask={onUpdateTask} />} */}
                                {/* <button className="btn abilities" onClick={onToggleDatePicker}> */}
                                <button className="btn abilities">
                                    <span className="icon"><BsClock /></span>
                                    <span className="ability">Dates</span>
                                </button>
                                <button className="btn abilities" onClick={toggleAttachmentModal}>
                                    <span className="icon attach"><ImAttachment /></span>
                                    <span className="ability">Attachment</span>
                                </button>
                                {!(task?.style && (task.style.bg.imgUrl !== null || task.style.bg.color !== null)) &&
                                    <button className="btn abilities" onClick={onShowModal}>
                                        <span className="icon"><FaWindowMaximize /> </span>
                                        <span className="ability">Cover</span>
                                    </button>}
                                {showModal && <TaskDetailsCoverModal
                                    task={task}
                                    onShowModal={onShowModal}
                                    onUpdateTask={onUpdateTask}
                                    setShowModal={setShowModal}
                                />}
                                <button className="btn abilities" onClick={onRemoveTask}>
                                    <span className="icon"><HiArchive /> </span>
                                    <span className="ability">Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </section >
    )
}