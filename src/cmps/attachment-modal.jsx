import { useDispatch } from 'react-redux'
import { getImgUrl, getImgFromUrl } from '../store/board.actions'
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useState } from 'react'
import { utilService } from '../services/util.service'
import { useRef } from 'react'

export const AttachmentModal = ({ toggleAttachmentModal, attachModalPos }) => {
    const [url, setUrl] = useState(null)
    const [urlName, setUrlName] = useState(null)
    const [isLinkName, setIsLinkName] = useState(null)

    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null)


    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    const onGetImgUrl = (ev) => {
        dispatch(getImgUrl(ev))
    }

    const onUpdateUrl = (ev) => {
        if (!ev.target.value) {
            setIsLinkName(false)
            return
        }
        setIsLinkName(true)
        setUrl(ev.target.value)
    }

    const onUpdateName = (ev) => {
        setUrlName(ev.target.value)
    }

    const onGetImgFromUrl = (ev) => {
        ev.preventDefault()
        const newAttachment = {
            id: utilService.makeId(),
            url,
            urlName,
            createdAt: new Date(),
        }
        console.log('newAttachment', newAttachment)
        dispatch(getImgFromUrl(newAttachment))
    }
    console.log('url', url)
    return (
        <section className="attachment-modal" style={{ ...attachModalPos.style }}>
            <img src={closeIcon} onClick={toggleAttachmentModal} alt="close" className="close-btn" />
            <div className="labels-modal-title">Attach from...</div>
            <button className='btn-computer' onClick={handleClick}>Computer</button>
            <input type="file"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={onGetImgUrl} />
            <form onSubmit={onGetImgFromUrl}>
                <label className="sub-title" htmlFor="add-attachment">Attach a link</label>
                <input className="link-input"
                    id="add-attachment"
                    type="text"
                    placeholder="Paste any link here..."
                    onChange={onUpdateUrl} />
                {isLinkName &&
                    <div className="link-name">
                        <span className="sub-title">Link name (optional)</span>
                        <input className="link-input" type="text" onChange={onUpdateName} />
                    </div>}
                <button className="btn-attach">Attach</button>
            </form>
        </section>
    )
}