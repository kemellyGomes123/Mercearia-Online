import './sidemenu.css'
import React, { useState,useCallback } from 'react';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="menu">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    </div>
  );}


export default SideMenu;