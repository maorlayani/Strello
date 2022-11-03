import { TaskModalLabelList } from "./task-modal-label-list"
import closeIcon from '../assets/img/icon-close-task-details.svg'

export const TaskModalLabel = ({ labelIds, onSetLabel, toggleLabelsModal, labelModalPos }) => {

    return (
        <section className="task-model-label" style={{ ...labelModalPos.style }}>
            <img src={closeIcon} onClick={toggleLabelsModal} className="close-btn" />
            <div className="labels-modal-title">Labels</div>
            {/* <input type="text" placeholder="Search Labels..." className="label-search-input" /> */}
            <span className="sub-title">Labels</span>
            {/* <section className="label-detail-container"> */}
            <TaskModalLabelList
                labelIds={labelIds}
                onSetLabel={onSetLabel}
                pos={labelModalPos.style} />
            {/* </section> */}
        </section>
    )
}


