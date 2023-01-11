import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BoardsList } from './boards-list'
import { ImTrello } from 'react-icons/im'

export const SideMenu = ({ isSideBarOpen, toggleMenu }) => {

    const getMenuClass = () => {
        if (isSideBarOpen) return "side-menu open"
        return "side-menu"
    }

    return (
        <section
            className={getMenuClass()}>
            <header>
                <div className="logo-icon"><ImTrello /></div>
                <section className="header-txt">
                    sTrello Workspace
                </section>
                <section className="arrow-div" onClick={toggleMenu}><FaChevronLeft className="arrow" /></section>
                <section className="open-arrow-div" onClick={toggleMenu}><FaChevronRight className="arrow" /></section>
            </header>
            <section className="main">
                <section className="title">Your boards</section>
            </section>
            <section className="boards">
                {isSideBarOpen && <BoardsList />}
            </section>
        </section>
    )
}