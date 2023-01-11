import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'
import { store } from '../store/store'
import { httpService } from './http.service'

const boardChannel = new BroadcastChannel('boardChannel')

    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getGroupById,
    getTaskById,
    removeGroupFromBoard,
    getBackground,
    addGroupToBoard,
    getTaskBackground,
    getLabelsColors,
    getBoardBackgrounds,
    getGuestUser
}
window.cs = boardService

const BASE_URL = `board/`

async function query(filterBy) {
    try {
        let boards = httpService.get(BASE_URL, { params: filterBy })
        if (filterBy?.title) {
            boards = boards.filter(b => b.title.toLowerCase().includes(filterBy.title.toLowerCase()))
        }
        return boards
    } catch (err) {
        console.log('Cannot complete the function query:', err)
        throw err
    }
}
async function getById(boardId) {
    try {
        return await httpService.get(BASE_URL + boardId, boardId)
    }
    catch (err) {
        console.log('Cannot complete the function getById:', err)
        throw err
    }
}

async function remove(boardId) {
    try {
        return await httpService.delete(BASE_URL + boardId)
    }
    catch (err) {
        console.log('Cannot complete the function remove:', err)
        throw err
    }
}

async function addGroupToBoard(boardId, group, activity) {
    try {
        let boardToUpdate = await getById(boardId)
        if (boardToUpdate?.groups) boardToUpdate.groups.push({ ...group })
        else boardToUpdate.groups = [group]
        return await save(boardToUpdate, activity)
    } catch (err) {
        console.log('Cannot complete the function addGroupToBoard:', err)
        throw err
    }
}
async function removeGroupFromBoard(boardId, groupId, activity) {
    try {
        let boardToUpdate = await getById(boardId)
        boardToUpdate.groups = boardToUpdate.groups.filter(group => group.id !== groupId)
        return await save(boardToUpdate, activity)
    } catch (err) {
        console.log('Cannot complete the function removeGroup:', err)
        throw err
    }
}

async function save(board, activity = null) {
    var savedBoard
    if (activity) _addActivityDetails(activity)
    if (board._id) {
        if (activity) board.activities.unshift(activity)
        savedBoard = await httpService.put(BASE_URL + board._id, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        if (activity) board.activities = [activity]
        savedBoard = await httpService.post(BASE_URL, board)
        savedBoard.isStarred = false
        const user = userService.getLoggedinUser()
        if (user) {
            savedBoard.createdBy = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            }
        } else {
            savedBoard.createdBy = {
                ...getGuestUser()
            }
        }
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

async function getGroupById(boardId, groupId) {
    try {
        const board = await httpService.get(BASE_URL + boardId)
        return board.groups.find(group => group.id === groupId)
    }
    catch (err) {
        console.log('Cannot complete the function getGroupById:', err)
        throw err
    }
}

function _addActivityDetails(activity) {
    activity.id = utilService.makeId()
    activity.createdAt = Date.now()
    if (!activity.byMember) {
        const user = userService.getLoggedinUser()
        if (user) {
            activity.byMember = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl || getGuestUser().imgUrl
            }
        } else {
            activity.byMember = {
                ...getGuestUser()
            }
        }
    }
    return activity
}

function getGuestUser() {
    return {
        _id: "u199",
        fullname: "Guest",
        imgUrl: "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
    }
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task

    } catch (err) {
        console.log('Cannot complete the function getTaskById:', err)
        throw err
    }
}

function getBackground(type) {
    if (type === 'url') {
        return [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197071/pawel-czerwinski-lKEvGdP0Oig-unsplash_xhxxbf.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187242/karsten-winegeart-j5z0DZMWViU-unsplash_yyaw6e.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187022/maxim-berg-Tba7ds4aF_k-unsplash_1_woirqi.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196414/ian-dooley-DJ7bWa-Gwks-unsplash_hr2qyq.jpg'
        ]
    } else if (type === 'color') {
        return ["#0079bf", "#d29034", "#519839", "#b04632", "#89609e"]
    }
}

function getTaskBackground(type) {
    if (type === 'url') {
        return [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348742/background-img-mountains_kqtnuv.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348746/background-img-fog_qkibl9.jpg',
            'https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY2MzM0ODI4OQ&ixlib=rb-1.2.1&q=80&w=200',
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x365/0eba7de903143c66f2ac55cdb0b7de58/photo-1662943523548-373718f22124.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg'
        ]
    } else if (type === 'color') {
        return [
            '#7BC86C',//green
            '#F5DD29',//yellow
            '#FFAF3F',//orange
            '#EF7564',//red
            '#CD8DE5',//purple
            '#5BA4CF',//accent-blue
            '#29CCE5',//accent-teal
            '#6DECA9',//light-green
            '#FF8ED4',//pink
            '#172B4D',//accent-gray
        ]
    }
}

function getLabelsColors() {

    return [
        '#D6ECD2', '#FAF3C0', '#FCE6C6', '#F5D3CE', '#EDDBF4',
        '#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5BA4CF',//accent-blue
        '#29CCE5',//accent-teal
        '#6DECA9',//light-green
        '#FF8ED4',//pink
        '#172B4D',//accent-gray
    ]
}

function getBoardBackgrounds() {
    return {
        colors: [
            '#0079bf', '#d29034', '#519839', '#b04632',
            '#89609e', '#cd5a91', '#4bbf6b', '#00aecc',
            '#838c91'
        ],
        imgs: [
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197071/pawel-czerwinski-lKEvGdP0Oig-unsplash_xhxxbf.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673421655/pawel-czerwinski-lKEvGdP0Oig-unsplash-min_v5gebi.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664186705/rrvviiii-EVEHo6gWzSM-unsplash_jqec7i.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358107/rrvviiii-EVEHo6gWzSM-unsplash-min_hsyg7m.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187242/karsten-winegeart-j5z0DZMWViU-unsplash_yyaw6e.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673353048/karsten-winegeart-j5z0DZMWViU-unsplash-min_o3rne4.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196200/alexander-sinn-KgLtFCgfC28-unsplash_viu9fl.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673354984/alexander-sinn-KgLtFCgfC28-unsplash-min_e3qint.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187022/maxim-berg-Tba7ds4aF_k-unsplash_1_woirqi.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356761/maxim-berg-Tba7ds4aF_k-unsplash-min_vzzpcs.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196311/ian-dooley-DuBNA1QMpPA-unsplash_cpw29l.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673422167/ian-dooley-DuBNA1QMpPA-unsplash-min_eqdmlp.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196414/ian-dooley-DJ7bWa-Gwks-unsplash_hr2qyq.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673357083/ian-dooley-DJ7bWa-Gwks-unsplash-min_lnhojz.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196528/jeremy-thomas-O6N9RV2rzX8-unsplash_ndcnyj.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356416/jeremy-thomas-O6N9RV2rzX8-unsplash-min_wnrfhl.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197377/ash-from-modern-afflatus-NQ6Lh81BTRs-unsplash_qoe8no.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673355189/ash-from-modern-afflatus-NQ6Lh81BTRs-unsplash-min_ncx2rj.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664382696/katie-smith-uQs1802D0CQ-unsplash_dwxpri.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358315/katie-smith-uQs1802D0CQ-unsplash-min_eorucd.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664382882/john-price-FE7ATjzRRMs-unsplash_cznmhq.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673357473/john-price-FE7ATjzRRMs-unsplash-min_fbj9bt.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664689530/frank-mckenna-OD9EOzfSOh0-unsplash_eyotjy.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673422464/frank-mckenna-OD9EOzfSOh0-unsplash-min_r3ppxb.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664692449/kyle-glenn-_AR74EoWdy0-unsplash_rhf2nb.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358500/kyle-glenn-_AR74EoWdy0-unsplash-min_zkygrg.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664698270/amy-shamblen-pJ_DCj9KswI-unsplash_dpiduu.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358755/amy-shamblen-pJ_DCj9KswI-unsplash-min_bxgvk7.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699079/raphael-biscaldi-7RQf2X6aXXI-unsplash_k6crnk.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358645/raphael-biscaldi-7RQf2X6aXXI-unsplash-min_v67zh8.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699491/ana-frantz-Pg6YGIJ97lw-unsplash_aj7dr4.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356285/ana-frantz-Pg6YGIJ97lw-unsplash-min_rupmh3.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664704915/kelly-sikkema-IZOAOjvwhaM-unsplash_m2ivzg.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673356955/kelly-sikkema-IZOAOjvwhaM-unsplash-min_wyhrch.jpg'
            },
            {
                imgUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664708145/sigmund-eTgMFFzroGc-unsplash_hg0wdj.jpg',
                thumbUrl: 'https://res.cloudinary.com/dqhrqqqul/image/upload/v1673358937/sigmund-eTgMFFzroGc-unsplash-min_rdpz4b.jpg'
            },
        ]
    }
}