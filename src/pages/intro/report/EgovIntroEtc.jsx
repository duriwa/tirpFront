import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavIntro';

import 'react-datepicker/dist/react-datepicker.css';

function EgovIntroWork() {
  const [ttext, tttext] = useState(''); // input
  const location = useLocation();
  console.log('EgovAdminScheduleEdit [location] : ', location);

  const [scheduleDetail, setScheduleDetail] = useState({});

  const convertDate = (str) => {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let date = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    return new Date(year, month - 1, date, hour, minute);
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
    if (formData.get('level') === null || formData.get('level') === '') {
      alert('중요도는 필수 값입니다.');
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

  /**
   * 저장
   */
  const fn_etcSave = () => {
    console.log('fn_etcSave');
    console.log(scheduleDetail);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(scheduleDetail),
    };

    EgovNet.requestFetch(`/insEtc`, requestOptions, function (resp) {
      console.log('정상');
      var data = resp.result;
      console.log(data);

      // tttext(data.test); // input 값 넣는 방법..

      // Insert 성공
      if (1 == data.result) {
        alert('등록 되었습니다.');

        console.log('🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎');
        setScheduleDetail({});
        console.log('🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎');
      }
    });
  };

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
              <Link to={URL.INTRO_WORKSLIST}>사이트관리</Link>
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

            <h2 className='tit_2'>휴가, 교육 작성 페이지</h2>

            {/* <!-- 게시판 상세보기 --> */}
            <div className='board_view2'>
              <dl>
                <dt>
                  일정구분<span className='req'>필수</span>
                </dt>
                <dd>
                  <label className='f_select w_130' htmlFor='gubun'>
                    <select
                      id='gubun'
                      name='gubun'
                      title='일정구분'
                      value={scheduleDetail.gubun}
                      onChange={(e) =>
                        setScheduleDetail({
                          ...scheduleDetail,
                          gubun: e.target.value,
                        })
                      }
                    >
                      <option value=''>선택</option>
                      <option value='1'>휴가</option>
                      <option value='2'>교육</option>
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  구분상세<span className='req'>필수</span>
                </dt>
                <dd>
                  <label className='f_select w_130' htmlFor='gubunDetail'>
                    <select
                      id='gubunDetail'
                      name='gubunDetail'
                      title='구분상세'
                      value={scheduleDetail.v}
                      onChange={(e) =>
                        setScheduleDetail({
                          ...scheduleDetail,
                          gubunDetail: e.target.value,
                        })
                      }
                    >
                      <option value=''>선택</option>
                      <option value='A'>반차</option>
                      <option value='B'>연차</option>
                      <option value='C'>교육</option>
                      <option value='D'>웹교육</option>
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='eduNm'>교육명</label>
                  <span className='req'>필수</span>
                </dt>
                <dd>
                  <input
                    className='f_input2 w_full'
                    type='text'
                    name='eduNm'
                    id='eduNm'
                    placeholder='교육명'
                    defaultValue={scheduleDetail.eduNm}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        eduNm: e.target.value,
                      })
                    }
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  시작일<span className='req'>필수</span>
                </dt>
                <dd className='datetime'>
                  <span className='line_break'>
                    <DatePicker
                      selected={scheduleDetail.stDt}
                      name='stDt'
                      className='f_input'
                      dateFormat='yyyy-MM-dd'
                      onChange={(date) => {
                        setScheduleDetail({
                          ...scheduleDetail,
                          stDt: date,
                        });
                      }}
                    />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  종료일<span className='req'>필수</span>
                </dt>
                <dd className='datetime'>
                  <span className='line_break'>
                    <DatePicker
                      selected={scheduleDetail.endDt}
                      name='endDt'
                      className='f_input'
                      dateFormat='yyyy-MM-dd'
                      onChange={(date) => {
                        setScheduleDetail({
                          ...scheduleDetail,
                          endDt: date,
                        });
                      }}
                    />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor='bigo'>비고</label>
                </dt>
                <dd>
                  <textarea
                    className='f_txtar w_full h_100'
                    name='bigo'
                    id='bigo'
                    cols='30'
                    rows='10'
                    defaultValue={scheduleDetail.bigo}
                    onChange={(e) =>
                      setScheduleDetail({
                        ...scheduleDetail,
                        bigo: e.target.value,
                      })
                    }
                  ></textarea>
                </dd>
              </dl>
              {/* <EgovAttachFile
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
              /> */}

              {/* <!-- 버튼영역 --> */}
              <div className='board_btn_area'>
                <div className='left_col btn1'>
                  <button
                    className='btn btn_skyblue_h46 w_100'
                    onClick={fn_etcSave}
                  >
                    저장
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
