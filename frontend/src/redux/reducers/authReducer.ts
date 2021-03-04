export interface AuthState {
    isLoggedIn:boolean,
    jwt?: string
}

const InitialState: AuthState = {
    isLoggedIn: false
}

type AddUser = {
    type: "ADD_USER",
    payload: {
        jwt: string,
        isLoggedIn: boolean
    }
}
type SetLoggedIn = {
    type: "SET_LOGGEDIN",
    payload: {
        isLoggedIn: boolean
    }
}

type ActionTypes = AddUser | SetLoggedIn

export const authReducer = (
    state: AuthState = InitialState,
    action: ActionTypes,
): AuthState => {

    switch(action.type) {
        case "ADD_USER":
            return {
                ...state,
                jwt: action.payload.jwt,
                isLoggedIn: action.payload.isLoggedIn
            }
        case "SET_LOGGEDIN":
            return {
                ...state,
                isLoggedIn: true
            }
        default:
            return state
    }

}