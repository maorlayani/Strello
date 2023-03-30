import { boardService } from "../services/board.service.js"

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

// Board actions
export function loadBoards(filterBY = {}) {
    return async (dispatch) => {
        try {
            const boards = await boardService.query(filterBY)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('Cannot load boards', err)
        }
    }
}

export function getBoard(boardId) {
    return async (dispatch) => {
        try {
            const updatedBoard = await boardService.getById(boardId)
            const { board } = dispatch({ type: 'SET_BOARD', board: updatedBoard })
            return board
        } catch (err) {
            console.log('Cannot get board by id', err)
            throw (err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            const remove = await boardService.remove(boardId)
            dispatch(getActionRemoveBoard(boardId))
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board, activity) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board, activity)
            return dispatch(getActionAddBoard(savedBoard)).board
        } catch (err) {
            console.log('Cannot add board', err)
        }
    }
}

export function updateBoard(board, activity) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board, activity)
            return dispatch(getActionUpdateBoard(savedBoard))
        } catch (err) {
            console.log('Cannot save board', err)
        }
    }
}

// Group actions
export function addGroup(boardId, group, activity) {
    return async (dispatch) => {
        try {
            const updateBoard = await boardService.addGroupToBoard(boardId, group, activity)
            return dispatch(getActionUpdateBoard(updateBoard))
        } catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function removeGroup(boardId, groupId, activity) {
    return async (dispatch) => {
        try {
            const updateBoard = await boardService.removeGroupFromBoard(boardId, groupId, activity)
            return dispatch(getActionUpdateBoard(updateBoard))
        } catch (err) {
            console.log('Cannot remove group', err)
        }
    }
}

// Task actions
export function updateTask(boardId, groupId, taskForUpdate, activity) {
    return async (dispatch) => {
        try {

            const groupForUpdate = await boardService.getGroupById(boardId, groupId)
            const board = await boardService.getById(boardId)

            const idx = groupForUpdate.tasks.findIndex(task => task.id === taskForUpdate.id)
            groupForUpdate.tasks.splice(idx, 1, taskForUpdate)

            const groupIdx = board.groups.findIndex(group => group.id === groupForUpdate.id)
            board.groups.splice(groupIdx, 1, groupForUpdate)

            dispatch(updateBoard(board, activity))

            dispatch({
                type: 'SET_TASK',
                task: taskForUpdate
            })

            return board
        } catch (err) {
            console.log('Cannot complete updateTask', err)
            throw err
        }
    }
}

export function removeTask(boardId, groupId, taskForUpdate) {
    return async (dispatch) => {
        try {
            const groupForUpdate = await boardService.getGroupById(boardId, groupId)
            const board = await boardService.getById(boardId)

            const idx = groupForUpdate.tasks.findIndex(task => task.id === taskForUpdate.id)
            groupForUpdate.tasks.splice(idx, 1)

            const groupIdx = board.groups.findIndex(group => group.id === groupForUpdate.id)
            board.groups.splice(groupIdx, 1, groupForUpdate)

            dispatch(updateBoard(board))
            return board
        } catch (err) {
            console.log('Cannot complete removeTask', err)
            throw err
        }
    }
}

export function getTask(boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            const updatedTask = await boardService.getTaskById(boardId, groupId, taskId)
            const { task } = dispatch({
                type: 'SET_TASK',
                task: updatedTask
            })
            return task
        } catch (err) {
            console.log('Cannot load task', err)
        }
    }
}

// General actions
export function setTaskDetailsModal(isModalOpen, type) {
    return (dispatch) => {
        dispatch({
            type: 'SET_TASK_DETAILS_MODAL',
            taskDetailsModal: {
                isOpen: isModalOpen,
                type
            }
        })
    }
}

export function resizeLabel(resizeLabel) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'RESIZE_LABEL',
                resizeLabel
            })
        } catch (err) {
            console.log('Cannot resize label', err)

        }
    }
}

export function toggleQuickEdit(isQuickEditOpen) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGALE_TASK_QUICK_EDIT',
                isQuickEditOpen
            })
        } catch (err) {
            console.log('Cannot toggle task details', err)

        }
    }
}

export function setBoardBackgroundColor(color) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_BOARD_THEME_COLOR',
                boardThemeColor: color
            })
        } catch (err) {
            console.log('Cannot update background Color ', err)

        }
    }
}

// D&D board update
export function handleDrag(
    board,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
) {

    return async dispatch => {
        if (type === 'group') {
            // remove group from origin
            const group = board.groups.splice(droppableIndexStart, 1)
            // put group in new place
            board.groups.splice(droppableIndexEnd, 0, ...group)
        } else {
            // task within same group
            if (droppableIdStart === droppableIdEnd) {
                const group = board.groups.find(group => group.id === droppableIdStart)
                const task = group.tasks.splice(droppableIndexStart, 1)
                group.tasks.splice(droppableIndexEnd, 0, ...task)

            } else {
                // tasks in diff groups
                const groupStart = board.groups.find(group => group.id === droppableIdStart)

                // remove task from origin
                const task = groupStart.tasks.splice(droppableIndexStart, 1)

                // find destination group
                const groupEnd = board.groups.find(group => group.id === droppableIdEnd)

                // insert task in group
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...task)
            }
            // }
        }
        try {
            const boardToUpdate = await boardService.save(board)
            dispatch({
                type: 'UPDATE_BOARD',
                board: boardToUpdate,
            })
        } catch (err) {
            console.log('Cannot update board', err)
        }
    }
}