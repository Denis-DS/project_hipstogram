import { getType } from 'typesafe-actions';
import * as actions from './actions'
import { TCommentsAction, ICommentsState } from './types'

const initialState: ICommentsState = {
    commentsData: []
}

export default (state: ICommentsState = initialState, action: TCommentsAction): ICommentsState => {
    switch (action.type) {
        case getType(actions.getComments.success):
            return {...state, commentsData: action.payload}
        default:
            return state
    }
}

