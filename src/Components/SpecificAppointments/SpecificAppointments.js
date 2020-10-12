import React, { Component } from 'react';
import moment from 'moment';
import { Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { getSpecificAppointments } from '../../actions/appointmentActions';
import './SpecificAppointments.css';

class SpecificAppointments extends Component {

    constructor() {
        super();
        this.state = {
            appointments: [],
            start: moment(new Date()).add(-1, 'years').format('YYYY-MM-DD'),
            end: moment(new Date()).add(7, 'days').format('YYYY-MM-DD'),
            page: 0,
            rowsPerPage: 5
        };
    }

    changeDate = (param, e) => {
        this.setState({
            [param]: e.target.value
        });
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

    submitSpecificAppointments = async (e) => {
        e.preventDefault();
        const { start, end } = this.state;
        if (parseInt(start.split('-')[0], 10) <= 9999) {
            const response = await getSpecificAppointments(start, end);
            this.setState({
                appointments: response,
                page: 0
            });

        } else {
            // Error message for invalid date
        }
    }

    appointments = () => {
        const { appointments, page, rowsPerPage } = this.state;
        let appointmentRows = [];
        appointments.forEach((appointment, index) => {
            appointmentRows.push(
                <TableRow key={appointment.id}>
                    <TableCell id={`firstName${index}`}>{appointment.person.firstName}</TableCell>
                    <TableCell id={`lastName${index}`}>{appointment.person.lastName}</TableCell>
                    <TableCell id={`title${index}`}>{appointment.title}</TableCell>
                    <TableCell id={`start${index}`}>{appointment.start}</TableCell>
                    <TableCell id={`end${index}`}>{appointment.end}</TableCell>
                    <TableCell id={`severity${index}`}>{appointment.severity}</TableCell>
                    <TableCell id={`cost${index}`}>{appointment.cost}</TableCell>
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
        const { appointments, start, end, page, rowsPerPage } = this.state;
        return (
            <div>
                <div className='specific-appointments-buttons-container'>
                    <h2>Select a date range to see specific appointments</h2>
                    <form onSubmit={(e) => this.submitSpecificAppointments(e)}>
                        <h3>
                            Please enter a start date
                        </h3>
                        <input type='date' value={start} onChange={(e) => this.changeDate('start', e)} />
                        <h3>
                            Please enter an end date
                        </h3>
                        <input type='date' value={end} onChange={(e) => this.changeDate('end', e)} />
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
                <div className='specific-appointments-table-container'>
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
            </div>
        );
    }
}

export default SpecificAppointments;