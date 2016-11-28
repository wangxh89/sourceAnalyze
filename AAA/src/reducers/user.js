import * as TYPES from '../common/Types';
// 未登录的情况下的 state(最开始的应用状态)
const initialState = {
    isLoggedIn: false,
    user: {},
    status: null,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case TYPES.LOGGING:
            return {
                ...state,
                status: 'doing',
            };
        case TYPES.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                status: 'done'
            }
        case TYPES.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                status: null,
            }
        default:
            return state;

    }
}
