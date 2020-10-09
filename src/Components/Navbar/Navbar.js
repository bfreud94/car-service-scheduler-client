import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <div className='navbar-freudware-wrapper'>
                    <a className='navbar-brand navbar-freudware' href='https://github.com/bfreud94' target='_blank' rel='noopener noreferrer'>Freudware</a>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon' />
                    </button>
                </div>
                <nav className='navbar navbar-expand-sm navbar-expand-lg'>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/home'>Home</Link>
                            </li>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/schedule'>Schedule</Link>
                            </li>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/scheduleTable'>&nbsp;&nbsp;Schedule Table</Link>
                            </li>
                            <li className='nav-item navbar-item'>
                                <Link className='nav-link' to='/specificAppointments'>&nbsp;&nbsp;Show Specific Appointments</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;