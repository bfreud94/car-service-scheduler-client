import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getFullCalendarJsAppointments } from '../../actions/appointmentActions';
import store from '../../store';
import './Schedule.css';

class Schedule extends Component {

    componentDidMount() {
        this.modalListener();
        if (store.getState().appointments.fullCalendarJsAppointments.length === 0) {
            this.props.getFullCalendarJsAppointments();
        }
    }

    modalListener = () => {
        $('#myModal').on('shown.bs.modal', () => {
              $('#myInput').trigger('focus');
        });
    }

    createAppointment = () => {
        const appointment = this.getAppointmentData();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'schedule/scheduleAppointment',
            data: JSON.stringify(appointment),
            dataType: 'json'
        });
        window.location.reload();
    }

    getAppointmentData = () => {
        const appointmentData = {};
        appointmentData.firstName = $('#firstName').val();
        appointmentData.lastName = $('#lastName').val();
        appointmentData.title = $('#title').val();
        appointmentData.severity = $('#severity').val();
        appointmentData.start = $('#start').val();
        return appointmentData;
    }

    createRandomAppointment = () => {
        const randomAppointment = this.createRandomAppointmentData();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'schedule/scheduleAppointment',
            data: JSON.stringify(randomAppointment),
            dataType: 'json'
        });
        window.location.reload();
    }

    createRandomAppointmentData = () => {
        const appointmentData = {};
        appointmentData.firstName = Math.random().toString(36).replace('0.', '');
        appointmentData.lastName = Math.random().toString(36).replace('0.', '');
        appointmentData.title = Math.random().toString(36).replace('0.', '');
        appointmentData.severity = Math.floor(Math.random() * 10) + 1;
        appointmentData.start = this.createRandomDate();
        return appointmentData;
    }

    createRandomDate = () => {
        const year = '2019';
        const month = this.addLeadingZero(Math.floor(Math.random() * 12) + 1);
        const day = this.addLeadingZero(Math.floor(Math.random() * 21) + 1);
        const hour = this.addLeadingZero(Math.floor(Math.random() * 23) + 1);
        const minute = this.addLeadingZero(Math.floor(Math.random() * 60));
        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    }

    addLeadingZero = (time) => {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    render() {
        const fullCalendarJsAppointments = store.getState().appointments.fullCalendarJsAppointments;
        return (
            <div>
                <div className='schedule-body-wrapper'>
                    <div>
                        <h1 align='center'>Schedule an appointment to get your car fixed today!</h1>
                    </div>
                    <div className='schedule-button-wrapper'>
                        <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#scheduleModal'>Schedule Appointment</button>
                        <button type='button' id='randomAppointmentButton' className='btn btn-primary' onClick={() => this.createRandomAppointment()}>Schedule Random Appointment</button>
                    </div>
                    <div className='modal fade schedule' id='scheduleModal' tabIndex='-1' role='dialog' aria-labelledby='scheduleModalLabel' aria-hidden='true'>
                        <div className='modal-dialog' role='document'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='scheduleModalLabel'>Schedule Appointment</h5>
                                    <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                </div>
                                <div className='modal-body'>
                                    <div>
                                        First Name:
                                        <br />
                                        <input type='text' id='firstName' />
                                        <br />
                                        Last Name:
                                        <br />
                                        <input type='text' id='lastName' />
                                        <br />
                                        What are you coming in for?
                                        <br />
                                        <input type='text' id='title' />
                                        <br />
                                        How bad is the damage?
                                        <input type='text' id='severity' />
                                        <br />
                                        When would you like to bring in your car?
                                        <br />
                                        <input type='datetime-local' id='start' />
                                        <br />
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                                    <button type='button' id='createAppointment' className='btn btn-primary' data-dismiss='modal' onClick={() => this.createAppointment()}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div className='ui container'>
                    <div className='ui grid'>
                        <div className='ui sixteen column'>
                            <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' events={fullCalendarJsAppointments} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

Schedule.propTypes = {
    getFullCalendarJsAppointments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    fullCalendarJsAppointments: state.appointments.fullCalendarJsAppointments
});

export default connect(mapStateToProps, { getFullCalendarJsAppointments })(Schedule);