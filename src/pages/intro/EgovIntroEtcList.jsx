import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import * as XLSX from 'xlsx';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavIntro';


function EgovIntroEtcList(props) {

  // eslint-disable-next-line no-unused-vars
 //const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [paginationInfo, setPaginationInfo] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  const cndRef = useRef();
  const wrdRef = useRef();

  const userId = location.state?.userId || "";

  console.log('EgovIntroEtcList [location] : ', location);
  console.log('EgovIntroEtcList [userId] : ', userId);

  const DATE = new Date();
  const FIRST_DAY_OF_THIS_WEEK = new Date(
    DATE.getFullYear(),
    DATE.getMonth(),
    DATE.getDate() - DATE.getDay()
  );

  const getWeekOfMonth = (date) => {
    let adjustedDate = date.getDate() + date.getDay();
    console.log(
      'getWeekOfMonth : ',
      date,
      date.getDate(),
      date.getDay(),
      adjustedDate,
      adjustedDate / 7,
      0 | (adjustedDate / 7)
    );
    let weeksOrder = [0, 1, 2, 3, 4, 5];
    let returnVal = parseInt(weeksOrder[0 | (adjustedDate / 7)]);
    console.log('returnVal:', returnVal);
    return returnVal;
  };

  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || {
      schdulSe: '',
      year: FIRST_DAY_OF_THIS_WEEK.getFullYear(),
      month: FIRST_DAY_OF_THIS_WEEK.getMonth(),
      date: FIRST_DAY_OF_THIS_WEEK.getDate(),
      weekDay: FIRST_DAY_OF_THIS_WEEK.getDay(),
      weekOfMonth: getWeekOfMonth(FIRST_DAY_OF_THIS_WEEK),
    }
  );

  const [scheduleList, setScheduleList] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const changeDate = (target, amount) => {
    let changedDate;

    if (target === CODE.DATE_YEAR) {
      changedDate = new Date(
        searchCondition.year + amount,
        searchCondition.month,
        searchCondition.date
      );
    }

    if (target === CODE.DATE_MONTH) {
      changedDate = new Date(
        searchCondition.year,
        searchCondition.month + amount,
        searchCondition.date
      );
    }

    if (target === CODE.DATE_WEEK) {
      // let addtionOfDays = 7 * amount - searchCondition.weekDay;
      let addtionOfDays = 7 * amount;
      changedDate = new Date(
        searchCondition.year,
        searchCondition.month,
        searchCondition.date + addtionOfDays
      ); //다음주의 첫날
    }
    console.log('changedDate : ', changedDate);
    setSearchCondition({
      ...searchCondition,
      year: changedDate.getFullYear(),
      month: changedDate.getMonth(),
      date: changedDate.getDate(),
      weekDay: changedDate.getDay(),
      weekOfMonth: getWeekOfMonth(changedDate),
    });
  };

  

  const retrieveList = useCallback(
    
    (srchcnd) => {
      console.log("retrieveList");
      console.log("==>   ", srchcnd);
      console.log("====>", retrieveList);

      var loginData = JSON.parse(sessionStorage.getItem("loginUser"));

    
      const requestData = {
        sawonCd: loginData.id,
        eduNm: srchcnd.searchWrd
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestData),
      };
  
      EgovNet.requestFetch(`/srchEtc`, requestOptions, function (resp) {
        console.log('정상!!!');
        var data = resp.result.result;
        console.log(data);
  
        let mutListTag = [];
        mutListTag = [];
        data.forEach((item, i) => {
          mutListTag.push(
            <div id='linkTest'>
              <Link to={URL.INTRO_ETC}>
                <div className='list_item' key={i}>
                  <div id="div1" style={{width: '60px;'}}>{item.gubun}</div>
                  <div id="div2" style={{width: '60px;'}}>{item.gubundetail}</div>
                  <div id="div3" style={{width: '200px;'}}>{item.edunm}</div>
                  <div id="div4" style={{width: '70px;'}}>{item.stdt}</div>
                  <div id="div5" style={{width: '70px;'}}>{item.enddt}</div>
                  <div id="div6" style={{width: '230px;'}}>{item.bigo}</div>
                </div>
              </Link>
            </div>
          );
        });
        
        setExcelData(data);
        setListTag(mutListTag);
      });
    




    }
  );

  const Location = React.memo(function Location() {
    return (
      <div className='location'>
        <ul>
          <li>
            <Link to={URL.MAIN} className='home'>
              Home
            </Link>
          </li>
          <li>
            <Link to={URL.INTRO}>주간업무보고</Link>
          </li>
          <li>기타(교육, 휴가)</li>
        </ul>
      </div>
    );
  });

  const getTimeForm = (str) => {
    let hour = str.substring(8, 10);
    let starminute = str.substring(10, 12);
    return hour + ':' + starminute;
  };

  useEffect(() => {
    retrieveList(searchCondition);
    //setListTag([]); // 상태 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition]);

  const excelDownload = () => {
    console.log('엑셀!!');

    // 워크북 만들기
    const ws = XLSX.utils.json_to_sheet(excelData); // JSON 데이터를 시트 형식으로 변환
    const wb = XLSX.utils.book_new(); // 새로운 워크북 생성
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // 시트를 워크북에 추가

    // 엑셀 파일 다운로드
    XLSX.writeFile(wb, '주간업무보고_기타(교육,휴가).xlsx');
  };

  return (
    <div className='container'>
      <div className='c_wrap'>
        {/* <!-- Location --> */}
        <Location />
        {/* <!--// Location --> */}

        <div className='layout'>
          {/* <!-- Navigation --> */}
          <EgovLeftNav />
          {/* <!--// Navigation --> */}

          <div className='contents WEEK_SCHEDULE' id='contents'>
            {/* <!-- 본문 --> */}

            <div className='top_tit'>
              <h1 className='tit_1'>주간보고</h1>
            </div>

            <h2 className='tit_2'>기타(교육, 휴가)</h2>

            {/* <!-- 검색조건 --> */}
            <div className="condition">
                <ul>
                    <li className="third_1 L">
                        <span className="lb">검색유형선택</span>
                        <label className="f_select" htmlFor="searchCnd">
                            <select id="searchCnd" name="searchCnd" title="검색유형선택" ref={cndRef}
                                onChange={e => {
                                    cndRef.current.value = e.target.value; 
                                }}
                            >
                                <option value="0">교육명</option>
                                <option value="1">아이디</option>
                            </select>
                        </label>
                    </li>
                    <li className="third_2 R">
                        <span className="lb">검색어</span>
                        <span className="f_search w_400">
                            <input type="text" name="" defaultValue={searchCondition && searchCondition.searchWrd} placeholder="" ref={wrdRef}
                                onChange={e => {
                                    wrdRef.current.value = e.target.value;
                                }}
                            />
                            <button type="button"
                                onClick={() => {
                                    retrieveList({ searchCnd: cndRef.current.value, searchWrd: wrdRef.current.value });
                                }}>조회</button>
                        </span>
                    </li>
                </ul>
                <ul style={{paddingTop: '15px'}}>
                <li>
                      <Link
                        to={URL.INTRO_ETC}
                        //state={{ bbsId: bbsId }}
                        className='btn btn_blue_h46 pd35'
                      >
                        등록
                      </Link>
                    </li>
                    <li>
                      <Link className='btn btn_blue_h46 pd35' onClick={() => excelDownload()}>다운로드</Link>
                    </li>
                </ul>
            </div>
            {/* <!--// 검색조건 --> */}
            {/* <!--// 검색조건3 3--> */}

            {/* <!-- 게시판목록 --> */}
            <div className='board_list BRD999'>
              <div className='head'>
                <span >구분</span>
                <span>구분상세</span>
                <span>교육명</span>
                <span>시작일자</span>
                <span>종료일자</span>
                <span>기타</span>
              </div>
              <div className='result'>{listTag}</div>
            </div>
            {/* <!--// 게시판목록 --> */}

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroEtcList;
