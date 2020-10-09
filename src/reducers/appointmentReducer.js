import { DELETE_APPOINTMENT, GET_APPOINTMENTS, GET_FULL_CALENDAR_JS_APPOINTMENTS, UPDATE_APPOINTMENT } from '../actions/types';

const initialState = {
    appointments: [],
    fullCalendarJsAppointments: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            };
        case GET_FULL_CALENDAR_JS_APPOINTMENTS:
            return {
                ...state,
                fullCalendarJsAppointments: action.payload
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.map((appointment) => (appointment.id === action.payload.id ? action.payload : appointment))
            };
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter((appointment) => (appointment.id !== action.payload.id))
            };
        default:
            return state;
    }
};