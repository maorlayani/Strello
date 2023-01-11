import { FaWindowMaximize } from 'react-icons/fa'
import { BsTagFill } from 'react-icons/bs'
import { HiUser } from 'react-icons/hi'
import { HiArchive } from 'react-icons/hi'
import { TaskLabel } from '../task-details/task-label'
import { useState, useEffect } from 'react'
import { TaskMember } from '../task-details/task-member'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateTask, removeTask, toggleQuickEdit, setTaskDetailsModal } from '../../store/board.actions'
import { TaskModalLabel } from '../task-details/task-details-modals/task-modal-label'
import { useSelector } from 'react-redux'

export const TaskQuickEdit = ({ task, pos, boardId, groupId }) => {

  const [title, setTaskTitle] = useState(task.title)
  const [currentBoardId, setBoardId] = useState(null)
  const [currentGroupId, setGroupId] = useState(null)
  const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!boardId) return
    setBoardId(boardId)
    if (!groupId) return
    setGroupId(groupId)
  }, [])

  const handleChange = (ev) => {
    setTaskTitle(ev.target.value)
  }

  const onEditTaskTitle = (ev) => {
    ev.preventDefault()
    const taskToSave = {
      ...task,
      title
    }
    onUpdateTask(taskToSave)
    dispatch(toggleQuickEdit(false))
  }

  const onEditClick = (ev) => {
    ev.stopPropagation()
  }

  const onRemoveTask = () => {
    dispatch(removeTask(currentBoardId, currentGroupId, task))
    closeQuickEdit()
  }

  const onUpdateTask = (task) => {
    dispatch(updateTask(currentBoardId, currentGroupId, task))
  }

  const onSetLabel = (ev, addOrRemove, labelId) => {
    ev.stopPropagation()
    if (!addOrRemove) {
      if (!task.labelIds) task.labelIds = [labelId]
      else task.labelIds.push(labelId)
    } else {
      const idx = task.labelIds.findIndex(label => label === labelId)
      task.labelIds.splice(idx, 1)
    }
    onUpdateTask(task)
  }

  const onGoToDetails = () => {
    closeQuickEdit()
    navigate(`/board/${boardId}/${groupId}/${task.id}`)
  }

  const closeQuickEdit = () => {
    dispatch(toggleQuickEdit(false))
  }

  const toggleModal = (type = null) => {
    dispatch(setTaskDetailsModal(!taskDetailsModal.isOpen, type))
  }

  return (

    <div className="task-quick-edit">
      <div className="black-screen" onClick={closeQuickEdit}>

        <section className="task-quick-edit-container" onClick={onEditClick} style={{ ...pos.style }}>
          <div className="left-col" style={{ width: pos.position.width }}>
            {task.style?.bg?.imgUrl && <div className='task-cover' style={{ backgroundImage: `url(${task.style.bg.imgUrl})`, height: "180px", backgroundSize: "cover", width: `${pos.width}px` }}></div>}
            {task.style?.bg?.color && <div className='task-cover' style={{ background: `${task.style.bg.color}`, height: "32px", width: `${pos.width}px` }}></div>}
            <div className="input-side">
              <section className="labels">
                {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
              </section>
              <div className="task-title-container">
                <input type="text" value={title} onChange={handleChange} />
              </div>
              {task.memberIds && <TaskMember memberIds={task.memberIds} />}
            </div>
            <button className="btn-add" onClick={onEditTaskTitle}>Save</button>
          </div>
          <ul className="quick-edit-actions">
            <li onClick={onGoToDetails}><FaWindowMaximize /> Open card</li>
            <li onClick={() => toggleModal('labels')}><BsTagFill /> Edit labels</li>
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'labels' &&
              <TaskModalLabel
                labelIds={task.labelIds}
                onSetLabel={onSetLabel}
                toggleModal={toggleModal} />}
            {/* <li><HiUser /> Change members</li>
            <li><FaWindowMaximize /> Change Cover</li> */}
            <li onClick={onRemoveTask}><HiArchive /> Archive</li>
          </ul>
        </section>
      </div >
    </div >
  )
}