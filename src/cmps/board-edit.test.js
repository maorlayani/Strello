import 'core-js'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react';
import { BoardEdit } from './board-edit'

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

const mockUseDispatchMock = jest.fn()
jest.mock('react-redux', () => ({
    useDispatch: () => mockUseDispatchMock
}))

describe.skip('board edit', () => {
    it('should disable the create board button when the title is empty', () => {
        expect.assertions(1)
        render(<BoardEdit />)

        const btnWrapper = screen.getByRole('button', { name: 'Create' })
        expect(btnWrapper.classList.contains('btn-enabled')).toBe(false)
    })
    it('should enable the create board button when the title is not empty', () => {
        expect.assertions(1)
        render(<BoardEdit />)

        const boardTitleInput = screen.getByLabelText('Board title*')
        fireEvent.change(boardTitleInput, { target: { value: 'Test Board' } })
        const btnWrapper = screen.getByRole('button', { name: 'Create' })
        expect(btnWrapper.classList.contains('btn-enabled')).toBe(true)
    })
    it('should save the board and navigate to its page when the create board button is clicked', () => {
        // expect.assertions(2)
        render(<BoardEdit />)

        const boardTitleInput = screen.getByLabelText('Board title*')
        fireEvent.change(boardTitleInput, { target: { value: 'Test Board' } })
        fireEvent.click(screen.getByRole('button', { name: 'Create' }))

        expect(mockUseDispatchMock).toHaveBeenCalled()
        // expect(mockedUseNavigate).toHaveBeenCalled( )
    })
})
