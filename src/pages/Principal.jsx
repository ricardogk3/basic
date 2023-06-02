import React, { useEffect, useState, useContext } from 'react';
import { Route, BrowserRouter, Routes, Switch } from "react-router-dom";
import TodoList from '../components/TodoList';
// import Notes from './pages/Notes';
// import ListTicket from "./pages/ListTicket";
// import Company from "./pages/Company";
// import AddTicket from "./pages/AddData";
// import DeleteTicket from "./pages/DeleteTicket";
// import EditTicket from "./pages/EditTicket";
// import Historico from "./pages/Historico";
// import CreateUser from "./pages/CreateUser";
// import Main from "./pages/Main";
import Navbar from '../components/Navbar';
// import firebase from './../firebase';
// import UserView from '../UserView';
import { db } from './../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { userContext } from '../components/UserContext';

export default function Login() {
    const [state, setState] = useState([]);
    const { logado, deslogado, user } = useContext(userContext);

    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const listUsers = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                key: doc.id,
                id: doc.id,
            }));
            setState(listUsers);
        }
        // fetchData();
    }, [user]);

    // const pegaDados = async () => {
    //     const users = firebase.db.collection("users");
    //     // const retorno = await users.where("uid", "===", user.uid).get();
    //     const retorno = await users.where("uid", "==", user.uid).get();

    //     const listUsers = [];
    //     var a = 0;
    //     retorno.forEach(
    //         doc => {
    //             listUsers.push({
    //                 ...doc.data(),
    //                 key: doc.id,
    //                 id: a
    //             })
    //             a += 1
    //         })

    //     setState(listUsers);
    //     // setDados(listUsers);
    //     // if(listUsers.length==0){
    //     //     setFigurinha(false)
    //     // }
    //     // else{
    //     //     setFigurinha(true)
    //     // }
    // }



    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<TodoList />} path="/" exact />
                {/* <Route element={<Main />} path="/" exact /> */}
                {/* <Route element={<Notes />} path="/notas" exact />
                <Route element={<ListTicket />} path="/lucros" exact />
                <Route element={<Company />} path="/companias" exact />
                <Route element={<AddTicket />} path="/add" exact />
                <Route element={<DeleteTicket />} path="/delete" exact />
                <Route element={<EditTicket />} path="/edit/" exact />
                <Route element={<Historico />} path="/hist/" exact />
                <Route element={<CreateUser />} path="/createUser/" exact /> */}
            </Routes>
        </BrowserRouter>
    )
}