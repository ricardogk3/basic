import React, { useEffect, useState, useContext } from 'react';
import firebase from '../firebase';
// import UserView from '../UserView';
import { userContext } from './UserContext';
import { Dots } from "react-activity";

export function UserData() {
    // const [loading, setLoading] = useState(false);
    const [userAccount, setUserAccount] = useState({});
    const { logado, deslogado, user } = useContext(userContext);

    useEffect(
        () => {
            pegaDados()
        }, []
    )

    const pegaDados = async () => {
        // setLoading(true);
        const users = firebase.db.collection("users");
        const retorno = await users.where("uid", "==", user.uid).get();

        const listUsers = [];
        var a = 0;
        retorno.forEach(
            doc => {
                listUsers.push({
                    ...doc.data(),
                    key: doc.id,
                    id: a
                })
                a += 1
            })
        let userAccountLocal = listUsers.find((l) => (l.uid === user.uid ? l : false))
        setUserAccount(userAccountLocal)
        // setLoading(false);
    }
    return userAccount;
}

