import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_BOARD_UPDATE = 'board-update'
// export const SOCKET_EVENT_TASK_UPDATE = 'task-update'
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'  //
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'//
export const SOCKET_EVENT_ADD_MEMBER = 'task-add-member'//
export const SOCKET_EMIT_MEMBER = 'task-member'//
export const SOCKET_EVENT_DND = 'dnd'//
export const SOCKET_EMIT_DND = 'dnd-executed'//
// export const SOCKET_EVENT_BOARD = 'board'//------------------
// export const SOCKET_EMIT_BOARD = 'board-update'//-----------------
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
console.log('baseUrl', baseUrl);
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        // const user = { username: 'bla', fullname: 'blabla', _id: '123' }
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      console.log('emit');
      socket.emit(eventName, data)
    },
    login(userId) {
      console.log('SOCKET_EMIT_LOGIN-userId', userId);
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    // addLabel() {
    //   socket.emit(SOCKET_EVENT_ADD_LABEL)
    // },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login() {
    },
    logout() {
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
    },
  }
  window.listenersMap = listenersMap
  return socketService
}


// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
