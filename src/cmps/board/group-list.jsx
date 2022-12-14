import { useState } from 'react'
import { GroupEdit } from './group-edit'
import { GroupPreview } from './group-preview'
import { useDispatch, useSelector } from "react-redux"
import { updateBoard } from '../../store/board.actions'
import React, { useRef } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Loader } from '../loader'

export const GroupList = ({ openQuickEdit }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const groupListRef = useRef()
    const dispatch = useDispatch()

    const onAddingGroup = () => {
        setIsAddingGroup(!isAddingGroup)
    }

    const addTask = async (groupToUpdate, activity) => {
        let boardToSave = { ...board }
        boardToSave.groups = boardToSave.groups.map(group => (group.id === groupToUpdate.id) ? groupToUpdate : group)
        dispatch(updateBoard(boardToSave, activity))
    }

    if (!board) return <Loader />
    return (
        <React.Fragment>
            <Droppable
                droppableId="groups"
                direction="horizontal"
                type="group"
            >
                {(provided) => (
                    <div
                        ref={(el) => { groupListRef.current = el; provided.innerRef(el) }}
                        {...provided.droppableProps}
                        className="group-list-dnd"
                    >
                        <section className="group-list">
                            {board?.groups?.map((group, index) => {
                                return <GroupPreview
                                    key={group.id}
                                    group={group}
                                    addTask={addTask}
                                    index={index}
                                    openQuickEdit={openQuickEdit}
                                />
                            })}
                            {!isAddingGroup &&
                                <div className="btn-add-group-container" onClick={onAddingGroup}>
                                    <span className="btn-add-group">+ Add another list</span>
                                </div>}
                            {isAddingGroup && <GroupEdit onAddingGroup={onAddingGroup} boardId={board._id} />}
                        </section>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </React.Fragment>
    )
}