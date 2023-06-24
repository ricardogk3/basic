import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            const usersList = [];
            usersSnapshot.forEach((doc) => {
                usersList.push({ id: doc.id, ...doc.data() });
            });
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5vh', }}>
                <Typography variant="h4" gutterBottom>
                    Lista de Usuários
                </Typography>
                <List>
                    {users.map((user) => (
                        <ListItem key={user.id}>
                            <ListItemText
                                primary={`${user.name} ${user.lastname}`}
                                secondary={`Email: ${user.email} - ${user.adm ? 'Administrador' : 'Usuário'}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
}
