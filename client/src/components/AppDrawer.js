import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiArrowLeft } from "react-icons/fi";
import './AppDrawer.css'
import { Link } from 'react-router-dom';

export default function AppDrawer({ onClick }) {
  const [isActive, setIsActive] = useState(false);
  function toggleActive() {
    setIsActive(!isActive)
  }
  return (
    <div>
      <DrawerButton onClick={toggleActive}></DrawerButton>
      <Drawer isActive={isActive} onClick={toggleActive} />
    </div>
  );
}

function DrawerButton({ onClick }) {
  return <FaBars onClick={onClick} size={40} className="button-bars"></FaBars>
};

function DrawerContents({ onClick }) {
  return (
    <div className="drawer-content">
      <FiArrowLeft onClick={onClick} size={40} className="arrow-left"></FiArrowLeft>
      <Link to="/" className='items' style={{ textDecoration: 'none' }}>
        <h2 onClick={onClick} className="pkmn">Home</h2>
      </Link>
      <h2 onClick={onClick} className="pkmn">Edit a Request</h2>
      <h2 onClick={onClick} className="pkmn">Data Entries</h2>
      <h2 onClick={onClick} className="pkmn">Log Out</h2>
    </div>
  )
}

function Drawer({ isActive, onClick }) {
  return (
    <div className={`drawer-container ${isActive ? "drawer-container-isopen" : ''}`}>
      <DrawerContents onClick={onClick}></DrawerContents>
    </div>
  )
}
