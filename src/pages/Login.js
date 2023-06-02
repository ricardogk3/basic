import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../components/UserContext';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from '../firebase';
// import firebase from '../firebase';
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import './LocalCss.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
    const { logado, deslogado } = useContext(userContext);

    const [loading, setLoading] = useState(true);

    const [newUser, setNewUser] = useState(false);

    const [state, setState] = useState({
        email: '',
        senha: '',
        msg: ''
    })
    
    // const auth = useAuth();

    const handleInputChange = (name, value) => {
        setState({
            ...state, [name]: value
        })
    }

    useEffect(
        () => {
            // const auth = firebase.auth;
            const unsubscribed = auth.onAuthStateChanged(
                user => {
                    if (user) {
                        if (user.emailVerified) {
                            logado(user);
                        } else {
                            auth.signOut();
                            deslogado();
                            setLoading(false);
                        }
                    } else {
                        setLoading(false);
                    }
                }
            )
            return () => {
                unsubscribed();
            }
        }, []
    )

    const login = async () => {
        // const auth = firebase.auth;
        const { email, senha } = state;
        try {
            await signInWithEmailAndPassword(auth, email, senha);
        } catch (error) {
            setState({ ...state, msg: 'Email ou senha inválidos' });
        }
    }


    const cadastrar = async () => {
        setLoading(true);
        // const auth = firebase.auth;
        const { email, senha } = state;


        if (senha.length >= 6) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, senha);
                const rep1 = await sendPasswordResetEmail(auth, email);
                const user = res.user;
                const chave = user.uid;

                await db.collection('users').doc(user.uid).set({
                    email: user.email
                  });         

                setState({ ...state, msg: "Verifique sua conta de email." })
                setNewUser(false);
            } catch (err) {
                alert(err.message);
                setState({ ...state, msg: "Não foi possível cadastrar o usuário." })
            }
        } else {
            setState({ ...state, msg: "Senha deve conter no mínimo 6 caracteres." })
        }
        setLoading(false);
    }

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setState({
            ...state, ['senha']: event.target.value
        })
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    if (loading) {
        return (
            <div className="Login">
                <div style={{ alignContent: 'end', justifyContent: 'center', height: '10vh', width: '10vh'}}>
                    <Dots />
                </div>
            </div>
        )
    }

    return (
        <div className="Login" style={{ background: 'black', height: "100vh" }}>
            <div className="Login1">
                <div style={{ height: "50vh" }}>
                    {/* <img src={logo1} style={{ height: "100%" }} /> */}
                </div>
                <FormControl sx={{ background: '#999', padding: 1, borderRadius: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        // className="Input" 
                        style={{ marginTop: 6, marginBottom: 6, background: "white" }}
                        sx={{ color: "white", borderRadius: 2 }}
                        defaultValue={state.email}
                        color="warning"
                        onChange={e => handleInputChange('email', e.target.value)}
                    />
                    <FormControl
                        variant="outlined"
                        className="Input"
                        style={{ marginTop: 6, marginBottom: 5 }}>
                        <InputLabel htmlFor="outlined-adornment-password" color="warning">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            sx={{ background: "white" }}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            color="warning"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </FormControl>
                <Button variant="contained" className="Botao" color="warning" onClick={login}>Entrar</Button>
                <p style={{ color: 'red', height: 10 }}>{state.msg}</p>

            </div>
        </div>
    );

}