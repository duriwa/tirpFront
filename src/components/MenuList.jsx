import React from 'react';

const MenuList = ({ menus, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>메뉴 이름</th>
          <th>가격</th>
          <th>카테고리</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {menus.map((menu) => (
          <tr key={menu.id}>
            <td>{menu.name}</td>
            <td>{menu.price}</td>
            <td>{menu.category}</td>
            <td>
              <button onClick={() => onEdit(menu)}>수정</button>
              <button onClick={() => onDelete(menu.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuList;
