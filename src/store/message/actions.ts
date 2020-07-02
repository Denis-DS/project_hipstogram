import {createAsyncAction, createAction} from 'typesafe-actions'
import {IMessagePayload, IPageData, IPageNumber} from './types'

export const setMessage = createAsyncAction(
    "message/SET_MESSAGE_REQUEST",
    "message/SET_MESSAGE_SUCCESS",
    "message/SET_MESSAGE_FAILURE",
)<IMessagePayload, string, string>()

export const deleteToastMessage = createAction(
    "message/DELTE_TOAST_MESSAGE"
)()

export const getMessages = createAsyncAction(
    "message/GET_MESSAGE_REQUEST",
    "message/GET_MESSAGE_SUCCESS",
    "message/GET_MESSAGE_FAILURE",
)<IPageNumber, IPageData, string>()