import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavSupport() {
  return (
    <div className='nav'>
      <div className='inner'>
        <h2>정기반영목록</h2>
        <ul className='menu4'>
          <li>
            <NavLink
              to={URL.SUPPORT_DOWNLOAD}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              반영목록
            </NavLink>
          </li>
          <li>
            <NavLink
              to={URL.SUPPORT_QNA}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              묻고답하기
            </NavLink>
          </li>
          <li>
            <NavLink
              to={URL.SUPPORT_APPLY}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              서비스신청
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavSupport;
