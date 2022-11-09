import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { TaskMember } from './task-member'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../store/board.actions'
import dots from '../assets/img/menu-icon-new.svg'
import { useState } from 'react'
import { ActivityMenu } from './activity-menu'
import { Loader } from './loader'

export const BoardHeader = ({ board, toggleDashboard }) => {
    const dispatch = useDispatch()
    const [isActivityMenuOpen, setIsActivityMenuOpen] = useState(false)

    const getMembersIds = () => {
        const membersIds = []
        board.members.forEach(member => membersIds.push(member._id))
        return membersIds
    }

    const toggleStarred = (board) => {
        const boardToSave = { ...board }
        boardToSave.isStarred = !board.isStarred
        dispatch(updateBoard(boardToSave))
    }

    const toggleBoardMenu = () => {
        setIsActivityMenuOpen(!isActivityMenuOpen)
    }

    if (!board) return <Loader />
    return (
        <section className="board-header">
            {board.title}
            <div className="star-container">
                {board.isStarred &&
                    <div
                        className="star marked"
                        onClick={() => toggleStarred(board)}>
                        <HiStar />
                    </div>}
                {!board.isStarred &&
                    <div
                        className="star"
                        onClick={() => toggleStarred(board)}>
                        <HiOutlineStar />
                    </div>}
            </div>
            <section className='space'>
            </section>

            <section className="flex-end-side">
                <section className="members">
                    {board.members?.length && <TaskMember memberIds={getMembersIds()} />}
                </section>
                <button className="btn-add" onClick={toggleDashboard}> Dashboard</button>

                {!isActivityMenuOpen && <section className="activitis-menu-container" onClick={toggleBoardMenu}>
                    <div className="menu-img-container">
                        <img src={dots} alt="menu" className="dots" />
                    </div>
                    <div className="show-menu-title">Show menu</div>
                </section>}
                {isActivityMenuOpen && <ActivityMenu toggleBoardMenu={toggleBoardMenu} />}
            </section>

        </section>
    )
}