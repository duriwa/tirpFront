import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavIntro() {
  return (
    <div className='nav'>
      <div className='inner'>
        <h2>주간보고</h2>
        <ul className='menu4'>
          <li>
            <NavLink
              to={URL.INTRO_WORKSLIST}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              주간보고
            </NavLink>
          </li>
          <li>
            <NavLink
              to={URL.INTRO_SERVICE}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              기타(교육, 휴가)
            </NavLink>
          </li>
          <li>
            <NavLink
              to={URL.INTRO_SERCH_DOWN}
              className={({ isActive }) => (isActive ? 'cur' : '')}
            >
              전체 조회 및 다운로드
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavIntro;
