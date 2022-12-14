import { TaskModalLabelList } from "./task-modal-label-list"
import closeIcon from '../../../assets/img/icon-close-task-details.svg'

export const TaskModalLabel = ({ labelIds, onSetLabel, toggleModal }) => {

    return (
        <section className="task-model-label" >
            <img src={closeIcon} onClick={toggleModal} className="close-btn" />
            <div className="labels-modal-title">Labels</div>
            {/* <input type="text" placeholder="Search Labels..." className="label-search-input" /> */}
            <span className="sub-title">Labels</span>
            <TaskModalLabelList
                labelIds={labelIds}
                onSetLabel={onSetLabel} />
        </section>
    )
}


