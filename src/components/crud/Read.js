import { useSelector, useDispatch } from "react-redux";
import { CreateAndEdit } from "./CreateAndEdit";
import React, { useState, useEffect, useContext } from 'react';
import { getDadosColecao } from "../../store/action";
import Card from './Card'
import Button from '@mui/material/Button';
import './style.css'
import { Dots } from "react-activity";
import { UserProvider, contarDadosMesmoUID } from './funcoes';
import ExportToExcel from "./Excel";
import { userContext } from '../UserContext'
import SomaSubcolecao from './SomaSubcolecao'

export default function Read(p) {
    const dispatch = useDispatch();
    const { user } = useContext(userContext);
    const dadosColecao = useSelector((state) => state.reducer.dadosColecao);
    const [loading, setLoading] = useState(true);
    let soma = 0;
    const userDados = UserProvider(user)

    if (!!p.parametros.subcolecao) {
        p.parametros.input.map((v, i) => {
            if (v.tipo === 'subsoma') {
                soma = SomaSubcolecao(
                    v,
                    p.parametros.colecaoFirebase,
                    p.parametros.subcolecao.colecaoFirebase,
                    p.parametros.todosVeem, // Variável que indica se todos veem os dados
                    userDados // Dados do usuário
                );
            }
            return null;
        })
    }

    useEffect(() => {
        dispatch(getDadosColecao(p.parametros.colecaoFirebase))
        const fetchData = async () => {
            const result = await dispatch(getDadosColecao(p.parametros.colecaoFirebase));
            if (result) {
                setLoading(false)
            }
        };
        fetchData();
    }, [dispatch])

    useEffect(() => {
        setEditFormVisibility(false);
        setAddoredit(false)
    }, [dadosColecao])

    const [editFormVisibility, setEditFormVisibility] = useState(false);
    const [bookToBeEdited, setBookToBeEdited] = useState('');
    const [addoredit, setAddoredit] = useState(true);

    const handleEdit = (bookObj) => {
        setEditFormVisibility(true);
        setBookToBeEdited(bookObj);
    }

    const cancelUpdate = () => {
        setEditFormVisibility(false);
        setBookToBeEdited('');
    }

    const editfunction = (dadoColecao) => {
        setAddoredit(true)
        handleEdit(dadoColecao)
    }

    if (loading) {
        return (
            <div className="loading">
                <div style={{ alignContent: 'end', justifyContent: 'center', height: '10vh', width: '10vh' }}>
                    <Dots />
                </div>
            </div>
        )
    }

    return (
        <>
            {addoredit ?
                <div className="custom-container">
                    <h1 className="heading">
                        {p.parametros.titulo}
                    </h1>
                    <CreateAndEdit
                        editFormVisibility={editFormVisibility}
                        bookToBeEdited={bookToBeEdited}
                        inputs={p.parametros.input}
                        user={user.uid}
                        colecaoFirebase={p.parametros.colecaoFirebase}
                        sub={false}
                    />
                    <div className="centraliza">
                        <Button variant="contained"
                            className="meu-botao"
                            onClick={() => {
                                setAddoredit(false)
                                cancelUpdate()
                            }}>VOLTAR</Button>
                    </div>
                </div>
                :
                <div style={{ width: '96%', margin: '2%' }}>
                    <h1 className="heading">
                        {p.parametros.titulo}
                    </h1>
                    {dadosColecao.length > 0 ? (
                        <div className="tabelafora">
                            <div style={styles.c1}>
                                <div style={styles.c2}>
                                    {!!p.parametros.subcolecao ? <p style={styles.c4}></p>
                                        : <></>}
                                    {p.parametros.mostrarQuemCriou ?
                                        <div style={{ flex: 4, display: 'flex', flexDirection: "row", justifyContent: 'center', alignSelf: 'center' }} >
                                            <p>Autor:</p>
                                        </div>
                                        : <></>}
                                    {p.parametros.input.map((v, i) => (
                                        <p style={styles.c3} key={i}>{v.titulo}</p>
                                    ))}
                                    <p style={styles.c4}></p>
                                    <p style={styles.c4}></p>
                                </div>
                            </div>
                            {dadosColecao
                                .sort((a, b) => new Date(a[p.parametros.input[5].titulo]) - new Date(b[p.parametros.input[5].titulo]))
                                .map((dadoColecao, i) => {
                                    if (p.parametros.todosVeem || dadoColecao.uid === userDados.uid) {
                                        return (
                                            <div
                                                className={`card-item ${i === dadosColecao.length - 1 ? 'last-item' : ''}`}
                                                style={i % 2 === 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#f0f0f0' }}
                                                key={i}
                                            >
                                                <Card
                                                    dadoColecao={dadoColecao}
                                                    editFormVisibility={editFormVisibility}
                                                    editfunction={editfunction}
                                                    parametros={p.parametros}
                                                    colecao={p.parametros.colecaoFirebase}
                                                    subcolecao={p.parametros.subcolecao}
                                                    sub={false}
                                                />
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                            <div style={styles.c11}>
                                <div style={styles.c2}>
                                    {p.parametros.mostrarQuemCriou ?
                                        <div style={{ flex: 4, display: 'flex', flexDirection: "row", justifyContent: 'center', alignSelf: 'center' }} >
                                            <p></p>
                                        </div>
                                        : <></>}
                                    {p.parametros.input.map((v, i) => {
                                        if (v.tipo === 'number' && v.soma) {
                                            const sum = dadosColecao.reduce((accumulator, currentValue) => {
                                                // Verificar se todosVeem é falso e se o UID é igual ao do usuário
                                                if (!p.parametros.todosVeem && currentValue.uid === userDados.uid) {
                                                    return accumulator + parseFloat(currentValue[v.titulo]);
                                                } else if (p.parametros.todosVeem) {
                                                    return accumulator + parseFloat(currentValue[v.titulo]);
                                                }
                                                // Caso contrário, não adicionar o valor ao acumulador
                                                return accumulator;
                                            }, 0);
                                            return <p style={styles.c3} key={i}>Total: {sum.toFixed(2)}</p>
                                        } else if (v.tipo === 'number' && v.media) {
                                            const quantidade = contarDadosMesmoUID(dadosColecao, userDados.uid, p.parametros.todosVeem);
                                            const sum = dadosColecao.reduce((accumulator, currentValue) => {
                                                // Verificar se todosVeem é falso e se o UID é igual ao do usuário
                                                if (!p.parametros.todosVeem && currentValue.uid === userDados.uid) {
                                                    return accumulator + parseFloat(currentValue[v.titulo]);
                                                } else if (p.parametros.todosVeem) {
                                                    return accumulator + parseFloat(currentValue[v.titulo]);
                                                }
                                                // Caso contrário, não adicionar o valor ao acumulador
                                                return accumulator;
                                            }, 0);
                                            return <p style={styles.c3} key={i}>Média: {(sum / quantidade).toFixed(2)}</p>
                                        } else if (v.tipo === 'subsoma' && v.soma) {
                                            return <p style={styles.c3} key={i}>Total: {soma.toFixed(2)}</p>
                                        } else if (v.tipo === 'subsoma' && v.media) {
                                            const quantidade = contarDadosMesmoUID(dadosColecao, userDados.uid, p.parametros.todosVeem);
                                            return <p style={styles.c3} key={i}>Média: {(soma / quantidade).toFixed(2)}</p>

                                        } else {
                                            return <p style={styles.c3} key={i}></p>
                                        }
                                    })}
                                    <p style={styles.c4}></p>
                                    <p style={styles.c4}></p>
                                </div>
                            </div>
                            {/* {dadosColecao.length > 1 && (
                                    <div className="centraliza">
                                        <Button variant="contained"
                                            className="meu-botao"
                                            style={{ marginBotton: '4px' }}
                                            onClick={() => dispatch(deleteAll(p.parametros.colecaoFirebase))}
                                        >APAGAR TODOS</Button>
                                    </div>
                                )} */}

                        </div>
                    )
                        : (
                            <div className="message-box">
                                Sem dados
                            </div>
                        )}
                    <div className="centraliza">
                        <Button variant="contained"
                            className="meu-botao"
                            style={{ margin: '4px' }}
                            onClick={() => setAddoredit(true)}
                        >ADICIONAR</Button>
                    </div>
                    <ExportToExcel
                        todosVeem={p.parametros.todosVeem}
                        userDados={userDados}
                    />
                </div>
            }
        </>
    );
}

const styles = {
    c1: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eee',
        fontWeight: 'bold',
        height: '30px',
        border: '2px solid #ddd',
    },
    c11: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eee',
        fontWeight: 'bold',
        height: '30px',
        border: '2px solid #ddd',
        borderTop: "none"
    },
    c2: {
        display: "flex",
        width: '100%',
        overflowX: "auto",
        whiteSpace: "nowrap"
    },
    c3: {
        flex: 4,
        display: "flex",
        justifyContent: 'center',
        '@media (maxWidth: 768px)': {
            flex: 2
        }
    },
    c4: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
    },

};