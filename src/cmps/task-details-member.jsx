import React, { useState } from "react"
import { GrAdd } from "react-icons/gr"
import { TaskDetailsMembersModal } from "./task-modal-member"
import { TaskMember } from "./task-member"


export const TaskDetailsMember = ({ task, onUpdateTask }) => {
    const [isMemberModal, setIsMemberModal] = useState(null)

    const toggleMembersModal = () => {
        setIsMemberModal(!isMemberModal)
    }

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
            {task?.memberIds.length > 0 && <section className="members">
                <div className="tag-title">Members</div>
                <div className="select-members">
                    <TaskMember memberIds={task.memberIds} />
                    <div onClick={toggleMembersModal} className="plus-icon"><GrAdd /></div>
                </div>
            </section>}
            {isMemberModal && <TaskDetailsMembersModal
                memberIds={task.memberIds}
                onSetMember={onSetMember}
                toggleMembersModal={toggleMembersModal} />}
        </React.Fragment>
    )
}



















    // const board = useSelector(state => state.boardModule.board)

    // const getMemberName = (memberId) => {
    //     const member = board.members.find(member => member._id === memberId)

    //     const fullname = member.fullname.split(' ')
    //     let initials = fullname[0][0]
    //     if (fullname.length >= 2) {
    //         initials += fullname[1][0]
    //     }

    // if (member.imgUrl) {
    //     return (
    //         <section className="member-details">
    //             <div className="member-img-container">
    //                 <div style={{
    //                     backgroundImage: `url(${member.imgUrl})`,
    //                     backgroundSize: "cover",
    //                     height: "28px",
    //                     width: "28px",
    //                     borderRadius: "50%"
    //                 }}></div>
    //             </div>
    //             <div className="member-fullname">{member.fullname}</div>
    //         </section>
    //     )
    // }

    // return (
    //     <section className="member-details">
    //         <div className="member-initials-container">
    //             <div className="member-initials">{initials}</div>
    //             <div className="member-fullname">{member.fullname}</div>
    //         </div>
    //     </section>
    // )
    // }

    // const checkTaskMember = (memberId) => {
    //     if (!memberIds) return
    //     const checkedMember = memberIds.find(member => member === memberId)
    //     if (checkedMember) return false
    //     return true
    // }


    // if (!board.members) return <div>No board members found</div>
    // return (
    //     <div className="board-member-container">
    //         {board.members.map(member => {
    //             return <div className="member"
    //                 key={member._id}
    //                 onClick={() => onSetMember(checkTaskMember(member._id), member._id, member.fullname)}>
    //                 {getMemberName(member._id)}
    //                 {checkTaskMember(member._id) && <span className="isMember">✔</span>}
    //             </div>
    //         })}
    //     </div>
    // )

