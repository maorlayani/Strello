import React from "react"
import { GrAdd } from "react-icons/gr"
import { TaskDetailsMembersModal } from "../task-details/task-details-modals/task-modal-member"
import { TaskMember } from "./task-member"
import { useSelector } from "react-redux"


export const TaskDetailsMember = ({ task, onUpdateTask, toggleModal }) => {

    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)

    const onSetMember = (isMemberOnTask, memberId, fullname) => {
        const activity = {
            task: {
                id: task.id,
                title: task.title
            }
        }
        if (!isMemberOnTask) {
            activity.txt = `added ${fullname} to`
            if (!task.memberIds) task.memberIds = [memberId]
            else task.memberIds.push(memberId)
            if (!task.watcedMemberIds) task.watcedMemberIds = [memberId]
            else task.watcedMemberIds.push(memberId)
        } else {
            activity.txt = `removed ${fullname} from`

            const idx = task.memberIds.findIndex(member => member === memberId)
            task.memberIds.splice(idx, 1)
            const watchIdx = task.watcedMemberIds.findIndex(watcedMember => watcedMember === memberId)
            task.watcedMemberIds.splice(watchIdx, 1)
        }
        onUpdateTask(task, activity)
    }

    return (
        <React.Fragment>
            {task?.memberIds && task?.memberIds.length > 0 && <section className="members">
                <div className="tag-title">Members</div>
                <div className="select-members">
                    <TaskMember memberIds={task.memberIds} />
                    <div onClick={() => toggleModal('members')} className="plus-icon"><GrAdd /></div>
                </div>
            </section>}
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'members' &&
                <TaskDetailsMembersModal
                    memberIds={task.memberIds}
                    onSetMember={onSetMember}
                    toggleModal={toggleModal} />}
        </React.Fragment>
    )
}