import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BoardsList } from './boards-list'
import { ImTrello } from 'react-icons/im'
import { useSelector } from 'react-redux'

export const SideMenu = ({ isSideBarOpen, toggleMenu }) => {

    const themeColor = useSelector(state => state.boardModule.boardThemeColor)

    const _getMenuClass = () => {
        if (isSideBarOpen) {
            return "side-menu open"
        } else {
            return "side-menu"
        }
    }
    // console.log('render SIDE MENU')
    return (
        <section
            className={_getMenuClass()}
            style={(_getMenuClass() === 'side-menu open' ?
                { backgroundColor: themeColor } : { backgroundColor: '#ffffff42' })}>

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