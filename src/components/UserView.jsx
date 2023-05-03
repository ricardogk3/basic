import React, { useContext, useEffect, useState } from 'react';
// import React, { useEffect, useState} from 'react';
import firebase from '../firebase';
import { userContext } from './UserContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';



export default function UserView() {
    // const {logado, deslogado, user} = [];
    const { logado, deslogado, user } = useContext(userContext);
    const [userView, setUserView] = useState(false);

    const primeiroLogin = async () => {
        firebase.db.collection('users').doc(user.uid).set({
            email: user.email
        })

        firebase.auth.currentUser.updateProfile({
            displayName: user.email
        })
    }

    const userById = async () => {
        const resp = await firebase.db.collection('users').doc(user.uid).get();
    }


    useEffect(
        () => {
            if (user.displayName) {
                primeiroLogin()
            }
            userById()
        }, []
    )


    const logout = async () => {
        const auth = firebase.auth;
        await auth.signOut();
        deslogado();
    }

    return (
        <div style={{ height: 40, width: 100 }}>
            <Button
                component="span"
                onClick={logout}
                className={"Botaosair"}
                endIcon={<ExitToAppIcon style={{ fontSize: 25 }} />}
                style={{ color: "white" }}>
                Sair
            </Button>

        </div>
    )
}
