import React from 'react';
// import * as FaIcons from 'react-icons/fa';
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
  {
    title: 'Área administrativa',
    path: '/adm',
    icon: <IoIcons.IoIosLock />,
    cName: 'nav-text',
    requireAdm: true
  },
  {
    title: 'Configurações',
    path: '/configuracoes',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text',
    requireAdm: false
  }
];