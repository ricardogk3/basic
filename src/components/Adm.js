import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Typography, TextField, Button, Checkbox, FormControlLabel, Box, Container } from '@mui/material';
import UserList from './UserList';

export default function Adm() {
  const [state, setState] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    isAdmin: false,
    msg: ''
  });

  const handleInputChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    });
  };

  const cadastrar = async () => {
    const { nome, sobrenome, email, isAdmin } = state;

    if (nome && sobrenome && email) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, '123456');
        const user = res.user;
        const chave = user.uid;

        const userDocRef = doc(db, 'users', chave);

        await setDoc(userDocRef, {
          name: nome,
          lastname: sobrenome,
          email: user.email,
          adm: isAdmin,
          uid: chave
        });

        // Enviar email para redefinir a senha
        await sendPasswordResetEmail(auth, email);

        setState({
          ...state,
          msg: 'Verifique sua conta de email.'
        });
      } catch (err) {
        console.error(err);
        setState({
          ...state,
          msg: 'Não foi possível cadastrar o usuário.'
        });
      }
    } else {
      setState({
        ...state,
        msg: 'Por favor, preencha todos os campos.'
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Criar Usuário
        </Typography>
        <TextField
          label="Nome"
          value={state.nome}
          onChange={e => handleInputChange('nome', e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Sobrenome"
          value={state.sobrenome}
          onChange={e => handleInputChange('sobrenome', e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          type="email"
          value={state.email}
          onChange={e => handleInputChange('email', e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.isAdmin}
              onChange={e => handleInputChange('isAdmin', e.target.checked)}
            />
          }
          label="Administrador"
        />
        <Button variant="contained" onClick={cadastrar} sx={{ mt: 3 }}>
          Cadastrar
        </Button>
        {state.msg && <Typography variant="body1" color="error">{state.msg}</Typography>}
      </Box>
      <UserList />
    </Container>
  );
}
