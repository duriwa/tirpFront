import React from 'react';
import { Link } from 'react-router-dom';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                <h1>
                    <Link to="">
                        <img className="w" src="/assets/images/logo_footer_tr_w.png" alt="" />
                        <img className="m" src="/assets/images/logo_footer_tr_m.png" alt="" />
                    </Link>
                </h1>
                <div className="info">
                    <p>
                        대표문의메일 : desk@tireprot.com <span className="m_hide">|</span> <span className="copy">대표전화 : 02-3709-5992 <span className="m_hide">|</span> Copyright © 2024 Ti Report. All Rights Reserved.</span>
                        {/* 대표문의메일 : desk@tireprot.com  <span className="m_hide">|</span><br className="m_show" /><span className="copy">대표전화 : 02-3709-5992 Copyright © 2024 Ti Report. All Rights Reserved.</span> 호환성확인 : 000-0000-0000  |  교육문의 : 0000-0000-0000 */}
                    </p>
                    {/* <p className="copy">Copyright © 2024 Ti Report. All Rights Reserved.</p> */}
                </div>
                <div className="right_col">
                    {/* <Link to="">
                        <img className="w" src="/assets/images/banner_w_01.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_01.png" alt="" />
                    </Link>
                    <Link to="">
                        <img className="w" src="/assets/images/banner_w_02.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_02.png" alt="" />
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;