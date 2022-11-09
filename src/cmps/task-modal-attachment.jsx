import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export const TaskModalAttachment = ({ onAddAttachment, toggleModal }) => {
    const [attachUrl, setAttachUrl] = useState(null)
    const [attachName, setAttachName] = useState(null)

    const onUploadAttacment = async (ev) => {
        try {
            const { url, urlName, fileFormat } = await uploadService.uploadImg(ev)
            onAddAttachment(ev, url, urlName, fileFormat)
        } catch (err) {
            console.log('Cannot add attacment', err)
        }
    }

    const onUpdateAttachUrl = (ev) => {
        setAttachUrl(ev.target.value)
    }

    const onUpdateAttachName = (ev) => {
        setAttachName(ev.target.value)
    }

    return (
        <section className="task-modal-attachment">
            <img src={closeIcon} onClick={toggleModal} className="btn-close" />
            <div className="modal-title">Attach from...</div>
            <button className="btn-upload">Computer
                <input type="file" onChange={onUploadAttacment} />
            </button>
            <form onSubmit={(ev) => onAddAttachment(ev, attachUrl, attachName)}>
                <label className="sub-title" htmlFor="add-attachment">Attach a link</label>
                <input name="link"
                    id="add-attachment"
                    type="text"
                    placeholder="Paste any link here..."
                    onChange={onUpdateAttachUrl} />
                {attachUrl &&
                    <div className="link-name-container">
                        <span className="sub-title">Link name (optional)</span>
                        <input name="link-name" type="text" onChange={onUpdateAttachName} />
                    </div>}
                <button className="btn-add-attach">Attach</button>
            </form>
        </section>
    )
}