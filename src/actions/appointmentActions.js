import moment from 'moment';
import { DELETE_APPOINTMENT, GET_APPOINTMENTS, GET_FULL_CALENDAR_JS_APPOINTMENTS, UPDATE_APPOINTMENT } from './types';

const serviceUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8080/api' : 'https://car-service-scheduler-server.herokuapp.com/api';

export const getAppointments = () => async (dispatch) => {
    const data = await (await fetch(`${serviceUri}/scheduleTable/getAllAppointments`)).json();
    dispatch({
        type: GET_APPOINTMENTS,
        payload: data
    });
};

export const getFullCalendarJsAppointments = () => async (dispatch) => {
    const data = await (await fetch(`${serviceUri}/schedule/fullCalendarJs`)).json();
    dispatch({
        type: GET_FULL_CALENDAR_JS_APPOINTMENTS,
        payload: data
    });
};

export const addAppointment = (appointment) => async (dispatch) => {
    const response = await (await fetch(`${serviceUri}/schedule/scheduleAppointment`, {
        method: 'POST',
        body: JSON.stringify({
            firstName: appointment.firstName,
            lastName: appointment.lastName,
            title: appointment.title,
            severity: appointment.severity,
            start: appointment.start
        })
    })).json();
    if (response.created) {
        dispatch(getAppointments());
    }
};

export const updateAppointment = (appointment) => async (dispatch) => {
    const response = await (await fetch(`${serviceUri}/scheduleTable/updateAppointment`, {
        method: 'PUT',
        body: JSON.stringify({
            person: {
                firstName: appointment.person.firstName,
                lastName: appointment.person.lastName
            },
            id: appointment.id,
            title: appointment.title,
            severity: appointment.severity,
            start: appointment.start,
            end: appointment.end,
            cost: appointment.cost
        })
    })).json();
    if (response.updated) {
        dispatch({
            type: UPDATE_APPOINTMENT,
            payload: response
        });
    }
};

export const deleteAppointment = (appointmentId) => async (dispatch) => {
    const response = await (await fetch(`${serviceUri}/scheduleTable/deleteAppointment`, {
        method: 'DELETE',
        body: appointmentId
    })).json();
    if (response.deleted) {
        dispatch({
            type: DELETE_APPOINTMENT,
            payload: response
        });
    }
};

export const getSpecificAppointments = async (start, end) => {
    start = formatDate(start);
    end = formatDate(end);
    const response = await (await fetch(`${serviceUri}/specificAppointments/specificAppointments?start=${start}&end=${end}`)).json();
    return response;
};

export const formatDate = (date) => {
    date = moment(date).format();
    date = date.substring(0, date.length - 9);
    return date;
};