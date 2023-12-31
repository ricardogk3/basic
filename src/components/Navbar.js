import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo1 from "../images/logo1.png";
import UserView from './UserView';
import { userContext } from '../components/UserContext'
import { UserProvider } from '../components/crud/funcoes'

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { user } = useContext(userContext);
  const userDados = UserProvider(user)
  const dispatch = useDispatch(); // Obtenha a função de dispatch

  const handleClick = () => {
    dispatch()
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <img src={logo1} alt="Logo Basic" onClick={showSidebar} style={{ flex: 1, height: 60, resizeMode: 'contain' }} />
          </Link>
          <div className="Cabecalho">
            <div >
            </div>
            <h1 style={{ color: "white" }}>Básico</h1>
            <UserView />
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              let userAdm = userDados.adm
              if (item.requireAdm === userAdm || userAdm) {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} onClick={handleClick}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;