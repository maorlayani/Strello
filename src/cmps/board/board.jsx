import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getActionUpdateBoard, setBoardBackgroundColor, toggleQuickEdit } from '../../store/board.actions'
import { GroupList } from '../board/group-list'
import { BoardHeader } from '../board/board-header'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleDrag } from '../../store/board.actions'
import { getBoard } from '../../store/board.actions'
import { SideMenu } from './side-menu'
import { socketService, SOCKET_EVENT_BOARD_UPDATE } from '../../services/socket.service'
import { Loader } from '../loader'
import { Dashboard } from '../../pages/dashboard.jsx'
import { FastAverageColor } from 'fast-average-color'
import { TaskQuickEdit } from '../board/task-quick-edit'

export const Board = () => {

    const board = useSelector(state => state.boardModule.board)
    const isQuickEditOpen = useSelector(state => state.boardModule.isQuickEditOpen)
    const dispatch = useDispatch()
    const params = useParams()
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [isDashboard, setIsDashboard] = useState(false)
    const [quickEditPos, setQuickEditPos] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [task, setTask] = useState(null)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BOARD_UPDATE, onSocketUpdateBoard);
        return () => {
            socketService.off(SOCKET_EVENT_BOARD_UPDATE, onSocketUpdateBoard)
        }
    }, [])

    const onSocketUpdateBoard = (newBoard) => {
        dispatch(getActionUpdateBoard(newBoard))
    }

    useEffect(() => {
        const boardId = params.boardId
        dispatch(getBoard(boardId))
    }, [])

    const toggleMenu = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const onEnd = result => {
        const { destination, source, type } = result
        if (!destination) return
        dispatch(
            handleDrag(board, source.droppableId, destination.droppableId, source.index, destination.index, type)
        )
    }

    const getAverageBackgroundColor = async (imgUrl) => {
        try {
            const fac = new FastAverageColor();
            const color = await fac.getColorAsync(imgUrl)
            dispatch(setBoardBackgroundColor(color.hex))
            return color
        } catch (err) {
            console.log('Cannot get average color', err)
        }
    }

    const toggleDashboard = () => {
        setIsDashboard(!isDashboard)
    }

    const getBoradBg = () => {
        let style = {}
        if (board.style?.imgUrl) {
            style = {
                backgroundImage: `url(${board.style.imgUrl})`,
                backgroundSize: "cover",
            }
            getAverageBackgroundColor(board.style.imgUrl)
        } else {
            style = { backgroundColor: board?.style?.bgColor }
            dispatch(setBoardBackgroundColor(board.style.bgColor))
        }
        return style
    }

    const getPosition = (evTarget, parent) => {
        return { top: parent.top, left: parent.left }
    }

    const openQuickEdit = (ev, currGroupId, currTask) => {
        ev.stopPropagation()
        const parentEl = ev.currentTarget.parentNode
        const position = parentEl.getBoundingClientRect()
        const style = getPosition(ev.target.getBoundingClientRect(), parentEl.getBoundingClientRect())
        setQuickEditPos({
            position,
            style
        })
        setGroupId(currGroupId)
        setTask(currTask)
        dispatch(toggleQuickEdit(true))
    }

    if (!board) return <Loader />

    return (
        <React.Fragment>
            <section className="board-container" style={getBoradBg()}>
                <SideMenu
                    isSideBarOpen={isSideBarOpen}
                    toggleMenu={toggleMenu} />

                <DragDropContext onDragEnd={onEnd}>
                    <section className="board">
                        <BoardHeader
                            board={board}
                            toggleDashboard={toggleDashboard} />
                        <GroupList board={board} openQuickEdit={openQuickEdit} />
                    </section>
                </DragDropContext>

            </section>
            <Outlet />
            {isDashboard && <Dashboard toggleDashboard={toggleDashboard} />}
            {isQuickEditOpen && <TaskQuickEdit task={task} boardId={params.boardId} groupId={groupId} pos={quickEditPos} />}
        </React.Fragment>
    )
}