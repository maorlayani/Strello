
import { fireEvent, render, screen } from '@testing-library/react'
import { Signup } from './signup'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    Link: ({ children }) => children
}));

const mockUseDispatchMock = jest.fn()
jest.mock('react-redux', () => ({
    useDispatch: () => mockUseDispatchMock
}))


describe('signup', () => {
    const mockUser = {
        fullname: 'John Walls',
        username: 'Walls123',
        password: '12ab34'
    }
    describe('submit btn', () => {
        test('should not have enabled className when inputs are empty', () => {
            expect.assertions(1)
            render(<Signup />)
            const btnWrapper = screen.getByRole('button', { name: 'Continue' })
            expect(btnWrapper.classList.contains('enabled')).toBe(false)
        })
        test('should not have enabled className when password input empty', () => {
            expect.assertions(1)
            const user = {
                fullname: 'John Walls',
                username: 'Walls123',
                password: ''
            }
            render(<Signup fullname={user.fullname} username={user.username} password={user.password} />)
            const btnWrapper = screen.getByRole('button', { name: 'Continue' })
            expect(btnWrapper.classList.contains('enabled')).toBe(false)
        })
        test('should not have enabled className when username input empty', () => {
            expect.assertions(1)
            const user = {
                fullname: 'John Walls',
                username: '',
                password: '12ab34'
            }
            render(<Signup fullname={user.fullname} username={user.username} password={user.password} />)
            const btnWrapper = screen.getByRole('button', { name: 'Continue' })
            expect(btnWrapper.classList.contains('enabled')).toBe(false)
        })
        test('should not have enabled className when fullname input empty', () => {
            expect.assertions(1)
            const user = {
                fullname: '',
                username: 'Walls123',
                password: '12ab34'
            }
            render(<Signup fullname={user.fullname} username={user.username} password={user.password} />)
            const btnWrapper = screen.getByRole('button', { name: 'Continue' })
            expect(btnWrapper.classList.contains('enabled')).toBe(false)
        })
        test('should have enabled className to submit btn', () => {
            expect.assertions(1)
            const user = {
                fullname: 'John Walls',
                username: 'Walls123',
                password: '123456'
            }

            render(<Signup />)
            const fullnameInput = screen.getByPlaceholderText('Enter Full Name')
            const usernameInput = screen.getByPlaceholderText('Enter Username')
            const passwordInput = screen.getByPlaceholderText('Enter Password')
            fireEvent.change(fullnameInput, { target: { value: user.fullname } })
            fireEvent.change(usernameInput, { target: { value: user.username } })
            fireEvent.change(passwordInput, { target: { value: user.password } })
            const btnWrapper = screen.getByRole('button', { name: 'Continue' })

            expect(btnWrapper.classList.contains('enabled')).toBe(true)
        })
    })
    test('should trigger submit event with the user details', () => {
        window._virtualConsole.emit = jest.fn();
        expect.assertions(2)
        render(<Signup />)

        const fullnameInput = screen.getByPlaceholderText('Enter Full Name')
        const usernameInput = screen.getByPlaceholderText('Enter Username')
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        fireEvent.change(fullnameInput, { target: { value: mockUser.fullname } })
        fireEvent.change(usernameInput, { target: { value: mockUser.username } })
        fireEvent.change(passwordInput, { target: { value: mockUser.password } })
        fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

        expect(mockUseDispatchMock).toHaveBeenCalled()
        expect(mockedUsedNavigate).toHaveBeenCalled()
    })
})