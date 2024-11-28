
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'components/EgovPaging';

import { itemIdxByPage } from 'utils/calc';


function EgovAdminCodeList(props) {
    const location = useLocation();
    const codeNameRef = useRef();
    const detailCodeRef = useRef();

    // 공통코드 상태관리
    const [codeList, setCodeList] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [detailCodeList, setDetailCodeList] = useState([]);
    
    // 신규 등록을 위한 상태
    const [newCode, setNewCode] = useState({ codeNo: '', codeName: '', useYn: 'Y' });
    const [newDetailCode, setNewDetailCode] = useState({ 
        codeNo: '', 
        detailCode: '', 
        detailCodeNm: '', 
        useYn: 'Y' 
    });

    // 공통코드 조회
    const retrieveCodeList = useCallback((searchKeyword = '') => {
        const requestOptions = {
            method: "GET",
            headers: {'Content-type': 'application/json'}
        }
        
        EgovNet.requestFetch(
            `/code/list?searchKeyword=${searchKeyword}`,
            requestOptions,
            (resp) => {
                setCodeList(resp.result.list);
            }
        );
    }, []);

    // 상세코드 조회
    const retrieveDetailCodeList = useCallback((codeNo) => {
        if (!codeNo) return;
        
        const requestOptions = {
            method: "GET",
            headers: {'Content-type': 'application/json'}
        }
        
        EgovNet.requestFetch(
            `/code/detail/list/${codeNo}`,
            requestOptions,
            (resp) => {
                setDetailCodeList(resp.result.list);
            }
        );
    }, []);

    // 공통코드 등록
    const saveCode = async () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newCode)
        }

        await EgovNet.requestFetch(
            '/code/save',
            requestOptions,
            (resp) => {
                alert('저장되었습니다.');
                retrieveCodeList();
                setNewCode({ codeNo: '', codeName: '', useYn: 'Y' });
            }
        );
    };

    // 상세코드 등록
    const saveDetailCode = async () => {
        if (!selectedCode) {
            alert('공통코드를 선택해주세요.');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({...newDetailCode, codeNo: selectedCode.codeNo})
        }

        await EgovNet.requestFetch(
            '/code/detail/save',
            requestOptions,
            (resp) => {
                alert('저장되었습니다.');
                retrieveDetailCodeList(selectedCode.codeNo);
                setNewDetailCode({ 
                    codeNo: '', 
                    detailCode: '', 
                    detailCodeNm: '', 
                    useYn: 'Y' 
                });
            }
        );
    };

    return (
        <div className="container">
            <div className="c_wrap">
                {/* Location 부분 생략 */}
                
                <div className="layout">
                    <EgovLeftNav />
                    
                    <div className="contents" id="contents">
                        <div className="condition">
                            <ul>
                                <li>
                                    <span className="f_search">
                                        <input type="text" 
                                            placeholder="공통코드명" 
                                            ref={codeNameRef}
                                        />
                                        <button type="button" onClick={() => 
                                            retrieveCodeList(codeNameRef.current.value)
                                        }>검색</button>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* 공통코드 등록 폼 */}
                        <div className="code_register">
                            <input
                                type="text"
                                placeholder="코드번호"
                                value={newCode.codeNo}
                                onChange={e => setNewCode({...newCode, codeNo: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="코드명"
                                value={newCode.codeName}
                                onChange={e => setNewCode({...newCode, codeName: e.target.value})}
                            />
                            <select
                                value={newCode.useYn}
                                onChange={e => setNewCode({...newCode, useYn: e.target.value})}
                            >
                                <option value="Y">사용</option>
                                <option value="N">미사용</option>
                            </select>
                            <button onClick={saveCode}>공통코드 등록</button>
                        </div>

                        {/* 공통코드 목록 */}
                        <div className="code_list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>코드번호</th>
                                        <th>코드명</th>
                                        <th>사용여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {codeList.map(code => (
                                        <tr key={code.codeNo} 
                                            onClick={() => {
                                                setSelectedCode(code);
                                                retrieveDetailCodeList(code.codeNo);
                                            }}
                                            className={selectedCode?.codeNo === code.codeNo ? 'selected' : ''}
                                        >
                                            <td>{code.codeNo}</td>
                                            <td>{code.codeName}</td>
                                            <td>{code.useYn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 상세코드 등록 폼 */}
                        {selectedCode && (
                            <div className="detail_code_register">
                                <input
                                    type="text"
                                    placeholder="상세코드"
                                    value={newDetailCode.detailCode}
                                    onChange={e => setNewDetailCode({
                                        ...newDetailCode, 
                                        detailCode: e.target.value
                                    })}
                                />
                                <input
                                    type="text"
                                    placeholder="상세코드명"
                                    value={newDetailCode.detailCodeNm}
                                    onChange={e => setNewDetailCode({
                                        ...newDetailCode, 
                                        detailCodeNm: e.target.value
                                    })}
                                />
                                <select
                                    value={newDetailCode.useYn}
                                    onChange={e => setNewDetailCode({
                                        ...newDetailCode, 
                                        useYn: e.target.value
                                    })}
                                >
                                    <option value="Y">사용</option>
                                    <option value="N">미사용</option>
                                </select>
                                <button onClick={saveDetailCode}>상세코드 등록</button>
                            </div>
                        )}

                        {/* 상세코드 목록 */}
                        {selectedCode && (
                            <div className="detail_code_list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>상세코드</th>
                                            <th>상세코드명</th>
                                            <th>사용여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detailCodeList.map(detail => (
                                            <tr key={detail.detailCode}>
                                                <td>{detail.detailCode}</td>
                                                <td>{detail.detailCodeNm}</td>
                                                <td>{detail.useYn}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminCodeList;