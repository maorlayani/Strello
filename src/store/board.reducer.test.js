import 'core-js'
import { boardReducer } from './board.reducer'

describe.skip('board reducer', () => {
    const mockBoard = {
        "_id": "B101",
        "title": "Company Overview",
        "isStarred": false,
        "createdAt": 1664380690416,
        "createdBy": {
            "_id": "u101",
            "fullname": "Maor Layani",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
        },
        "style": {
            "bgColor": "#0079bf",
            "imgUrl": null,
            "thumbUrl": null
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "uNJDlX",
                "createdAt": 1664381690416.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": [
            {
                "id": "l101",
                "title": "",
                "color": "#7BC86C"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            }
        ],
        "groups": []
    }
    const initialState = {
        boards: [],
        filterBy: null,
        board: null,
        task: null,
        resizeLabel: false,
        boardThemeColor: '',
        isQuickEditOpen: false,
        taskDetailsModal: {
            isOpen: false,
            type: null
        }
    }
    beforeEach(() => {
        initialState.boards = []
        initialState.board = null
    })
    describe('board CRUDL', () => {
        test('creates initial state', () => {
            expect.assertions(1)
            const state = boardReducer(initialState)
            expect(state).toBe(initialState)
        })
        test('should set a boards in the state', () => {
            expect.assertions(2)
            let state = boardReducer(initialState)
            expect(state.boards).toEqual([])
            state = boardReducer(state, { type: 'SET_BOARDS', boards: [mockBoard] })
            expect(state.boards).toBeTruthy()
        })
        test('should set a board in the state', () => {
            expect.assertions(2)
            let state = boardReducer(initialState)
            expect(state.board).toBeFalsy()
            state = boardReducer(state, { type: 'SET_BOARD', board: mockBoard })
            expect(state.board).toBeTruthy()
        })
        test('should remove a board in boards state', () => {
            expect.assertions(3)
            initialState.boards = [mockBoard]
            initialState.board = mockBoard
            let state = boardReducer(initialState)
            expect(state.boards).toBeTruthy()
            state = boardReducer(state, { type: 'REMOVE_BOARD', boardId: mockBoard._id })
            expect(state.board).toBeFalsy()
            expect(state.boards).toEqual([])
        })
        test('should add a board in boards state', () => {
            expect.assertions(2)
            let state = boardReducer(initialState)
            expect(state.boards).toEqual([])
            state = boardReducer(state, { type: 'ADD_BOARD', board: mockBoard })
            expect(state.boards).toEqual([mockBoard])
        })
        test('should update board in boards state', () => {
            expect.assertions(2)
            initialState.boards = [mockBoard]
            let state = boardReducer(initialState)
            expect(state.boards).toBeTruthy()
            mockBoard.title = 'Unit tests'
            state = boardReducer(state, { type: 'UPDATE_BOARD', board: mockBoard })
            expect(state.boards).toEqual([mockBoard])
        })
    })
    describe('general actions types', () => {
        test('should handle SET_TASK_DETAILS_MODAL', () => {
            expect.assertions(2)
            let state = boardReducer(initialState)
            expect(state.taskDetailsModal).toEqual({ isOpen: false, type: null })
            const action = { isOpen: true, type: 'cover' }
            state = boardReducer(state, {
                type: 'SET_TASK_DETAILS_MODAL',
                taskDetailsModal: action
            })
            expect(state.taskDetailsModal).toEqual({ isOpen: true, type: 'cover' })
        })
        test('should handle TOGGALE_TASK_QUICK_EDIT', () => {
            expect.assertions(2)
            let state = boardReducer(initialState)
            expect(state.isQuickEditOpen).toEqual(false)
            state = boardReducer(state, { type: 'TOGGALE_TASK_QUICK_EDIT', isQuickEditOpen: true })
            expect(state.isQuickEditOpen).toEqual(true)
        })
        test('should handle SET_BOARD_THEME_COLOR', () => {
            let state = boardReducer(initialState)
            expect(state.boardThemeColor).toBeFalsy()
            state = boardReducer(state, { type: 'SET_BOARD_THEME_COLOR', boardThemeColor: '#0079bf' })
            expect(state.boardThemeColor).toBeTruthy()
        })
        test('should handle RESIZE_LABEL', () => {
            let state = boardReducer(initialState)
            expect(state.resizeLabel).toBeFalsy()
            state = boardReducer(state, { type: 'RESIZE_LABEL', resizeLabel: true })
            expect(state.resizeLabel).toBeTruthy()
        })
    })
})