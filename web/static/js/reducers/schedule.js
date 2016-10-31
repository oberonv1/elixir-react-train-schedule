/**
 * Created by jonathan on 10/30/16.
 */
const initialState = [];

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "SCHEDULE_INIT":
            console.log('init', action.schedule);
            return action.schedule;
        case "SCHEDULE_UPDATED":
            console.log('updated', action.schedule);
            return action.schedule;
        default:
            return state;
    }
}