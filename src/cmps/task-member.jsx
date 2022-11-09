import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Loader } from "./loader"

export const TaskMember = ({ memberIds, onSetMember, isTaskDetailsOpen }) => {

    const board = useSelector(state => state.boardModule.board)
    const [memberIdsToDsiaplay, setMemberIdsToDsiaplay] = useState(memberIds)

    useEffect(() => {
        if (isTaskDetailsOpen) {
            if (!board?.members) return
            const baordMembersIds = board.members.map(member => member._id)
            setMemberIdsToDsiaplay(baordMembersIds)
        }
        else setMemberIdsToDsiaplay(memberIds)
    }, [board])

    const getMember = (memberId) => {
        if (!board?.members) return
        const member = board.members.find(member => member._id === memberId)
        return member
    }

    const isMemberOnTask = (memberId) => {
        if (!memberIds) return
        return memberIds.includes(memberId)
    }

    const getMemberContent = (memberId) => {
        const member = getMember(memberId)
        if (member?.imgUrl) {
            return <div className="member-content" style={{
                backgroundImage: `url(${member.imgUrl})`
            }}></div>
        }
        const fullname = member.fullname.split(' ')
        let initials = fullname[0][0]
        if (fullname.length >= 2) {
            initials += fullname[1][0]
        }
        return <div>{initials}</div>
    }
    if (!board?.members) return <span className="sub-title">There are no members to display</span>
    if (!memberIdsToDsiaplay) return <Loader />
    return (
        <div className="task-member-container">
            {memberIdsToDsiaplay.map(memberId => {
                return (
                    <div className="member" key={memberId}>
                        <div className="member-icon">
                            {getMemberContent(memberId)}
                        </div>
                        {isTaskDetailsOpen && <React.Fragment>
                            <span className="member-name" onClick={() => onSetMember(isMemberOnTask(memberId), memberId, getMember(memberId).fullname)}>
                                {getMember(memberId).fullname}
                            </span>
                            {isMemberOnTask(memberId) && <div className="marked"></div>}
                        </React.Fragment>}
                    </div>)
            })}
        </div>
    )
}