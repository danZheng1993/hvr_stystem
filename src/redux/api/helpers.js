import {findIndex} from 'lodash'

export const refreshResult = (list, update) => {
    let index = findIndex(list, {_id: update._id})
    list.splice(index, 1, update);
    return list
}