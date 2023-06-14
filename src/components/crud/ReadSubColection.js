import { useSelector, useDispatch } from "react-redux";
import { CreateAndEdit } from "./CreateAndEdit";
import React, { useState, useEffect, useContext } from 'react';
import { getSubcollection } from "../../store/action";
import Card from './Card'
import Button from '@mui/material/Button';
import { userContext } from '../../components/UserContext';
import './style.css'
import { Dots } from "react-activity";

export default function ReadSubColection(p) {
    const dispatch = useDispatch();
    const { user } = useContext(userContext);
    const books = useSelector((state) => state.reducer.subcollection[p.dados]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getSubcollection(p.colecaoOriginal, p.parametros.colecaoFirebase, p.dados))
        const fetchData = async () => {
            const result = await dispatch(getSubcollection(p.colecaoOriginal, p.parametros.colecaoFirebase, p.dados));
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
            <div className="loading2">
                <div style={{ alignContent: 'end', justifyContent: 'center'}}>
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
                        sub={true}
                        colecaoOriginal={p.colecaoOriginal}
                        idOriginal={p.dados}
                        setAddoredit={setAddoredit}
                        setEditFormVisibility = {setEditFormVisibility}
                        
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
                    {books && books.length > 0 ? (
                        <div className="tabelafora">
                            <div style={styles.c1}>
                                <div style={styles.c2}>
                                    {p.parametros.input.map((v, i) => (
                                        <p style={styles.c3} key={i}>{v.titulo}</p>
                                    ))}
                                    <p style={styles.c4}></p>
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
                                        subcolecaoName={p.parametros.colecaoFirebase}
                                        colecaoOriginal={p.colecaoOriginal}
                                        sub={true}
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
                                </div>
                            </div>
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