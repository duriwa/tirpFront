import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';

function EgovQnaDetail() {
  return (
    <div className='container'>
      <div className='c_wrap'>
        {/* <!-- Location --> */}
        <div className='location'>
          <ul>
            <li>
              <Link to='' className='home'>
                Home
              </Link>
            </li>
            <li>
              <Link to=''>정기반영</Link>
            </li>
            <li>반영목록조회</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className='layout'>
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className='contents QNA_LIST' id='contents'>
            {/* <!-- 본문 --> */}

            <div className='top_tit'>
              <h1 className='tit_1'>반영목록 조회</h1>
            </div>

            <h2 className='tit_2'>20241127 정기반영</h2>

            <div className='board_view2'>
              <dl>
                <dt>현업테스트여부</dt>
                <dd>진행중</dd>
              </dl>
              <dl>
                <dt>형상진행 여부</dt>
                <dd>진행중</dd>
              </dl>
              <dl>
                <dt>시스템구분</dt>
                <dd>모바일창구, 사이버창구</dd>
              </dl>
              <dl>
                <dt>업무구분</dt>
                <dd>모바일창구, 사이버창구</dd>
              </dl>
              <dl>
                <dt>SR번호</dt>
                <dd>202410_0386</dd>
              </dl>
              <dl>
                <dt>요청제목</dt>
                <dd>판매인 휴대폰번호로 고객정보 등록 불가 적용 요청</dd>
              </dl>
              <dl>
                <dt>담당자</dt>
                <dd>한주희</dd>
              </dl>
              <dl>
                <dt>관련파트장</dt>
                <dd>정영석</dd>
              </dl>
              <dl>
                <dt>개발완료 합의일</dt>
                <dd>2024-11-13</dd>
              </dl>
              <dl>
                <dt>운영적용 일자</dt>
                <dd>2024-11-27</dd>
              </dl>
              <dl>
                <dt>테스트계획</dt>
                <dd>반영 후 화면으로 현업확인</dd>
              </dl>
              <dl>
                <dt>이관 후 모니터링 계획</dt>
                <dd>반영 후 화면으로 현업확인</dd>
              </dl>
              <dl>
                <dt>운영 영향도</dt>
                <dd>상</dd>
              </dl>
              <dl>
                <dt>구분</dt>
                <dd>SYSTEM</dd>
              </dl>
              <dl>
                <dt>반영시간</dt>
                <dd>18:00</dd>
              </dl>
              <dl>
                <dt>패키지여부</dt>
                <dd>N</dd>
              </dl>
              <dl>
                <dt>WAS재기동 여부</dt>
                <dd>Y</dd>
              </dl>
            </div>
            <div>
              <br></br>
            </div>
            {/* <!-- 답변달기 --> */}
            <div className='replay'>
              <div className='left_col'>
                <label htmlFor='replay_write'>답변달기</label>
                <div>
                  <textarea
                    className='f_txtar w_full'
                    name=''
                    id='replay_write'
                    cols='30'
                    rows='10'
                  ></textarea>
                </div>
              </div>
              <div className='right_col'>
                <a href='#!' className='btn '>
                  등록
                </a>
              </div>
            </div>
            {/* <!--// 답변달기 --> */}

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovQnaDetail;
