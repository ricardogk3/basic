import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook, addSubcollection, updateSubcollection } from '../../store/action';
import { TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export const CreateAndEdit = ({
    editFormVisibility,
    bookToBeEdited,
    inputs,
    user,
    colecaoFirebase,
    sub,
    colecaoOriginal,
    idOriginal,
    setAddoredit,
    setEditFormVisibility}) => {

    const dispatch = useDispatch();
    const [valores, setValores] = useState(!!bookToBeEdited ? bookToBeEdited : {});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sub) {
            const envia = { ...valores, uid: user };
            dispatch(addSubcollection(colecaoOriginal, idOriginal, colecaoFirebase, envia));
            setAddoredit(false)
            setEditFormVisibility(false);
        } else {
            const envia = { ...valores, uid: user };
            dispatch(addBook(colecaoFirebase, envia));
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (sub) {
            const envia = { ...valores, uid: user };
            dispatch(updateSubcollection(colecaoOriginal, idOriginal, colecaoFirebase, envia));
            setAddoredit(false)
            setEditFormVisibility(false);
        } else {
            const envia = { ...valores, uid: user };
            dispatch(updateBook(colecaoFirebase, envia));
        }
    };

    return (
        <>
            {editFormVisibility === false ? (
                <form className='form-group container' onSubmit={handleSubmit}>
                    <div className='column'>
                        {inputs.map((input, i) => {
                            if (input.tipo === 'text') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField id="outlined-basic" label={input.titulo} variant="outlined"
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'number') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField id="outlined-basic"
                                            label={input.titulo}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9].*' }}
                                            helperText="Usar ponto ao invés de vírgula."
                                            variant="outlined"
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'date') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField
                                            id="date"
                                            label={input.titulo}
                                            type="date"
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'select') {
                                return (
                                    <div className='formulario' style={{display:'flex',  flexDirection: "column", alignContent: 'center', justifyContent: 'center'}} key={i}>
                                        <InputLabel id="demo-simple-select-label">{input.titulo}</InputLabel>
                                        <Select
                                                      labelId="demo-simple-select-standard-label"
                                                      id="demo-simple-select-standard"
                                            // label={input.titulo}
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        >
                                            {input.selecao.map((name, i) => (
                                                <MenuItem key={i} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                )
                            }
                        })}

                        <div className='formulario'>
                            <Button variant="contained" type="submit" className='btn btn-success btn-md'>ENVIAR</Button>
                        </div>
                    </div>
                </form>

            ) : (
                <form className='form-group container' onSubmit={handleEditSubmit}>
                    <div className='row'>
                        {inputs.map((input, i) => {
                            if (input.tipo === 'text') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField id="outlined-basic" label={input.titulo} variant="outlined"
                                            value={valores[input.titulo]}
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'number') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField id="outlined-basic"
                                            label={input.titulo}
                                            value={valores[input.titulo]}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9].*' }}
                                            helperText="Usar ponto ao invés de vírgula."
                                            variant="outlined"
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'date') {
                                return (
                                    <div className='formulario' key={i}>
                                        <TextField
                                            id="date"
                                            label={input.titulo}
                                            type="date"
                                            value={valores[input.titulo]}
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                )
                            }
                            if (input.tipo === 'select') {
                                
                                return (
                                    <div className='formulario' style={{display:'flex',  flexDirection: "column", alignContent: 'center', justifyContent: 'center'}} key={i}>
                                        <InputLabel id="demo-simple-select-label">{input.titulo}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={valores[input.titulo]}
                                            label={input.titulo}
                                            onChange={(e) => setValores({ ...valores, [input.titulo]: e.target.value })}
                                        >
                                            {input.selecao.map((name, i) => (
                                                <MenuItem key={i} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                )
                            }
                        })}


                        <div className='formulario'>
                            <Button variant="contained" type="submit" className='btn btn-success btn-md'>ATUALIZAR</Button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};
