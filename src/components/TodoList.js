import React from 'react'
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Read from './crud/Read';
// import CRUD from './crud/CRUD';

export default function TodoList() {
  // Define a coleção do Firestore a ser ouvida
  useFirestoreConnect('users');

  // Obtém a lista de usuários do Firestore
  const users = useSelector(state => state.reducer);

  const parametros = {
    titulo: 'Teste',
    colecaoFirebase: 'Books',
    readType: 'card',
    readSequence: 1,
    input: [{
      n: 1,
      tipo: 'text',
      titulo: 'Autor:',
    }, {
      n: 2,
      tipo: 'text',
      titulo: 'Titulo:',
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
    subcolecao: {
      colecaoFirebase: 'subcolecao',
      readType: 'card',
      readSequence: 2,
      input: [{
        n: 1,
        tipo: 'text',
        titulo: 'Autor:',
      }, {
        n: 2,
        tipo: 'text',
        titulo: 'Titulo:',
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

  // Renderiza a lista de usuários
  return (
    <div>
      <Read
        parametros={parametros}
        dados={null}
      />
    </div>
  );
}