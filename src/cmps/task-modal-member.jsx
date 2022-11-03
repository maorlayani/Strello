import closeIcon from '../assets/img/icon-close-task-details.svg'
import { TaskMember } from './task-member'

export const TaskDetailsMembersModal = ({ memberIds, onSetMember, toggleMembersModal }) => {
    return (
        <section className="members-modal">
            <img src={closeIcon} onClick={toggleMembersModal} alt="close" className="close-btn" />
            <div className="members-modal-title">Members</div>
            <span className="sub-title">Board members</span>
            <section className="task-details-member-preview">
                <TaskMember
                    memberIds={memberIds}
                    onSetMember={onSetMember}
                    isTaskDetailsOpen={true} />
            </section>
        </section>
    )
}


