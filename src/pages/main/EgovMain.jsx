import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';

function EgovMain(props) {
  console.group('EgovMain');
  console.log('[Start] EgovMain ------------------------------');
  console.log('EgovMain [props] : ', props);

  const location = useLocation();
  console.log('EgovMain [location] : ', location);

  // eslint-disable-next-line no-unused-vars
  const [noticeBoard, setNoticeBoard] = useState();
  // eslint-disable-next-line no-unused-vars
  const [gallaryBoard, setGallaryBoard] = useState();
  const [noticeListTag, setNoticeListTag] = useState();
  const [gallaryListTag, setGallaryListTag] = useState();

  const retrieveList = useCallback(() => {
    console.groupCollapsed('EgovMain.retrieveList()');

    const retrieveListURL = '/mainPage';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        setNoticeBoard(resp.result.notiList);
        setGallaryBoard(resp.result.galList);

        let mutNotiListTag = [];
        mutNotiListTag.push(<li key='0'>검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

        // 리스트 항목 구성
        resp.result.notiList.forEach(function (item, index) {
          if (index === 0) mutNotiListTag = []; // 목록 초기화
          mutNotiListTag.push(
            <li key={item.nttId}>
              <Link
                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                state={{
                  nttId: item.nttId,
                  bbsId: item.bbsId,
                }}
              >
                {item.nttSj}
                <span>{item.frstRegisterPnttm}</span>
              </Link>
            </li>
          );
        });
        setNoticeListTag(mutNotiListTag);

        let mutGallaryListTag = [];
        mutGallaryListTag.push(<li key='0'>검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

        // 리스트 항목 구성
        resp.result.galList.forEach(function (item, index) {
          if (index === 0) mutGallaryListTag = []; // 목록 초기화
          mutGallaryListTag.push(
            <li key={item.nttId}>
              <Link
                to={{ pathname: URL.INFORM_GALLERY_DETAIL }}
                state={{
                  nttId: item.nttId,
                  bbsId: item.bbsId,
                }}
              >
                {item.nttSj}
                <span>{item.frstRegisterPnttm}</span>
              </Link>
            </li>
          );
        });
        setGallaryListTag(mutGallaryListTag);
      },
      function (resp) {
        console.log('err response : ', resp);
      }
    );
    console.groupEnd('EgovMain.retrieveList()');
  }, []);

  useEffect(() => {
    retrieveList();
  }, [retrieveList]);

  console.log('------------------------------EgovMain [End]');
  console.groupEnd('EgovMain');

  return (
    <div className='container P_MAIN'>
      <div className='c_wrap'>
        <div className='colbox'>
          <div className='left_col'>
            <img
              src='/assets/images/img_simple_main_tr.png'
              alt='단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다.'
            />
          </div>

          <div className='right_col'>
            <div className='mini_board'>
              <ul className='tab'>
                <li>
                  <a href='#공지사항' className='on'>
                    공지사항
                  </a>
                </li>
                <li>
                  <a href='#갤러리'>갤러리</a>
                </li>
              </ul>
              <div className='list'>
                <div className='notice'>
                  <h2 className='blind'>공지사항</h2>
                  <ul>{noticeListTag}</ul>
                  <Link to={URL.INFORM_NOTICE} className='more'>
                    더보기
                  </Link>
                </div>

                <div className='gallary'>
                  <h2 className='blind'>갤러리</h2>
                  <ul>{gallaryListTag}</ul>
                  <Link to={URL.INFORM_GALLERY} className='more'>
                    더보기
                  </Link>
                </div>
              </div>
            </div>

            <div className='banner'>
              <Link to={URL.SUPPORT_DOWNLOAD} className='bn1'>
                <strong>자료실</strong>
                <span>
                  다양한 자료를
                  <br />
                  다운로드 받으실 수 있습니다.
                </span>
              </Link>
              <Link to={URL.ABOUT} className='bn2'>
                <strong>자유게시판</strong>
                <span>
                  자유롭게 자기 생각을
                  <br />
                  표현해보세요.
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className='banner_bot'>
          <div className='b1'>
            <div>
              <h2>티아이리포트 소개 </h2>
              <p>티아이리포트의 주요 서비스를 소개합니다.</p>
            </div>
            <Link to={URL.INTRO_WORKSLIST}>자세히 보기 </Link>
          </div>
          <div className='b2'>
            <div>
              <h2>주간업무보고</h2>
              <p>
                한 주간의 업무 보고서를 작성하는 서비스입니다.
                <br />
                <br />
              </p>
            </div>
            <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
          </div>
          <div className='b3'>
            <div>
              <h2>정기반영목록</h2>
              <p>
                정기반영일에 반영하는
                <br />
                형상을 작성하여
                <br />
                보고하는 서비스입니다.
              </p>
            </div>
            <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
          </div>
          <div className='b4'>
            <div>
              <h2>공지사항</h2>
              <p>
                모두에게 알릴 소식을
                <br />
                공유하는 게시판 입니다.
              </p>
            </div>
            <Link to={URL.INFORM}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMain;
