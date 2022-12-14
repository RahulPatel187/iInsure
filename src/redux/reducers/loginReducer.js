// loginReducer.js
import { SIGN_IN, SIGN_OUT, SET_USER_INFO, SET_HEALTH_CARD_API, SET_NOTIFICATION_COUNT } from '../types';

const initialState = {
    loading: true,
    userToken: '',
    userInfo: '',
    isCallHealthCardApi: false,
    notificationCount: 0
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                userToken: action.payload,
                loading: false
            };
        case SIGN_OUT:
            return {
                ...state,
                userToken: '',
                loading: false
            };
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case SET_HEALTH_CARD_API:
            return {
                ...state,
                isCallHealthCardApi: action.payload
            };
        case SET_NOTIFICATION_COUNT:
            return {
                ...state,
                notificationCount: action.payload
            };
        default:
            return state;
    }
}

export default loginReducer;