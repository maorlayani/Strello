import 'core-js'
import { userReducer } from './user.reducer'

describe.skip('user reducer', () => {
    const mockUser = { fullname: 'John Walls', username: 'Walls123', id: 'u101' }
    const initialState = {
        user: null,
        users: [],
        watchedUser: null
    }
    it('creates initial state', () => {
        expect.assertions(1)
        const state = userReducer(initialState)
        expect(state).toBe(initialState)
    })
    it('should set a user in the state', () => {
        expect.assertions(2)
        let state = userReducer(initialState)
        expect(state.user).toBeFalsy()
        state = userReducer(initialState, { type: 'SET_USER', user: mockUser })
        expect(state.user).toBeTruthy()
    })
})