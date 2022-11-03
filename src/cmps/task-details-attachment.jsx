import React from "react"
import { ImAttachment } from "react-icons/im"


export const TaskDetailsAttachment = ({ task }) => {


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

    const getTime = (imgJson) => {
        return moment(imgJson.addedAt).fromNow()
    }

    return (
        <React.Fragment>
            {task?.attachments?.length > 0 && <section className="attachment">
                <div className="attachment-title">
                    <span className="icon"><ImAttachment /></span>
                    <span className="section-title">Attachment</span>
                </div>
                <div className="attachment-body-and-btn">
                    {task?.attachments.map(attachment => {
                        return (
                            <div className="attachment-body" key={attachment.id}>
                                <img className="img-attached" src={`${attachment.url}`} />
                                <div className="attachment-details">
                                    <span className="url-name">{attachment.urlName}{attachment.fileFormat ? `.${attachment.fileFormat}` : ''}</span>
                                    <div className="add-time-and-btns">
                                        <span className="Added-at">Added {getTime(attachment)}</span>
                                        <span>-</span>
                                        <span
                                            key={`${attachment.id}-dBtn`}
                                            className="btn-delete-attachment"
                                            onClick={() => onSetAttachment(true, attachment.id)}>Delete</span>
                                        <span>-</span>
                                        <span
                                            key={`${attachment.id}-eBtn`}
                                            className="btn-delete-attachment"
                                            onClick={(ev) => toggleEditAttachNameModal(ev, attachment.id)}>Edit</span>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {isEditAttachName && <AttachmentNameEditModal
                        toggleEditAttachNameModal={toggleEditAttachNameModal}
                        attachmentId={attachmentToEdit}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        editAttachNameModalPos={editAttachNameModalPos} />}
                    <button className="btn attachment" onClick={toggleAttachmentModal}>
                        <span className="ability">Add an attachment</span>
                    </button>
                </div>
            </section>}
            {isAttachmentModal && <AttachmentModal
                toggleAttachmentModal={toggleAttachmentModal}
                attachModalPos={attachModalPos} />}
        </React.Fragment>
    )
}