import 'core-js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { boardService } from '../services/board.service'
import { addBoard, getBoard, removeBoard, updateBoard, toggleQuickEdit, resizeLabel, loadBoards } from './board.actions'
jest.mock('../services/board.service')

describe('Board actions', () => {
    let mockStore, store
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

    beforeEach(() => {
        const middlewares = [thunk]
        mockStore = configureMockStore(middlewares)
        store = mockStore({})
    })
    describe('board CRUDL', () => {
        test('creates SET_BOARD when call getBoard function', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.getById.mockResolvedValue(httpResp)
            await store.dispatch(loadBoards(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_BOARDS')
        })
        test('creates SET_BOARDS when call loadBoard function', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.query.mockResolvedValue(httpResp)
            await store.dispatch(getBoard(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_BOARD')
        })
        test('creates REMOVE_BOARD when user delete Board', async () => {
            expect.assertions(1)
            const httpResp = { msg: 'Removed succesfully' }
            boardService.remove.mockResolvedValue(httpResp)
            await store.dispatch(removeBoard(mockBoard._id))

            const action = store.getActions()[0]
            expect(action.type).toBe('REMOVE_BOARD')
        })
        test('creates ADD_BOARD when user add new board to workspace', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.save.mockResolvedValue(httpResp)
            await store.dispatch(addBoard(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('ADD_BOARD')
        })
        test('creates UPDATE_BOARD when user update board', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.save.mockResolvedValue(httpResp)
            await store.dispatch(updateBoard(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('UPDATE_BOARD')
        })
    })
})