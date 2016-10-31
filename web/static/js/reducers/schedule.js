/**
 * Created by jonathan on 10/30/16.
 */
const initialState = [];

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "SCHEDULE_INIT":
            return {
                total: action.total,
                online: action.online,
                max_online: action.max_online,
            };
        default:
            return state;
    }
}