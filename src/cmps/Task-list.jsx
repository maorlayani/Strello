import { TaskPreview } from './task-preview'
import { Droppable } from 'react-beautiful-dnd'
import React, { useEffect, useRef } from 'react'

export const TaskList = ({ tasks, groupId, group, isAddTask, handleChangeTask, task, openQuickEdit }) => {

    const taskListRef = useRef()
    const inputRef = useRef()

    useEffect(() => {
        if (!isAddTask) return
        inputRef.current.focus()
    }, [isAddTask])

    if (!tasks) return

    return (
        <Droppable droppableId={group.id}>
            {(provided) => (
                <section
                    ref={(el) => { taskListRef.current = el; provided.innerRef(el) }}
                    {...provided.droppableProps}>
                    <section className="task-list" >
                        {tasks.map((task, index) => {
                            return <TaskPreview
                                key={task.id}
                                task={task}
                                groupId={groupId}
                                // taskRef={taskListRef}
                                index={index}
                                groupTitle={group.title}
                                openQuickEdit={openQuickEdit} />
                        })}
                        {provided.placeholder}
                        {isAddTask && <div className="add-task-content task-preview">
                            <textarea
                                name="title"
                                id="title"
                                placeholder="Enter a title for this card..."
                                value={task.title}
                                onChange={handleChangeTask}
                                ref={inputRef}
                            ></textarea>
                        </div>}
                    </section>
                </section>
            )}
        </Droppable>
    )
}