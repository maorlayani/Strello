import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ImTrello } from 'react-icons/im'
import { IoSearchSharp } from 'react-icons/io5'
import { SearchResult } from './search-result'
import { useSelector } from 'react-redux'
import { UserModal } from './user-modal'
import { loadBoards } from '../store/board.actions'
import { useDispatch } from 'react-redux'

export function AppHeader() {
    const refOne = useRef(null)
    const [results, setResults] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const pathname = useLocation().pathname
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boardModule.boards)
    const user = useSelector(state => state.userModule.user)
    const themeColor = useSelector(state => state.boardModule.boardThemeColor)

    useEffect(() => {
        if (!boards || !boards.length) dispatch(loadBoards())
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        return (
            () => {
                document.removeEventListener("click", handleClickOutside, false)
            }
        )
    }, [])

    const handleClickOutside = (e) => {
        if (!refOne.current) return
        if (!refOne.current.contains(e.target)) {
            setResults(null)
            setIsSearching(false)
            setSearchValue('')
        }
    }

    const handleChange = ({ target }) => {
        setSearchValue(target.value)
        if (!target.value) setResults(null)
        else setResults(boards.filter(b => b.title.toLowerCase().includes(target.value.toLowerCase())))
    }

    const onSearching = () => {
        setIsSearching(true)
    }

    const _getHeaderClass = () => {
        if (pathname === "/board") {
            return "app-header workspace"
        }
        else if (pathname.includes("/board")) {
            return "app-header"
        } else {
            return "app-header home"
        }
    }

    const getUserImg = () => {
        const guestImgUrl = "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
        if (!user?.imgUrl) return {
            backgroundImage: `url(${guestImgUrl})`
        }
        return { backgroundImage: `url(${user.imgUrl}` }
    }

    const toggleUserModal = () => {
        setIsUserModalOpen(!isUserModalOpen)
    }

    if (pathname.includes("/signup") || pathname.includes("/login")) return <section></section>

    return (
        <section className={_getHeaderClass()}
            style={(_getHeaderClass() === 'app-header' ?
                { backgroundColor: themeColor + 'cc' } : { backgroundColor: '#026AA7' })}>
            <Link to="/" className="home-logo-link" >
                <ImTrello className="trello-logo" />
                <section className="logo">
                    sTrello
                </section>
            </Link >
            <section className="nav-header">
                <ul className="nav-links-container">
                    <Link to="board" className="workspace-link">
                        <li className="nav-link">
                            Workspaces
                        </li>
                    </Link>
                </ul>
            </section>

            <section className={isSearching ? 'search search-wide' : 'search'} >
                <IoSearchSharp className="mag-glass" /><input type="text" onChange={handleChange} placeholder="Search" onClick={onSearching} value={searchValue} />
            </section>

            <section ref={refOne}>
                {results && <SearchResult
                    results={results}
                    setIsSearching={setIsSearching}
                    setResults={setResults} />}
            </section>
            <div className="user-icon" style={getUserImg()} onClick={toggleUserModal}></div>
            {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} user={user} getUserImg={getUserImg} />}

            <section className="space"></section>
            <Link to="login" className="login"><span>Log in</span></Link>
            <Link to="signup" className="signup"><span>sign up</span></Link>

        </section >
    )
}

