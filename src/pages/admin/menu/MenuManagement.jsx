import React, { useState, useEffect } from 'react';
import MenuList from '../../../components/MenuList';
import MenuForm from '../../../components/MenuForm';
import axios from 'axios';

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    // API를 통해 메뉴 리스트 가져오기
    axios.get('/api/menus').then((response) => {
      setMenus(response.data);
    });
  }, []);

  const handleAddOrUpdate = (menu) => {
    if (selectedMenu) {
      // 메뉴 수정
      axios.put(`/api/menus/${selectedMenu.id}`, menu).then((response) => {
        setMenus(
          menus.map((m) => (m.id === selectedMenu.id ? response.data : m))
        );
        setSelectedMenu(null);
      });
    } else {
      // 메뉴 추가
      axios.post('/api/menus', menu).then((response) => {
        setMenus([...menus, response.data]);
      });
    }
  };

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/menus/${id}`).then(() => {
      setMenus(menus.filter((menu) => menu.id !== id));
    });
  };

  return (
    <div>
      <h1>메뉴 관리</h1>
      <MenuForm onSubmit={handleAddOrUpdate} selectedMenu={selectedMenu} />
      <MenuList menus={menus} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MenuManagement;
