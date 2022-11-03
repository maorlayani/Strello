import { LightenDarkenColor } from "lighten-darken-color"
import PenIcon from '../assets/img/pen-icon.svg'

export const TaskModalLabelPreview = ({ label, onSetLabel, toggleEditLabelModal, taskLabelIds }) => {

    const isLabelOnTask = (labelId) => {
        if (taskLabelIds) return taskLabelIds.includes(labelId)
    }

    return (
        <li className="task-modal-label-preview">
            <div className="label-checkbox-container" onClick={(ev) => onSetLabel(ev, isLabelOnTask(label.id), label.id)}>
                <div className={"label-checkbox " + (isLabelOnTask(label.id) ? "is-done" : "")}></div>
                <div className="label-preview-content" style={{ backgroundColor: LightenDarkenColor(label.color, 35) }}>
                    <div className="label-icon" style={{ backgroundColor: label.color }} ></div>
                    <div className="label-title">{label.title}</div>
                </div>
            </div>
            <button className="btn-edit" onClick={(ev) => toggleEditLabelModal(ev, label)}>
                <img src={PenIcon} className="edit-pen-icon" />
            </button>
        </li>
    )
}