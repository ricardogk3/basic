import React, { useContext } from 'react';
import { auth } from '../firebase';
import { userContext } from './UserContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';

export default function UserView() {
    const { deslogado } = useContext(userContext);

    const logout = async () => {
        await auth.signOut();
        deslogado();
        window.location.reload(false);
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
