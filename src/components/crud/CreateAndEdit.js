import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { postBook, updateBook } from '../../store/action';
import { TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './style.css'

export const CreateAndEdit = ({ editFormVisibility, cancelUpdate, bookToBeEdited, inputs, user, colecaoFirebase }) => {

    const dispatch = useDispatch();

    const [valores, setValores] = useState(!!bookToBeEdited? bookToBeEdited :  {} );

    // normal add books submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        // let envia = valores
        let envia = { ...valores, "uid": user }
        dispatch(postBook(envia, colecaoFirebase));
        // dispatch(postBook(envia, colecaoFirebase, 'subbooks'));
    }

    // edit form submit event
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let envia = { ...valores, "uid": user }
        dispatch(updateBook(envia, colecaoFirebase));
    }

    return (
        <>
            {editFormVisibility === false ? (
                // normal add books form
                <form className='form-group container' onSubmit={handleSubmit}>
                    <div className='column'>
                        {inputs.map((input, i) => {
                            if (input.tipo === 'text') {
                                return (
                                    <div className='formulario'  key={i}>
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
                                            // value={selectedDate}
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
                                    <div className='formulario' key={i}>
                                        <InputLabel id="demo-simple-select-label">{input.titulo}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            label={input.titulo}
                                            // onChange={handleChange}
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
                <>
                    {/* edit form when edit icon is clicked */}
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
                                            // value={selectedDate}
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
                                    <div className='formulario' key={i}>
                                        <InputLabel id="demo-simple-select-label">{input.titulo}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={age}
                                            value={valores[input.titulo]}
                                            label={input.titulo}
                                            // onChange={handleChange}
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


                            <div className='col-3 button-div'>
                                <Button variant="contained" type="submit" className='btn btn-warning btn-md submit-btn'>ATUALIZAR</Button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}
