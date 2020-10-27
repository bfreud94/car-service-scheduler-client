import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div id='area-one'>
                    <div id='area-one-carousel' className='carousel carousel slide' data-ride='carousel'>
                        <ol className='carousel-indicators'>
                            <li data-target='#area-one-carousel' data-slide-to='0' className='active' />
                            <li data-target='#area-one-carousel' data-slide-to='1' />
                            <li data-target='#area-one-carousel' data-slide-to='2' />
                        </ol>
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <h1 className='slideOneHeader'>Set up an appointment to get your car evaluted today!</h1>
                                <img className='d-block w-100 carImage' src={`${process.env.PUBLIC_URL}/resources/img/car1.jpg`} alt='First slide' />
                            </div>
                            <div className='carousel-item'>
                                <img className='d-block w-100 carImage' src={`${process.env.PUBLIC_URL}/resources/img/car2.jpg`} alt='Second slide' />
                            </div>
                            <div className='carousel-item'>
                                <img className='d-block w-100 carImage' src={`${process.env.PUBLIC_URL}/resources/img/car3.jpg`} alt='Third slide' />
                            </div>
                        </div>
                        <a className='carousel-control-prev' href='#area-one-carousel' role='button' data-slide='prev'>
                            <span className='carousel-control-prev-icon' aria-hidden='true' />
                            <span className='sr-only'>Previous</span>
                        </a>
                        <a className='carousel-control-next' href='#area-one-carousel' role='button' data-slide='next'>
                            <span className='carousel-control-next-icon' aria-hidden='true' />
                            <span className='sr-only'>Next</span>
                        </a>
                    </div>
                </div>
                <div id='area-two'>
                    <div className='area-two-text-wrapper'>
                        <h3>Make an appointment using our scheduler!</h3>
                        <h4 className='area-two-sub-text'>If you book now, you get a 15% discount!</h4>
                        <img className='area-two-business' src={`${process.env.PUBLIC_URL}/resources/img/business.png`} alt='Business' />
                    </div>
                    <img className='d-block w-100 scheduleImage' src={`${process.env.PUBLIC_URL}/resources/img/schedule.png`} alt='Schedule' />
                </div>
                <div id='area-three'>
                    <h1 className='area-three-header'>Check out our awesome reviews!</h1>
                    <div id='area-three-carousel' className='carousel area-three-carousel carousel slide' data-ride='carousel'>
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <div className='area-three-review-nyt'>
                                    <h4 className='area-three-review-nyt-text'>&quot;These guys are the best! They really know how to fix a car!&quot; ~New York Times</h4>
                                    <img className='area-three-review-nyt-image' src={`${process.env.PUBLIC_URL}/resources/img/nyt.png`} alt='New York Times' />
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='area-three-review-obama'>
                                    <h4 className='area-three-review-obama-text'>&quot;This is the best Car Service I have ever gotten. These business owners have done a fantastic job.&quot; ~Barack Obama</h4>
                                    <img className='area-three-review-obama-image' src={`${process.env.PUBLIC_URL}/resources/img/obama.jpg`} alt='Barack Obama' />
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <h4 className='area-three-review-wsj-text'>&quot;This business puts its customers first. I cannot wait to see them take off&quot; ~ Wall Street Journal</h4>
                                <img className='area-three-review-wsj-image' src={`${process.env.PUBLIC_URL}/resources/img/wsj.png`} alt='Wall Street Journal' />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;