import React, { useState } from "react"
import { useSelector } from "react-redux"
import { TaskModalLabelPreview } from "./task-modal-label-preview"
import { EditLabelModal } from "./edit-labels-modal"

export const TaskModalLabelList = ({ labelIds, onSetLabel, pos }) => {

    const board = useSelector(state => state.boardModule.board)
    const [isEditLabelModal, setIsEditLabelModal] = useState(false)
    const [labelForEdit, setLabelForEdit] = useState(null)

    const toggleEditLabelModal = (ev, label) => {
        setLabelForEdit(label)
        setIsEditLabelModal(!isEditLabelModal)
    }

    return (
        <div className="task-modal-label-list">
            {isEditLabelModal && <EditLabelModal
                toggleEditLabelModal={toggleEditLabelModal}
                labelForEdit={labelForEdit}
                // style={{ ...pos }}
                onSetLabel={onSetLabel} />}
            <ul className="label-list">
                {board.labels.map(label => <TaskModalLabelPreview
                    label={label}
                    onSetLabel={onSetLabel}
                    toggleEditLabelModal={toggleEditLabelModal}
                    taskLabelIds={labelIds}
                    key={label.id} />)}
            </ul>
            <div className="border"></div>
            <button className="btn-create" onClick={(ev) => toggleEditLabelModal(ev, {})}>Create a new label</button>
        </div>
    )
}
