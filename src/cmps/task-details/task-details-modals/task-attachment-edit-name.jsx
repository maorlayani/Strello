import closeIcon from '../../../assets/img/icon-close-task-details.svg'
import { useState } from 'react'

export const TaskAttachmentEditName = ({ toggleEditAttachNameModal, attachment, task, onUpdateTask, editAttachNameModalPos }) => {

    const [attachName, setAttachName] = useState(attachment.name || '')

    const onChangeAttachName = (ev) => {
        setAttachName(ev.target.value)
    }

    const onUpdateAttachmentName = (ev) => {
        ev.preventDefault()
        toggleEditAttachNameModal()
        attachment.name = attachName
        const idx = task.attachments.findIndex(attach => attach.id === attachment.id)
        task.attachments.splice(idx, 1, attachment)
        onUpdateTask(task)
    }

    return (
        <section className="task-modal-attachment" style={{ ...editAttachNameModalPos.style }}>
            <img src={closeIcon} onClick={toggleEditAttachNameModal} className="btn-close" />
            <div className="modal-title">Edit attachment</div>
            <form onSubmit={onUpdateAttachmentName}>
                <label className="sub-title">Link name</label>
                <input type="text" onChange={onChangeAttachName} value={attachName} />
                <button className="btn-add">Update</button>
            </form>
        </section>
    )
}