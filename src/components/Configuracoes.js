import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Typography, TextField, Button, Checkbox, FormControlLabel, Box, Container } from '@mui/material';
import { userContext } from '../components/UserContext'
import { UserProvider } from '../components/crud/funcoes'

export default function Configuracoes() {
  const [state, setState] = useState({
    nome: '',
    sobrenome: '',
    isAdmin: false,
    msg: ''
  });
  const { user } = useContext(userContext);
  const userDados = UserProvider(user)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setState({
            ...state,
            nome: userData.name || '',
            sobrenome: userData.lastname || '',
            isAdmin: userData.adm || false
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []); // Executar apenas uma vez ao carregar o componente

  const handleInputChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    });
  };


  const updateUser = async () => {
    const { nome, sobrenome, isAdmin } = state;
    const user = auth.currentUser;

    try {
      // Buscar os dados existentes do usuário no Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      // Atualizar apenas os campos fornecidos pelo usuário
      const updatedUserData = {
        ...userData,
        name: nome || userData.name,
        lastname: sobrenome || userData.lastname,
        adm: isAdmin
      };

      // Atualizar os dados no Firestore
      await setDoc(userDocRef, updatedUserData);

      setState({
        ...state,
        msg: 'Dados atualizados com sucesso.'
      });
    } catch (err) {
      console.error(err);
      setState({
        ...state,
        msg: 'Não foi possível atualizar os dados.'
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
          Ajustar Dados do Usuário
        </Typography>
        <TextField
          label="Nome"
          value={state.nome}
          onChange={(e) => handleInputChange('nome', e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Sobrenome"
          value={state.sobrenome}
          onChange={(e) => handleInputChange('sobrenome', e.target.value)}
          margin="normal"
          variant="outlined"
        />
        {userDados.adm ?
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isAdmin}
                onChange={(e) => handleInputChange('isAdmin', e.target.checked)}
              />
            }
            label="Administrador"
          /> : <></>
        }
        <Button variant="contained" onClick={updateUser} sx={{ mt: 3 }}>
          Atualizar
        </Button>
        {state.msg && <Typography variant="body1" color="error">{state.msg}</Typography>}
      </Box>
    </Container>
  );
}
