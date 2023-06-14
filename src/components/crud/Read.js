import { useSelector, useDispatch } from "react-redux";
import { CreateAndEdit } from "./CreateAndEdit";
import React, { useState, useEffect, useContext } from 'react';
import { getBooks } from "../../store/action";
import Card from './Card'
import Button from '@mui/material/Button';
import { userContext } from '../../components/UserContext';
import './style.css'
import { Dots } from "react-activity";

export default function Read(p) {
    const dispatch = useDispatch();
    const { user } = useContext(userContext);
    const books = useSelector((state) => state.reducer.books);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getBooks(p.parametros.colecaoFirebase))
        const fetchData = async () => {
            const result = await dispatch(getBooks(p.parametros.colecaoFirebase));
            if (result) {
                setLoading(false)
            }
        };
        fetchData();
    }, [dispatch])



    useEffect(() => {
        setEditFormVisibility(false);
        setAddoredit(false)
    }, [books])

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

    const editfunction = (book) => {
        setAddoredit(true)
        handleEdit(book)
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
                    {books.length > 0 ? (
                        <div className="tabelafora">
                            <div style={styles.c1}>
                                <div style={styles.c2}>
                                    {!!p.parametros.subcolecao ? <p style={styles.c4}></p>
                                        : <></>}
                                    {p.parametros.input.map((v, i) => (
                                        <p style={styles.c3} key={i}>{v.titulo}</p>
                                    ))}
                                    <p style={styles.c4}></p>
                                    <p style={styles.c4}></p>
                                </div>
                            </div>
                            {books.map((book, i) => (
                                
                                <div  
                                className={`card-item ${i === books.length - 1 ? 'last-item' : ''}`}
                                style={i % 2 === 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#f0f0f0' }} key={i}>
                                    <Card
                                        book={book}
                                        editFormVisibility={editFormVisibility}
                                        editfunction={editfunction}
                                        inputs={p.parametros.input}
                                        colecao={p.parametros.colecaoFirebase}
                                        subcolecao={p.parametros.subcolecao}
                                        sub={false}
                                    />
                                </div>
                            ))}
                            <div style={styles.c11}>
                                <div style={styles.c2}>
                                    {p.parametros.input.map((v, i) => {
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
                                    })}
                                    <p style={styles.c4}></p>
                                    <p style={styles.c4}></p>
                                </div>
                            </div>
                            {/* {books.length > 1 && (
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
    },
    c3: {
        flex: 4,
        display: "flex",
        justifyContent: 'center',
    },
    c4: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
    },
};