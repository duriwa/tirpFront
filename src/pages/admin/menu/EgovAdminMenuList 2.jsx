import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'components/EgovPaging';

import { itemIdxByPage } from 'utils/calc';
function MenuManagement() {
    const [menuList, setMenuList] = useState([]);
    const [newMenu, setNewMenu] = useState({ name: '', url: '' });

    const fetchMenuList = useCallback(() => {
        const fetchURL = '/menu';
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            }
        };

        EgovNet.requestFetch(fetchURL, requestOptions, (resp) => {
            setMenuList(resp.result.menuList);
        });
    }, []);

    const insertMenuInf = useCallback(() => {
        const addURL = '/menu/insertMenuInf';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newMenu)
        };

        EgovNet.requestFetch(addURL, requestOptions, (resp) => {
            if (resp.result.success) {
                fetchMenuList();
                setNewMenu({ menuNm: '', url: '' });
            }
        });
    }, [newMenu, fetchMenuList]);

    useEffect(() => {
        fetchMenuList();
    }, [fetchMenuList]);

    return (
        <div>
            <h2>메뉴 관리</h2>
            <div>
                <input
                    type="text"
                    placeholder="메뉴 이름"
                    value={newMenu.menuNm}
                    onChange={(e) => setNewMenu({ ...newMenu, menuNm: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="메뉴 URL"
                    value={newMenu.url}
                    onChange={(e) => setNewMenu({ ...newMenu, url: e.target.value })}
                />
                <button onClick={insertMenuInf}>메뉴 추가</button>
            </div>
            {/* <ul>
                {menuList.map((menu, index) => (
                    <li key={index}>
                        {menu.name} - {menu.url}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}


export default MenuManagement;