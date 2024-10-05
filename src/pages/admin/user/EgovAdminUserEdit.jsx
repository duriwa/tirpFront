import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'components/EgovRadioButtonGroup';


function EgovAdminUserEdit(props) {
    console.group("EgovAdminUserEdit");
    console.log("[Start] EgovAdminUserEdit ------------------------------");
    console.log("EgovAdminUserEdit [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
	const checkRef = useRef([]);
	
    console.log("EgovAdminUserEdit [location] : ", location);

    const replyPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const fileAtchPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const userTyCodeOptions = [{ value: "", label: "선택" }, { value: "BBST01", label: "일반사용자" }, { value: "BBST03", label: "공지사용자" }];
    const userAttrbCodeOptions = [{ value: "", label: "선택" }, { value: "BBSA02", label: "갤러리" }, { value: "BBSA03", label: "일반사용자" }];
    const posblAtchFileNumberOptions = [{ value: 0, label: "선택하세요" }, { value: 1, label: "1개" }, { value: 2, label: "2개" }, { value: 3, label: "3개" }];
    const userId = location.state?.userId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [userDetail, setUserDetail] = useState({});
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/userMng'
                });
                break;

            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: `/userMng/${userId}`
                });
                break;
			default:
                navigate({pathname: URL.ERROR}, {state: {msg : ""}});
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 조회/등록이면 조회 안함
            setUserDetail({
                tmplatId: "TMPLAT_BOARD_DEFAULT",  //Template 고정
                replyPosblAt: "Y",                 //답장가능여부 초기값
                fileAtchPosblAt: "Y"                //파일첨부가능여부 초기값
            });
            return;
        }

        const retrieveDetailURL = `/userMng/${userId}`;
        
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                // 수정모드일 경우 조회값 세팅
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setUserDetail(resp.result.userMngVO);
                }
            }
        );
    }

	const formValidator = (formData) => {
        if (formData.get('userNm') === null || formData.get('userNm') === "") {
            alert("사용자명은 필수 값입니다.");
            return false;
        }
        if (formData.get('oldPassword') != null && formData.get('oldPassword') != ""
            && (formData.get('newPassword') === null && formData.get('newPassword') === "")
        ) {
            alert("기존 암호를 입력하면 신규 암호는 필수 값입니다.");
            return false;
        }
        if (formData.get('newPassword') != null && formData.get('newPassword') != ""
            && (formData.get('oldPassword') === null && formData.get('oldPassword') === "")
        ) {
            alert("신규 암호를 입력하면 기존 암호는 필수 값입니다.");
            return false;
        }
        if (formData.get('newPassword') === formData.get('oldPassword')) {
            alert("신규 암호는 기존 암호와 동일하게 사용할 수 없습니다.");
            return false;
        }
        return true;
    };

    const formObjValidator = (checkRef) => {
        if(checkRef.current[0].value === ""){
            alert("사용자명은 필수 값입니다.");
            return false;
        }
        return true;
    };

    const updateUser = () => {

        let modeStr = modeInfo.mode === CODE.MODE_CREATE ? "POST" : "PUT";

        let requestOptions ={};

        if (modeStr === "POST") {

            const formData = new FormData();

                for (let key in userDetail) {
                    formData.append(key, userDetail[key]);
                    //console.log("userDetail [%s] ", key, userDetail[key]);
                }

                if (formValidator(formData)) {

                    requestOptions = {
                        method: modeStr,
                        headers: {
                            
                        },
                        body: formData
                    }

                    EgovNet.requestFetch(modeInfo.editURL,
                        requestOptions,
                        (resp) => {
                            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                                navigate({ pathname: URL.ADMIN_USER });
                            } else {
                                navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                            }
                        }
                    );
                };

        } else {
            if (formObjValidator(checkRef)) {

                requestOptions = {
                    method: modeStr,
                    headers: {
                        'Content-type': 'application/json',
                        
                    },
                    body: JSON.stringify({...userDetail})
                }

                EgovNet.requestFetch(modeInfo.editURL,
                    requestOptions,
                    (resp) => {
                        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                            navigate({ pathname: URL.ADMIN_USER });
                        } else {
                            navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                        }
                    }
                );
            }     
        }
    };

    const deleteUserArticle = (userId) => {
        const deleteUserURL = `/userMng/${userId}`;
        
        const requestOptions = {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            }
        }

        EgovNet.requestFetch(deleteUserURL,
            requestOptions,
            (resp) => {
                console.log("====>>> user delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("사용자가 삭제되었습니다.")
                    navigate(URL.ADMIN_USER, { replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
        );
    }

    const getSelectedLabel = (objArray, findLabel = "") => {
        let foundValueLabelObj = objArray.find(o => o['value'] === findLabel);
        return foundValueLabelObj['label'];
    }

    useEffect(() => {
        initMode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("------------------------------EgovAdminUserEdit [End]");
    console.groupEnd("EgovAdminUserEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>사용자생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사용자관리</h1>
                        </div>

                        {modeInfo.mode === CODE.MODE_CREATE &&
                            <h2 className="tit_2">사용자 생성</h2>
                        }

                        {modeInfo.mode === CODE.MODE_MODIFY &&
                            <h2 className="tit_2">사용자 수정</h2>
                        }

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="userId">사용자 ID</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="userId" title="" id="userId" placeholder=""
                                        defaultValue={userDetail.userId}
                                        onChange={e => setUserDetail({ ...userDetail, userId: e.target.value })}
										ref={el => (checkRef.current[0] = el)}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="userNm">사용자명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="userNm" title="" id="userNm" placeholder=""
                                        defaultValue={userDetail.userNm}
                                        onChange={e => setUserDetail({ ...userDetail, userNm: e.target.value })}
										ref={el => (checkRef.current[0] = el)}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="oldPassword">기존 암호</label></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="password" name="oldPassword" title="" id="oldPassword" placeholder="" 
									defaultValue={oldPassword}
									onChange={e => setUserDetail({ ...userDetail, oldPassword: e.target.value })}
									/>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="newPassword">신규 암호</label></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="password" name="newPassword" title="" id="newPassword" placeholder=""
									defaultValue={newPassword} 
									onChange={e => setUserDetail({ ...userDetail, newPassword: e.target.value })}
									/>
                                </dd>
                            </dl>


                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateUser()}>저장</button>
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <button className="btn btn_skyblue_h46 w_100" onClick={() => {
                                            deleteUserArticle(userDetail.userId);
                                        }}>삭제</button>
                                    }
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.ADMIN_USER} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EgovAdminUserEdit;