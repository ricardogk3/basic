import React, {useState} from 'react';
import { userContext } from './components/UserContext';
import Login from './pages/Login';
import Principal from './pages/Principal'
import './App.css';


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const logado = async (u) => {
    setUser(u);
    setIsLogged(true);
  }

  const deslogado = async () => {
    setUser(null);
    // setIsLogged(false);
  }


  return (
    // <div className="App">
    //   <header className="App-header">
    <div >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <userContext.Provider value={{ logado, deslogado, user }}>
        {isLogged ? <Principal /> : <Login />}
      </userContext.Provider>

    </div>
  );
}

export default App;
