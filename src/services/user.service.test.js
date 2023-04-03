import 'core-js'
import { httpService } from './http.service'
import { userService } from './user.service'
import { socketService } from './socket.service'

jest.mock('./http.service')
jest.mock('./socket.service')


const sessionStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key],
        setItem: (key, value) => store[key] = value.toString(),
        removeItem: (key) => delete store[key],
        clear: () => store = {}
    }
})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

const mockUser = { "fullname": "John Walls", "username": "Walls123", "id": "u101" }
const mockCred = { username: mockUser.username, password: "sk" }

describe('user service', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
        jest.clearAllMocks()
    })

    test('should login successfully', async () => {
        expect.assertions(4)
        const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem')
        const httpResp = mockUser
        httpService.post.mockResolvedValue(httpResp)
        const res = await userService.login(mockCred)

        expect(setItemSpy).toBeCalledWith('loggedinUser', JSON.stringify(mockUser))
        expect(httpService.post).toHaveBeenCalledWith('auth/login', mockCred)
        expect(socketService.login).toHaveBeenCalledWith(res.id)
        expect(res).toEqual(httpResp)
    })
    test('should signup successfully', async () => {
        expect.assertions(3)
        const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem')
        const httpResp = mockUser
        httpService.post.mockResolvedValue(httpResp)
        const res = await userService.signup(mockCred)

        expect(setItemSpy).toBeCalledWith('loggedinUser', JSON.stringify(mockUser))
        expect(httpService.post).toHaveBeenCalledWith('auth/signup', mockCred)
        expect(res).toEqual(httpResp)
    })
    test('should logout successfully', async () => {
        expect.assertions(2)
        const removeItemSpy = jest.spyOn(window.sessionStorage, 'removeItem')
        httpService.post.mockResolvedValue()
        userService.logout()

        expect(removeItemSpy).toBeCalledWith('loggedinUser')
        expect(httpService.post).toHaveBeenCalledWith('auth/logout')
    })
})    