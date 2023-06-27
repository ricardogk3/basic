import React, { useState } from 'react';
import { userContext } from './components/UserContext';
import Login from './pages/Login';
import Principal from './pages/Principal'
import './App.css';
// Usar para criar o primeiro login
// import Adm from './components/Adm';


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const logado = async (u) => {
    setUser(u);
    setIsLogged(true);
  }

  const deslogado = async () => {
    setUser(null);
  }


  return (
    <div >
        <userContext.Provider value={{ logado, deslogado, user }}>
          {isLogged ? <Principal /> : <Login />}
          {/* Usar para criar o primeiro login */}
          {/* <Adm/> */}
        </userContext.Provider>
    </div>
  );
}

export default App;
