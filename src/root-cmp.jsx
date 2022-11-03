import React from 'react'

import './assets/styles/main.scss'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/app-header'
import { BoardPage } from './pages/board-page'
import { HomePage } from './pages/home-page'
import { Board } from './cmps/board'
import { Signup } from './pages/signup'
import { TaskDetails } from './pages/task-details'
import { Login } from './pages/login'

export const App = () => {
    return (
        <div className="app-container">
            <AppHeader />
            <main>
                <Routes>
                    <Route path='' element={<HomePage />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='login' element={<Login />} />
                    <Route path='board' element={<BoardPage />} />
                    <Route path='board/:boardId' element={<Board />} >
                        <Route path=':groupId/:taskId' element={<TaskDetails />} />
                    </Route >
                </Routes>
            </main>
        </div>
    )
}
