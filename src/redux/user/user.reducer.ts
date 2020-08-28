const SET_CURRENT_USER = 'SET_CURRENT_USER';

type UserACType = {
    type: typeof SET_CURRENT_USER
    currentUser: any
}

export const userAC = (currentUser: any): UserACType => {
    return {
        type: SET_CURRENT_USER,
        currentUser
    }
}

type ActionTypes = UserACType;

type UserStateType = {
    currentUser: any
}

const INITIAL_STATE: UserStateType = {
    currentUser: null
}

export const userReducer = (state: UserStateType = INITIAL_STATE, action: ActionTypes) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: action.currentUser};
        default:
            return state;
    }
}