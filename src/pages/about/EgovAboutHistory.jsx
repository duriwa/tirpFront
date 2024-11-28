import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutHistory() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사이트 소개</Link></li>
                        <li>기록</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}
                    
                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        
                        <h2 className="tit_4">기록</h2>

                        <p className="msg_1">2024.04</p>
                        <img src='/assets/images/cop2404.jpeg' alt='TIREPORT 소개' width={'500px'} />
                        <p className="msg_1">2024.05</p>
                        <img src='/assets/images/cop2405.JPG' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.06</p>
                        <img src='/assets/images/cop2406.jpeg' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.07</p>
                        <img src='/assets/images/cop2407.JPG' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.08</p>
                        <img src='/assets/images/cop2408.jpg' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.09</p>
                        <img src='/assets/images/cop2409.jpg' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.10.1</p>
                        <img src='/assets/images/cop24101.jpeg' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.10.2</p>
                        <img src='/assets/images/cop24102.jpeg' alt='TIREPORT 소개'  width={'500px'} />
                        <p className="msg_1">2024.11</p>
                        <img src='/assets/images/cop2411.jpg' alt='TIREPORT 소개'  width={'500px'} />
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutHistory;