import { createAsyncAction } from 'typesafe-actions'
import { IGetCommentsRequest, IGetCommentsSuccess, ISetCommentPayload } from './types'

export const getComments = createAsyncAction(
    "comment/GET_COMMENT_REQUEST",
    "comment/GET_COMMENT_SUCCESS",
    "comment/GET_COMMENT_FAILURE"
)<IGetCommentsRequest, IGetCommentsSuccess[], void>()

export const setComment = createAsyncAction(
    "comment/SET_COMMENT_REQUEST",
    "comment/SET_COMMENT_SUCCESS",
    "comment/SET_COMMENT_FAILURE"
)<ISetCommentPayload, string, void>()