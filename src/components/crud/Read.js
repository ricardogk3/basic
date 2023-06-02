import { useSelector, useDispatch } from "react-redux";
import { CreateAndEdit } from "./CreateAndEdit";
import React, { useState, useEffect, useContext } from 'react';
import { getBooks, deleteAll, deleteBook } from "../../store/action";
import Card from './Card'
import Button from '@mui/material/Button';
import { userContext } from '../../components/UserContext';

export default function Read(p) {
    const dispatch = useDispatch();

    // const { logado, deslogado, user } = useContext(userContext);
    const { user } = useContext(userContext);
    // const nomeCF = [p.parametros.colecaoFirebase]
    
    var books = {};
    
    
    if (p.parametros.subcolecao) {
        books = useSelector((state) => state.reducer);
        // dispatch(getBooks(p.parametros.colecaoFirebase, p.parametros.subcolecao.colecaoFirebase))
    } else if(p.dados.length>0) {
        console.log("tem porra", p.dados.length, p.dados[0] )
        books =  p.dados[0]
        // dispatch(getBooks(p.parametros.colecaoFirebase))
    }
    useEffect(() => {
        // dados = {as:"as"}
        // console.log(!!p.dados, p.dados)
    }, [])

    useEffect(() => {
        if (p.parametros.subcolecao) {
            // console.log("tem porra original:", p.parametros.colecaoFirebase, "falso:", p.parametros.subcolecao.colecaoFirebase)
            dispatch(getBooks(p.parametros.colecaoFirebase, p.parametros.subcolecao.colecaoFirebase))
        } else {
            dispatch(getBooks(p.parametros.colecaoFirebase))
        }
    }, [dispatch])

    useEffect(() => {
        setEditFormVisibility(false);
        setAddoredit(false)
    }, [books])

    const [editFormVisibility, setEditFormVisibility] = useState(false);
    const [bookToBeEdited, setBookToBeEdited] = useState('');
    const [addoredit, setAddoredit] = useState(true);

    // click on edit icon
    const handleEdit = (bookObj) => {
        setEditFormVisibility(true);
        setBookToBeEdited(bookObj);
    }

    // click on back button
    const cancelUpdate = () => {
        setEditFormVisibility(false);
        setBookToBeEdited('');
    }

    function editfunction(book) {
        setAddoredit(true)
        handleEdit(book)
    }

    return (
        <>
            {
                addoredit ?
                    <div className="custom-container">
                        <h1 className="heading">
                            {p.parametros.titulo}
                        </h1>
                        <CreateAndEdit
                            editFormVisibility={editFormVisibility}
                            cancelUpdate={cancelUpdate}
                            bookToBeEdited={bookToBeEdited}
                            inputs={p.parametros.input}
                            user={user.uid}
                            colecaoFirebase={p.parametros.colecaoFirebase}
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
                    <div style={{ width: '96%', margin: '2%', }}>
                        <h1 className="heading">
                            {p.parametros.titulo}
                        </h1>
                        {books.length > 0 ? (
                            <>
                                <div style={styles.c1}>
                                    <div style={styles.c2}>
                                        {p.parametros.input.map((v, i) => (
                                            <p style={styles.c3} key={i}>{v.titulo}</p>
                                        )
                                        )}
                                        <p style={styles.c4}></p>
                                    </div>
                                </div>
                                {books.map((book, i) => (
                                    <div key={i}>
                                        <Card
                                            book={book}
                                            editFormVisibility={editFormVisibility}
                                            editfunction={editfunction}
                                            inputs={p.parametros.input}
                                            subcolecao={p.parametros.subcolecao}
                                            deleteBook={deleteBook}
                                        />
                                    </div>
                                ))}
                                <div style={styles.c1}>
                                    <div style={styles.c2}>
                                        {
                                            p.parametros.input.map((v, i) => {
                                                if (v.tipo === 'number' && v.media) {
                                                    const sum = books.reduce((accumulator, currentValue) =>
                                                        accumulator + parseFloat(currentValue[v.titulo]), 0
                                                    )
                                                    return <p style={styles.c3} key={i}>Total: {sum.toFixed(2)}</p>
                                                } else if (v.tipo === 'number' && v.soma) {
                                                    const sum = books.reduce((accumulator, currentValue) =>
                                                        accumulator + parseFloat(currentValue[v.titulo]), 0
                                                    )
                                                    return <p style={styles.c3} key={i}>Média: {(sum / books.length).toFixed(2)}</p>
                                                } else {
                                                    return <p style={styles.c3} key={i}></p>
                                                }
                                            })
                                        }
                                        <p style={styles.c4}></p>
                                    </div>
                                </div>
                                {books.length > 1 && (
                                    <div className="centraliza">
                                        <Button variant="contained"
                                            className="meu-botao"
                                            style={{ marginBotton: '4px' }}
                                            onClick={() => dispatch(deleteAll())}
                                        >APAGAR TODOS</Button>
                                    </div>
                                )}
                            </>
                        )
                            : (<div className="message-box">
                                Sem dados
                            </div>)}
                        <div className="centraliza">
                            <Button variant="contained"
                                className="meu-botao"
                                style={{ margin: '4px' }}
                                onClick={() => setAddoredit(true)}
                            >ADICIONAR</Button>
                        </div>
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
        // color: 'black',
        background: '#eee',
        fontWeight: 'bold',
    },
    c2: {
        display: "flex",
        width: '100%',
        // color: 'white',
    },
    c3: {
        flex: 3,
        display: "flex",
        justifyContent: 'center',
    },
    c4: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
    },
};