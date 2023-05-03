import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Página Inicial',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    requireAdm: false
  },
  // {
  //   title: 'Minhas anotações',
  //   path: '/notas',
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text',
  //   requireAdm: false
  // },
  // {
  //   title: 'Meus lucros',
  //   path: '/lucros',
  //   // icon: <FaIcons.FaCashRegister />,
  //   icon: <FaIcons.FaDollarSign />,
  //   cName: 'nav-text',
  //   requireAdm: false
  // },
  // {
  //   title: 'Minhas empresas',
  //   path: '/companias',
  //   icon: <IoIcons.IoIosBusiness />,
  //   cName: 'nav-text',
  //   requireAdm: false
  // },
  {
    title: 'Área administrativa',
    path: '/adm',
    icon: <IoIcons.IoIosLock />,
    cName: 'nav-text',
    requireAdm: true
  }
  // {
  //   title: 'Suporte',
  //   path: '/suporte',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text',
  //   requireAdm: false
  // }
];