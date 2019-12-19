import {findIndex} from 'lodash'

export const refreshResult = (list, update) => {
    let index = findIndex(list, {_id: update._id})
    list.splice(index, 1, update);
    return list
}
export const addToArray = (list, item) => {
    let index = list.indexOf(item)
    if (index !== -1 || !item) {
        return list
    }
    list.push(item)
    return list.slice()
}
export const updateUnreadMessageList = (list, from) => {
    if (list[from]) {
        let count = list[from] + 1
        return {
            ...list,
            [from]: count
        }
    } else {
        return {
            ...list,
            [from]: 1       
        }
    }
}