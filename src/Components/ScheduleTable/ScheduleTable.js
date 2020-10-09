import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import $ from 'jquery';
import { getAppointments, updateAppointment, deleteAppointment } from '../../actions/appointmentActions';
import store from '../../store';
import './ScheduleTable.css';

export class ScheduleTable extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
    }

    componentDidMount() {
        if (store.getState().appointments.appointments.length === 0) {
            this.props.getAppointments();
        }
    }

    changePage = (e, newPage) => {
        this.setState({
            page: newPage
        });
    }

    changeRowsPerPage = (e) => {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(e.target.value, 10)
        });
    }

    updateAppointment = (index, id) => {
        const data = this.parseData(index, id);
        this.props.updateAppointment(data);
    }

    deleteAppointment = (id) => {
        this.props.deleteAppointment(id);
    }

    parseData = (index, id) => {
        const map = {};
        map.id = map.id || [];
        map.id.push(id);
        map.id = map.id[0];
        const personMap = {};
        personMap.firstName = personMap.firstName || [];
        personMap.firstName.push($('#firstName' + index).text());
        personMap.firstName = personMap.firstName[0];

        personMap.lastName = personMap.lastName || [];
        personMap.lastName.push($('#lastName' + index).text());
        personMap.lastName = personMap.lastName[0];

        map.person = map.person || [];
        map.person = personMap;

        map.title = map.title || [];
        map.title.push($('#title' + index).text());
        map.title = map.title[0];

        map.start = map.start || [];
        map.start.push($('#start' + index).text());
        map.start = map.start[0];

        map.end = map.end || [];
        map.end.push($('#end' + index).text());
        map.end = map.end[0];

        map.severity = map.severity || [];
        map.severity.push($('#severity' + index).text());
        map.severity = map.severity[0];

        map.cost = map.cost || [];
        map.cost.push($('#cost' + index).text());
        map.cost = map.cost[0];

        return map;
    }

    appointments = () => {
        const { page, rowsPerPage } = this.state;
        const { appointments } = store.getState().appointments;
        let appointmentRows = [];
        appointments.forEach((appointment, index) => {
            appointmentRows.push(
                <TableRow key={appointment.id}>
                    <TableCell id={`firstName${index}`} contentEditable suppressContentEditableWarning>{appointment.person.firstName}</TableCell>
                    <TableCell id={`lastName${index}`} contentEditable suppressContentEditableWarning>{appointment.person.lastName}</TableCell>
                    <TableCell id={`title${index}`} contentEditable suppressContentEditableWarning>{appointment.title}</TableCell>
                    <TableCell id={`start${index}`} contentEditable suppressContentEditableWarning>{appointment.start}</TableCell>
                    <TableCell id={`end${index}`} contentEditable suppressContentEditableWarning>{appointment.end}</TableCell>
                    <TableCell id={`severity${index}`} contentEditable suppressContentEditableWarning>{appointment.severity}</TableCell>
                    <TableCell id={`cost${index}`} contentEditable suppressContentEditableWarning>{appointment.cost}</TableCell>
                    <TableCell>
                        <button type='button' className='btn btn-success' onClick={() => this.updateAppointment(index, appointment.id)}>Save</button>
                    </TableCell>
                    <TableCell>
                        <button type='button' className='btn btn-danger' onClick={() => this.deleteAppointment(appointment.id)}>Delete</button>
                    </TableCell>
                </TableRow>
            );
        });
        appointmentRows = appointmentRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        return (
            <React.Fragment>
                {appointmentRows}
            </React.Fragment>
        );
    }

    render() {
        const { page, rowsPerPage } = this.state;
        const { appointments } = store.getState().appointments;
        return (
            <div className='schedule-table-container'>
                <h1>Here is a list of every upcoming appointment</h1>
                <TableContainer>
                    <Table id='scheduleTable' className='table table-striped table-bordered' style={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Issue Description</TableCell>
                                <TableCell>Start Repair Date</TableCell>
                                <TableCell>Approximate End Repair Date</TableCell>
                                <TableCell>Severity (out of 10)</TableCell>
                                <TableCell>Cost of Repair</TableCell>
                                <TableCell>Save Information</TableCell>
                                <TableCell>Delete Appointment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.appointments()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    onChangePage={this.changePage}
                    onChangeRowsPerPage={this.changeRowsPerPage}
                    page={page}
                />
            </div>
        );
    }
}

ScheduleTable.propTypes = {
    getAppointments: PropTypes.func.isRequired,
    updateAppointment: PropTypes.func.isRequired,
    deleteAppointment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    getAppointments: state.appointments.appointments
});

export default connect(mapStateToProps, { getAppointments, updateAppointment, deleteAppointment })(ScheduleTable);