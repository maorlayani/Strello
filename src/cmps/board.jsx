import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { loadBoards } from '../store/board.actions'
import { GroupList } from './group-list'
import { BoardHeader } from './board-header'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleDrag } from '../store/board.actions'
import { getBoard } from '../store/board.actions'
import { SideMenu } from './side-menu'


// const taskRef = useRef()

export const Board = () => {

    const board = useSelector(state => state.boardModule.board)
    const resizeLabel = useSelector(state => state.boardModule.resizeLabel)
    // const [board, setBoard] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    let [isSideBarOpen, setIsSideBarOpen] = useState(false)

    useEffect(() => {
        loadBoard()
    }, [params.id])

    const loadBoard = async () => {
        const boardId = params.id
        try {
            // const board = await dispatch(getBoard(boardId))
            await dispatch(getBoard(boardId))
            // console.log('board', board)
            // setBoard(board)
        } catch (err) {
            // console.log('Cannot load board', err)
        }
    }

    const toggleMenu = () => {
        if (isSideBarOpen) {
            setIsSideBarOpen(false)
            return
        } else {
            setIsSideBarOpen(true)
        }
    }


    // const loadBoard = async () => {
    //     const boardId = params.id
    //     try {
    //         const board = await boardService.getById(boardId)
    //         setBoard(board)
    //     } catch (err) {
    //         console.log('Cannot load board', err)
    //     }
    // }


    const onEnd = result => {
        const { destination, source, type } = result
        if (!destination) return

        dispatch(
            handleDrag(board, source.droppableId, destination.droppableId, source.index, destination.index, type)
        )
    }

    const getBoradBg = () => {
        let style = {}
        if (board.style?.imgUrl) {
            style = {
                backgroundImage: `url(${board.style.imgUrl})`,
                backgroundSize: "cover",

            }
        } else style = { backgroundColor: board?.style?.bgColor }
        return style
    }


    if (!board) return <div>Loading...</div>

    return (
        <React.Fragment>
            <section className='board-container' style={getBoradBg()}>

                <SideMenu
                    isSideBarOpen={isSideBarOpen}
                    toggleMenu={toggleMenu} />

                <DragDropContext onDragEnd={onEnd}>
                    <section className="board" >
                        {/* <section className="board" style={getBoradBg()}> */}
                        <BoardHeader
                            board={board} />
                        <GroupList board={board} />
                    </section>
                </DragDropContext>


            </section>

        </React.Fragment>
    )
}