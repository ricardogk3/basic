import React, { useContext } from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { userContext } from '../components/UserContext';
import { UserProvider } from '../components/crud/funcoes'

import Adm from '../components/Adm'
import Configuracoes from '../components/Configuracoes';
import Navbar from '../components/Navbar';
import PaginaInvalida from '../components/PaginaInvalida';
import Read from '../components/crud/Read';

export default function Principal() {
    const { user } = useContext(userContext);
    const userDados = UserProvider(user)
    const parametros = {
        titulo: 'Arquivos Gerais',
        colecaoFirebase: 'AGerais',
        todosVeem: true,
        mostrarQuemCriou: true,
        readType: 'card',
        readSequence: 1,
        input: [{
            n: 1,
            tipo: 'text',
            titulo: 'Titulo:',
        }, {
            n: 2,
            tipo: 'text',
            titulo: 'Texto:',
        }, {
            n: 3,
            tipo: 'number',
            titulo: 'Valor:',
            soma: true,
            media: false
        }, {
            n: 4,
            tipo: 'number',
            titulo: 'Valor media:',
            soma: false,
            media: true
        }, {
            n: 5,
            tipo: 'subsoma',
            titulo: 'Total de sub:',
            formnome: 'Valor:',
            soma: false,
            media: true
        }, {
            n: 6,
            tipo: 'subsoma',
            titulo: 'Total de sub:',
            formnome: 'Valor:',
            soma: true,
            media: false
        }, {
            n: 7,
            tipo: 'date',
            titulo: 'Dia da compra',
        }, {
            n: 8,
            tipo: 'select',
            titulo: 'Selecao',
            selecao: ['S15', 'S25']
        }],
        subcolecao: {
            colecaoFirebase: 'subcolecao',
            todosVeem: false,
            mostrarQuemCriou: false,
            readType: 'card',
            readSequence: 2,
            input: [{
                n: 1,
                tipo: 'text',
                titulo: 'Titulo:',
            }, {
                n: 2,
                tipo: 'text',
                titulo: 'Texto:',
            }, {
                n: 3,
                tipo: 'number',
                titulo: 'Valor:',
                soma: true,
                media: false
            }, {
                n: 4,
                tipo: 'number',
                titulo: 'Valor media:',
                soma: false,
                media: true
            }, {
                n: 5,
                tipo: 'date',
                titulo: 'Dia da compra',
            }, {
                n: 6,
                tipo: 'select',
                titulo: 'Selecao',
                selecao: ['S1', 'S2']
            }],
        }
    }

    const parametros2 = {
        titulo: 'Notas',
        colecaoFirebase: 'Notas',
        todosVeem: false,
        mostrarQuemCriou: false,
        readType: 'card',
        readSequence: 1,
        input: [{
            n: 1,
            tipo: 'text',
            titulo: 'Titulo:',
        }, {
            n: 2,
            tipo: 'text',
            titulo: 'Texto:',
        }, {
            n: 3,
            tipo: 'number',
            titulo: 'Valor:',
            soma: true,
            media: false
        }, {
            n: 4,
            tipo: 'number',
            titulo: 'Valor media:',
            soma: false,
            media: true
        }, {
            n: 5,
            tipo: 'subsoma',
            titulo: 'Total de sub:',
            formnome: 'Valor:',
            soma: false,
            media: true
        }, {
            n: 6,
            tipo: 'subsoma',
            titulo: 'Total de sub:',
            formnome: 'Valor:',
            soma: true,
            media: false
        }, {
            n: 7,
            tipo: 'date',
            titulo: 'Dia da compra',
        }, {
            n: 8,
            tipo: 'select',
            titulo: 'Selecao',
            selecao: ['S13', 'S23']
        }],
        subcolecao: {
            colecaoFirebase: 'subcolecao',
            todosVeem: false,
            mostrarQuemCriou: false,
            readType: 'card',
            readSequence: 2,
            input: [{
                n: 1,
                tipo: 'text',
                titulo: 'Titulo:',
            }, {
                n: 2,
                tipo: 'text',
                titulo: 'Texto:',
            }, {
                n: 3,
                tipo: 'number',
                titulo: 'Valor:',
                soma: true,
                media: false
            }, {
                n: 4,
                tipo: 'select',
                titulo: 'Selecao',
                selecao: ['S11', 'S22']
            }],
        }
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={
                    <Read
                        parametros={parametros}
                    />
                } path="/" exact />
                <Route element={
                    <Read
                        parametros={parametros2}
                    />
                } path="/notes" exact />
                <Route element={userDados?.adm ? <Adm /> : <PaginaInvalida />} path="/adm" exact />
                <Route element={<Configuracoes />} path="/configuracoes" exact />
                <Route element={<PaginaInvalida />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}