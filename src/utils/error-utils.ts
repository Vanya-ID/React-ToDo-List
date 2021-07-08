import {setAppStatusAC, setErrorStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";

export const handleServerAppError = (dispatch: Dispatch<ErrorActionsType>, message: string) => {
    dispatch(setErrorStatusAC(message))
    dispatch(setAppStatusAC('failed'))
}

export type ErrorActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorStatusAC>