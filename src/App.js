import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home/Home';
import Schedule from './Components/Schedule/Schedule';
import ScheduleTable from './Components/ScheduleTable/ScheduleTable';
import SpecificAppointments from './Components/SpecificAppointments/SpecificAppointments';
import Navbar from './Components/Navbar/Navbar';
import store from './store';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path='/home'>
                    <Home />
                </Route>
                <Redirect exact from='/' to='/home' />
                <Route exact path='/schedule'>
                    <Schedule />
                </Route>
                <Route exact path='/scheduleTable'>
                    <ScheduleTable />
                </Route>
                <Route exact path='/specificAppointments'>
                    <SpecificAppointments />
                </Route>
            </Router>
        </Provider>
  );
}

export default App;
