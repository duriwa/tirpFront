import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';
import URL from 'constants/url';

function EgovDownloadList() {
  const style = {
    tbody: {
      backgroundColor: 'black',
      display: 'flex',
      overflow: 'auto',
    },
  };

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
              <Link to=''>고객지원</Link>
            </li>
            <li>소개</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className='layout'>
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className='contents PDS_LIST' id='contents'>
            {/* <!-- 본문 --> */}

            <div className='top_tit'>
              <h1 className='tit_1'>정기반영목록</h1>
            </div>

            <h2 className='tit_2'>이름</h2>

            <h3 className='tit_5'>추천 다운로드 자료</h3>

            {/* <!-- 게시판목록 --> */}
            <div className='board_list BRD007'>
              <div className='head'>
                <table>
                  <thead>
                    <td>
                      <span>번호</span>
                    </td>
                    <td>
                      <span>소프트웨어명</span>
                    </td>
                    <td>
                      <span>다운</span>
                    </td>
                    <td>
                      <span>크기</span>
                    </td>
                    <td>
                      <span>등록일</span>
                    </td>
                  </thead>

                  <tbody></tbody>
                </table>
              </div>
              <div className='result'>
                {/* <!-- case : 데이터 없을때 --> */}
                {/* <p className="no_data" key="0">검색된 결과가 없습니다.</p> */}

                {/* <!-- case : 데이터 있을때 --> */}
                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className='list_item'>
                  <div>3</div>
                  <div className='al'>
                    전자정부표준프레임워크 인스톨러(Egovframework installer)
                    V1.037
                  </div>
                  <div>100</div>
                  <div>16Mb</div>
                  <div>2021-7-24</div>
                </Link>
                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className='list_item'>
                  <div>2</div>
                  <div className='al'>
                    전자정부표준프레임워크 인스톨러(Egovframework installer)
                    V1.037
                  </div>
                  <div>100</div>
                  <div>16Mb</div>
                  <div>2021-7-24</div>
                </Link>
                <Link to={URL.SUPPORT_DOWNLOAD_DETAIL} className='list_item'>
                  <div>1</div>
                  <div className='al'>
                    전자정부표준프레임워크 인스톨러(Egovframework installer)
                    V1.037
                  </div>
                  <div>100</div>
                  <div>16Mb</div>
                  <div>2021-7-24</div>
                </Link>
              </div>
            </div>
            <div className='board_bot'>
              {/* <!-- Paging --> */}
              <div className='paging'>
                <ul>
                  <li className='btn'>
                    <button to='#' className='first'>
                      처음
                    </button>
                  </li>
                  <li className='btn'>
                    <button to='#' className='prev'>
                      이전
                    </button>
                  </li>
                  <li>
                    <button to='#' className='cur'>
                      1
                    </button>
                  </li>
                  <li>
                    <button to='#'>2</button>
                  </li>
                  <li>
                    <button to='#'>3</button>
                  </li>
                  <li>
                    <button to='#'>4</button>
                  </li>
                  <li>
                    <button to='#'>5</button>
                  </li>
                  <li className='btn'>
                    <button to='#' className='next'>
                      다음
                    </button>
                  </li>
                  <li className='btn'>
                    <button to='#' className='last'>
                      마지막
                    </button>
                  </li>
                </ul>
              </div>
              {/* <!--/ Paging --> */}
            </div>

            {/* <!--// 게시판목록 --> ====================================================*/}

            <div className='board_btn_area'>
              <div className='left_col btn1'></div>

              <div className='right_col btn1'>
                <Link
                  to={URL.SUPPORT_DOWNLOAD_CREATE}
                  className='btn btn_upload'
                >
                  <span>엑셀다운</span>
                </Link>
                <Link
                  to={URL.ADMIN_USAGE_CREATE}
                  className='btn btn_blue_h46 pd35'
                >
                  삭제
                </Link>
                <Link
                  to={URL.ADMIN_USAGE_CREATE}
                  className='btn btn_blue_h46 pd35'
                >
                  저장
                </Link>
                <Link
                  to={URL.ADMIN_USAGE_CREATE}
                  className='btn btn_blue_h46 pd35'
                >
                  추가
                </Link>
              </div>
              <div></div>
            </div>

            {/* <!-- 게시판목록 --> */}
            <div className='board_list BRD009'>
              <div className='head' /*style={style.tbody}*/>
                <table>
                  <thead>
                    <td>
                      <span>현업테스트여부</span>
                    </td>
                    <td>
                      <span>형상진행여부</span>
                    </td>
                    <td>
                      <span>시스템구분</span>
                    </td>
                    <td>
                      <span>업무구분</span>
                    </td>
                    <td>
                      <span>SR번호</span>
                    </td>
                    <td>
                      <span>요청제목</span>
                    </td>
                    <td>
                      <span>담당자</span>
                    </td>
                    <td>
                      <span>관련파트장</span>
                    </td>
                    <td>
                      <span>개발완료합의일</span>
                    </td>
                    <td>
                      <span>운영적용일자</span>
                    </td>
                    <td>
                      <span>테스트계획</span>
                    </td>
                    <td>
                      <span>운영 영향도</span>
                    </td>
                    <td>
                      <span>구분</span>
                    </td>
                    <td>
                      <span>반영시간</span>
                    </td>
                    <td>
                      <span>패키지여부</span>
                    </td>
                    <td>
                      <span>WAS재기동여부</span>
                    </td>
                    <td>
                      <span>확인자</span>
                    </td>
                  </thead>

                  <tbody></tbody>
                </table>
              </div>
              <div className='result'> </div>
            </div>
            {/* <!--// 게시판목록 --> {listTag} */}

            <div className='board_bot'></div>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovDownloadList;
