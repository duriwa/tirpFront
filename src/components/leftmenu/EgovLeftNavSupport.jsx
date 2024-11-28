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
              반영목록 작성
            </NavLink>
          </li>
          <li>
            <NavLink
              to={URL.SUPPORT_QNA}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              반영리스트 조회
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavSupport;
