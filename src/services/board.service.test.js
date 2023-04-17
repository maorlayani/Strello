import 'core-js'
import { boardService } from './board.service'
import { httpService } from './http.service'

jest.mock('./http.service')
jest.mock('./util.service')
jest.mock('./user.service')
const mockBoards = [
    {
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
    },
    {
        "_id": "B102",
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
]

describe.skip('board service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('query', () => {
        const filterBy = {}
        it('should return boards with given filterBy parameters', async () => {
            expect.assertions(2)
            httpService.get.mockResolvedValue(mockBoards)
            const res = await boardService.query()
            expect(httpService.get).toHaveBeenCalledWith(`board/`, { params: filterBy })
            expect(res).toEqual(mockBoards)
        })
        it('should throw an error if httpService.get fails', async () => {
            expect.assertions(1)
            const mockError = new Error('Server error, cannot get boards')
            httpService.get.mockRejectedValue(mockError)
            await expect(() => boardService.query(filterBy)).rejects.toThrow('Server error, cannot get boards')
        })
    })
    describe('getById', () => {
        const boardId = 'B101'
        it('should return board with given _id', async () => {
            expect.assertions(2)
            httpService.get.mockResolvedValue(mockBoards[0])
            const res = await boardService.getById(boardId)
            expect(httpService.get).toHaveBeenCalledWith(`board/${boardId}`, boardId)
            expect(res).toEqual(mockBoards[0])
        })
        it('should throw an error if httpService.get fails', async () => {
            expect.assertions(1)
            const mockError = new Error('Server error, cannot get board')
            httpService.get.mockRejectedValue(mockError)
            await expect(() => boardService.getById(boardId)).rejects.toThrow('Server error, cannot get board')
        })
    })
    describe('remove', () => {
        const boardId = 'B102'
        it('should delete board with given _id', async () => {
            httpService.delete.mockResolvedValue()
            await boardService.remove(boardId)
            expect(httpService.delete).toHaveBeenCalledWith(`board/${boardId}`)
        })
        it('should throw an error if httpService.delete fails', async () => {
            expect.assertions(1)
            const mockError = new Error('Server error, cannot remove board')
            httpService.delete.mockRejectedValue(mockError)
            await expect(() => boardService.remove(boardId)).rejects.toThrow('Server error, cannot remove board')
        })
    })
    describe('save', () => {
        it('should update existing board', async () => {
            expect.assertions(2)
            const mockBoard = mockBoards[0]
            httpService.put.mockResolvedValueOnce(mockBoard)
            const mockSavedBoard = await boardService.save(mockBoard)

            expect(httpService.put).toHaveBeenCalledWith(`board/${mockBoard._id}`, mockBoard)
            expect(mockSavedBoard).toEqual(mockBoard)
        })
        it('should throw an error if update existing board fails', async () => {
            expect.assertions(1)
            const mockBoard = mockBoards[0]
            const mockError = new Error('Server error, cannot update board')
            httpService.put.mockRejectedValue(mockError)
            await expect(() => boardService.save(mockBoard)).rejects.toThrow('Server error, cannot update board')
        })
        it('should create new board', async () => {
            expect.assertions(2)
            const mockBoard = {
                "title": "test3",
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
                        "id": "qLnbPd",
                        "createdAt": 1680548379149,
                        "byMember": {
                            "_id": "u199",
                            "fullname": "Guest",
                            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
                        }
                    }
                ]
            }
            const mockSavedBoard = {
                "title": "test3",
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
                        "id": "qLnbPd",
                        "createdAt": 1680548379149,
                        "byMember": {
                            "_id": "u199",
                            "fullname": "Guest",
                            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
                        }
                    }
                ],
                "labels": [
                    {
                        "id": "l101",
                        "title": "",
                        "color": "#7BC86C"
                    },
                    {
                        "id": "l102",
                        "title": "",
                        "color": "#F5DD29"
                    },
                    {
                        "id": "l103",
                        "title": "",
                        "color": "#FFAF3F"
                    },
                    {
                        "id": "l104",
                        "title": "",
                        "color": "#EF7564"
                    },
                    {
                        "id": "l105",
                        "title": "",
                        "color": "#CD8DE5"
                    },
                    {
                        "id": "l106",
                        "title": "",
                        "color": "#5BA4CF"
                    }
                ],
                "_id": "642b22d8f103116e461ee6e8",
                "isStarred": false,
                "createdBy": {
                    "_id": "u199",
                    "fullname": "Guest",
                    "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
                }
            }
            httpService.post.mockResolvedValueOnce(mockSavedBoard)
            // userService.getLoggedinUser.mockReturnValueOnce({ _id: 'user-id', fullname: 'Test User', imgUrl: 'user-image.png' })
            const actualSavedBoard = await boardService.save(mockBoard)

            expect(httpService.post).toHaveBeenCalledWith('board/', mockBoard)
            expect(actualSavedBoard).toEqual(mockSavedBoard)
            // expect(actualSavedBoard.createdBy).toEqual({ _id: 'user-id', fullname: 'Test User', imgUrl: 'user-image.png' })
        })
        it('should throw an error if create new board fails', async () => {
            expect.assertions(1)
            const mockBoard = {
                "title": "test3",
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
                        "id": "qLnbPd",
                        "createdAt": 1680548379149,
                        "byMember": {
                            "_id": "u199",
                            "fullname": "Guest",
                            "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1670317536/170_t4mend.png"
                        }
                    }
                ]
            }
            const mockError = new Error('Server error, cannot create new board')
            httpService.post.mockRejectedValue(mockError)
            await expect(() => boardService.save(mockBoard)).rejects.toThrow('Server error, cannot create new board')
        })
    })
})