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

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var board
    var resizeLabel
    var isQuickEditOpen

    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SET_TASK':
            newState = { ...state, task: action.task }
            break
        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, board: null }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            board = { ...action.board }
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards, board }
            break

        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: [...state.filterBy, action.filter] }
            break

        case 'RESIZE_LABEL':
            resizeLabel = action.resizeLabel
            newState = { ...state, resizeLabel }
            break

        case 'SET_BOARD_THEME_COLOR':
            newState = { ...state, boardThemeColor: action.boardThemeColor }
            break

        case 'TOGGALE_TASK_QUICK_EDIT':
            isQuickEditOpen = action.isQuickEditOpen
            newState = { ...state, isQuickEditOpen: isQuickEditOpen }
            break

        case 'SET_TASK_DETAILS_MODAL':
            newState = { ...state, taskDetailsModal: action.taskDetailsModal }
            break
        default:
    }
    return newState
}
