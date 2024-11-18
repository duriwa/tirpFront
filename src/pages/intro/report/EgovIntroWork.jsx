import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavIntro';

import EgovAttachFile from 'components/EgovAttachFile';
import 'react-datepicker/dist/react-datepicker.css';

function EgovIntroWork() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('EgovAdminScheduleEdit [location] : ', location);

  const [scheduleDetail, setScheduleDetail] = useState({
    schdulDeptName: '관리자부서',
    schdulChargerName: '관리자',
    schdulKindCode: 2,
    reptitSeCode: '1',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [boardAttachFiles, setBoardAttachFiles] = useState();

  const convertDate = (str) => {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let date = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    return new Date(year, month - 1, date, hour, minute);
  };

  const retrieveDetail = () => {
    const retrieveDetailURL = `/schedule/${location.state?.schdulId}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    };
    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      let rawScheduleDetail = resp.result.scheduleDetail;
      //기본값 설정
      setScheduleDetail({
        ...scheduleDetail,
        ...rawScheduleDetail,
        startDate: convertDate(rawScheduleDetail.schdulBgnde),
        endDate: convertDate(rawScheduleDetail.schdulEndde),
        atchFileId: rawScheduleDetail.atchFileId.trim(),
      });
      setBoardAttachFiles(resp.result.resultFiles);
    });
  };

  const formValidator = (formData) => {
    if (formData.get('schdulNm') === null || formData.get('schdulNm') === '') {
      alert('일정명은 필수 값입니다.');
      return false;
    }
    if (formData.get('schdulCn') === null || formData.get('schdulCn') === '') {
      alert('일정내용은 필수 값입니다.');
      return false;
    }
    if (formData.get('schdulSe') === null || formData.get('schdulSe') === '') {
      alert('일정구분은 필수 값입니다.');
      return false;
    }
    if (
      formData.get('schdulIpcrCode') === null ||
      formData.get('schdulIpcrCode') === ''
    ) {
      alert('중요도는 필수 값입니다.');
      return false;
    }
    if (
      formData.get('reptitSeCode') === null ||
      formData.get('reptitSeCode') === ''
    ) {
      alert('반복구분은 필수 값입니다.');
      return false;
    }
    if (formData.get('schdulBgnde') > formData.get('schdulEndde')) {
      alert('종료일시는 시작일시보다 앞 설 수 없습니다.');
      return false;
    }
    return true;
  };
  const getDateFourteenDigit = (date) => {
    return (
      getYYYYMMDD(date).toString() +
      makeTwoDigit(date.getHours()) +
      makeTwoDigit(date.getMinutes()) +
      makeTwoDigit(date.getSeconds())
    );
  };
  const getYYYYMMDD = (date) => {
    return (
      date.getFullYear().toString() +
      makeTwoDigit(Number(date.getMonth() + 1)) +
      makeTwoDigit(date.getDate())
    );
  };
  const makeTwoDigit = (number) => {
    return number < 10 ? '0' + number : number.toString();
  };

  useEffect(function () {
    //initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('------------------------------EgovAdminScheduleEdit [End]');
  console.groupEnd('EgovAdminScheduleEdit');
  return (
    <div className='container'>
      <div className='c_wrap'>
        {/* <!-- Location --> */}
        <div className='location'>
          <ul>
            <li>
              <Link to={URL.MAIN} className='home'>
                Home
              </Link>
            </li>
            <li>
              <Link to={URL.ADMIN}>사이트관리</Link>
            </li>
            <li>일정관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className='layout'>
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className='contents SITE_SCHDULE_REG' id='contents'>
            {/* <!-- 본문 --> */}

            <div className='top_tit'>
              <h1 className='tit_1'>사이트관리</h1>
            </div>

            <h2 className='tit_2'>일정관리 상세보기 EgoIntroWork.jsx</h2>

            {/* <!-- 게시판 상세보기 --> */}
            <div className='board_view2'>
              <dl>
                <dt>
                  일정구분<span className='req'>필수</span>
                </dt>
                <dd>
                  <label className='f_select w_130' htmlFor='schdulSe'>
                    <select
                      id='schdulSe'
                      name='schdulSe'
                      title='일정구분'
                      value={scheduleDetail.schdulSe}
                      onChange={(e) =>
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulSe: e.target.value,
                        })
                      }
                    >
                      <option value=''>선택</option>
                      <option value='1'>회의</option>
                      <option value='2'>세미나</option>
                      <option value='3'>강의</option>
                      <option value='4'>교육</option>
                      <option value='5'>기타</option>
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  중요도<span className='req'>필수</span>
                </dt>
                <dd>
                  <label className='f_select w_130' htmlFor='schdulIpcrCode'>
                    <select
                      id='schdulIpcrCode'
                      name='schdulIpcrCode'
                      title='중요도'
                      value={scheduleDetail.schdulIpcrCode}
                      onChange={(e) =>
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulIpcrCode: e.target.value,
                        })
                      }
                    >
                      <option value=''>선택</option>
                      <option value='A'>높음</option>
                      <option value='B'>보통</option>
                      <option value='C'>낮음</option>
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='schdulDeptName'>형상번호</label>
                  <span className='req'>필수</span>
                </dt>
                <dd>
                  <input
                    className='f_input2 w_full'
                    type='text'
                    name='schdulDeptName'
                    title='부서'
                    id='schdulDeptName'
                    defaultValue={scheduleDetail.schdulDeptName}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        schdulDeptName: e.target.value,
                      })
                    }
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='schdulCn'>형상명</label>
                  <span className='req'>필수</span>
                </dt>
                <dd>
                  <textarea
                    className='f_txtar w_full h_100'
                    name='schdulCn'
                    id='schdulCn'
                    cols='30'
                    rows='10'
                    placeholder='형상명'
                    defaultValue={scheduleDetail.schdulCn}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        schdulCn: e.target.value,
                      })
                    }
                  ></textarea>
                </dd>
              </dl>
              <dl>
                <dt>
                  개발시작/완료일<span className='req'>필수</span>
                </dt>
                <dd className='datetime'>
                  <span className='line_break'>
                    <DatePicker
                      selected={scheduleDetail.startDate}
                      name='schdulBgnde'
                      className='f_input'
                      dateFormat='yyyy-MM-dd'
                      onChange={(date) => {
                        console.log('setStartDate : ', date);
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulBgnde: getDateFourteenDigit(date),
                          schdulBgndeYYYMMDD: getYYYYMMDD(date),
                          startDate: date,
                        });
                      }}
                    />
                    <span className='f_inn_txt'>~</span>
                  </span>
                  <span className='line_break'>
                    <DatePicker
                      selected={scheduleDetail.endDate}
                      name='schdulEndde'
                      className='f_input'
                      dateFormat='yyyy-MM-dd'
                      minDate={scheduleDetail.startDate}
                      onChange={(date) => {
                        console.log('setEndDate: ', date);
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulEndde: getDateFourteenDigit(date),
                          schdulEnddeYYYMMDD: getYYYYMMDD(date),
                          endDate: date,
                        });
                      }}
                    />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  반영예정일<span className='req'>필수</span>
                </dt>
                <dd className='datetime'>
                  <span className='line_break'>
                    <DatePicker
                      selected={scheduleDetail.endDate}
                      name='schdulEndDate'
                      className='f_input'
                      dateFormat='yyyy-MM-dd'
                      onChange={(date) => {
                        console.log('setStartDate : ', date);
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulBgnde: getDateFourteenDigit(date),
                          schdulBgndeYYYMMDD: getYYYYMMDD(date),
                          startDate: date,
                        });
                      }}
                    />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  진행상태<span className='req'>필수</span>
                </dt>
                <dd>
                  <label className='f_select w_130' htmlFor='schdulProgStatus'>
                    <select
                      id='schdulProgStatus'
                      name='schdulProgStatus'
                      title='진행상태'
                      value={scheduleDetail.schdulProgStatus}
                      onChange={(e) =>
                        setScheduleDetail({
                          ...scheduleDetail,
                          schdulProgStatus: e.target.value,
                        })
                      }
                    >
                      <option value=''>선택</option>
                      <option value='I'>진행중</option>
                      <option value='S'>중지</option>
                      <option value='W'>대기</option>
                      <option value='E'>완료</option>
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='schdulChargerName'>담당자</label>
                  <span className='req'>필수</span>
                </dt>
                <dd>
                  <input
                    className='f_input2 w_full'
                    type='text'
                    name='schdulChargerName'
                    id='schdulChargerName'
                    defaultValue={scheduleDetail.schdulChargerNm}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        schdulChargerNm: e.target.value,
                      })
                    }
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='schdulMemHour'>공수</label>
                  <span className='req'>필수</span>
                </dt>
                <dd>
                  <input
                    className='f_input2 w_full'
                    name='schdulMemHour'
                    id='schdulMemHour'
                    type='text'
                    defaultValue={scheduleDetail.schdulMemHour}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        schdulMemHour: e.target.value,
                      })
                    }
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='schdulCn'>비고</label>
                </dt>
                <dd>
                  <textarea
                    className='f_txtar w_full h_100'
                    name='schdulCn'
                    id='schdulCn'
                    cols='30'
                    rows='10'
                    defaultValue={scheduleDetail.schdulCn}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        schdulCn: e.target.value,
                      })
                    }
                  ></textarea>
                </dd>
              </dl>
              <EgovAttachFile
                fnChangeFile={(attachfile) => {
                  console.log('====>>> Changed attachfile file = ', attachfile);
                  const arrayConcat = { ...scheduleDetail }; // 기존 단일 파일 업로드에서 다중파일 객체 추가로 변환(아래 for문으로)
                  for (let i = 0; i < attachfile.length; i++) {
                    arrayConcat[`file_${i}`] = attachfile[i];
                  }
                  setScheduleDetail(arrayConcat);
                }}
                fnDeleteFile={(deletedFile) => {
                  console.log('====>>> Delete deletedFile = ', deletedFile);
                  setBoardAttachFiles(deletedFile);
                }}
                boardFiles={boardAttachFiles}
                //mode={props.mode}
              />

              {/* <!-- 버튼영역 --> */}
              <div className='board_btn_area'>
                <div className='left_col btn1'>
                  <button
                    className='btn btn_skyblue_h46 w_100'
                    onClick={() => console.log('33')}
                  >
                    {' '}
                    저장!
                  </button>
                  <a href='#!' className='btn btn_skyblue_h46 w_100'>
                    삭제
                  </a>
                </div>

                <div className='right_col btn1'>
                  <Link to={URL.INTRO} className='btn btn_blue_h46 w_100'>
                    목록
                  </Link>
                </div>
              </div>
              {/* <!--// 버튼영역 --> */}
            </div>
            {/* <!-- 게시판 상세보기 --> */}

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroWork;
