import {setAppStatusAC, setErrorStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../api/todolists-api'

export const handleServerNetworkError = (dispatch: Dispatch<ErrorActionsType>, message: string) => {
    dispatch(setErrorStatusAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorActionsType>) => {
    if (data.messages.length) {
        dispatch(setErrorStatusAC(data.messages[0]))
    } else {
        dispatch(setErrorStatusAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export type ErrorActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorStatusAC>