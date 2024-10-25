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
        const fetchURL = '/menuMng';
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

    const addMenu = useCallback(() => {
        const addURL = '/menuMng/add';
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
                setNewMenu({ name: '', url: '' });
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
                    value={newMenu.name}
                    onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="메뉴 URL"
                    value={newMenu.url}
                    onChange={(e) => setNewMenu({ ...newMenu, url: e.target.value })}
                />
                <button onClick={addMenu}>메뉴 추가</button>
            </div>
            <ul>
                {menuList.map((menu, index) => (
                    <li key={index}>
                        {menu.name} - {menu.url}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default MenuManagement;