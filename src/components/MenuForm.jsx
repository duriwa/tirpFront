import React, { useState, useEffect } from 'react';

const MenuForm = ({ onSubmit, selectedMenu }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedMenu) {
      setName(selectedMenu.name);
      setPrice(selectedMenu.price);
      setCategory(selectedMenu.category);
    }
  }, [selectedMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMenu = { name, price, category };
    onSubmit(newMenu);
    setName('');
    setPrice('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>메뉴 이름</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>가격</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>카테고리</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">저장</button>
    </form>
  );
};

export default MenuForm;
