import 'core-js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { userService } from '../services/user.service'
import { onSignup, onLogin, onLogout } from './user.actions'

jest.mock('../services/user.service')

describe.skip('User actions', () => {
    let mockStore, store
    const authUser = { username: 'Walls123', password: '123456' }
    const mockUser = { fullname: 'John Walls', username: 'Walls123', id: 'u101' }

    beforeEach(() => {
        const middlewares = [thunk]
        mockStore = configureMockStore(middlewares)
        store = mockStore({})
    })
    it('creates SET_USER when user signup', async () => {
        expect.assertions(1)
        const httpResp = mockUser;
        userService.signup.mockResolvedValue(httpResp)
        await store.dispatch(onSignup(mockUser))

        const action = store.getActions()[0]
        expect(action.type).toBe('SET_USER')
    })
    it('creates SET_USER when user login', async () => {
        expect.assertions(1)
        const httpResp = mockUser;
        userService.login.mockResolvedValue(httpResp)
        await store.dispatch(onLogin(authUser))

        const action = store.getActions()[0]
        expect(action.type).toBe('SET_USER')
    })
    it('creates SET_USER when user logout', async () => {
        expect.assertions(1)
        const httpResp = undefined
        userService.logout.mockResolvedValue(httpResp)
        await store.dispatch(onLogout())

        const action = store.getActions()[0]
        expect(action.type).toBe('SET_USER')
    })
})