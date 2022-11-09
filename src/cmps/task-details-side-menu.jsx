import { BsCheck2Square, BsClock, BsTagFill } from "react-icons/bs"
import { FaWindowMaximize } from "react-icons/fa"
import { HiArchive, HiUser } from "react-icons/hi"
import { ImAttachment } from "react-icons/im"
import { ActionButton } from "./action-button"


export const TaskDetailsSideMenu = ({ toggleModal, onRemoveTask, task }) => {

    const getActionBtns = () => {
        const actionBtns = [
            {
                onClickFunc: toggleModal,
                iconCmp: HiUser,
                name: 'Members'
            },
            {
                onClickFunc: toggleModal,
                iconCmp: BsTagFill,
                name: 'Labels'
            },
            {
                onClickFunc: toggleModal,
                iconCmp: BsCheck2Square,
                name: 'Checklist'
            },
            {
                onClickFunc: toggleModal,
                iconCmp: BsClock,
                name: 'Dates'
            },
            {
                onClickFunc: toggleModal,
                iconCmp: ImAttachment,
                name: 'Attachment'
            },
            {
                onClickFunc: toggleModal,
                iconCmp: FaWindowMaximize,
                name: 'Cover'
            },
            {
                onClickFunc: onRemoveTask,
                iconCmp: HiArchive,
                name: 'Delete'
            }
        ]
        return actionBtns
    }
    return (
        <div className="task-main-container-right">
            <span className="add-to-card">Add to card</span>
            {getActionBtns().map(btn => {
                if (task?.style && btn.name === 'Cover') return ''
                return <ActionButton key={btn.name} onClickFunc={btn.onClickFunc} iconCmp={btn.iconCmp} name={btn.name} />
            })}
        </div>
    )
}