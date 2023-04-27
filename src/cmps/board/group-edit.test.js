import 'core-js'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { GroupEdit } from './group-edit'

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

const mockUseDispatchMock = jest.fn()
jest.mock('react-redux', () => ({
    useDispatch: () => mockUseDispatchMock
}))

describe.skip('group edit', () => {

    it('should render the GroupEdit component', () => {
        expect.assertions(2)
        render(<GroupEdit boardId="B101" onAddingGroup={() => { }} />)
        expect(screen.getByPlaceholderText('Enter list title...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Add list' })).toBeInTheDocument()
    })

    it('should add a group to the board', () => {
        expect.assertions(1)
        render(<GroupEdit boardId="B101" onAddingGroup={() => { }} />)
        const inputElement = screen.getByPlaceholderText('Enter list title...')
        const addButton = screen.getByRole('button', { name: 'Add list' })

        fireEvent.change(inputElement, { target: { value: 'New Group' } })
        fireEvent.click(addButton)

        expect(mockUseDispatchMock).toHaveBeenCalled()
    })
})