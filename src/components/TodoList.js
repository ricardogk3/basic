import React, { useEffect } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';


export default function TodoList() {
  // Define a coleção do Firestore a ser ouvida
  useFirestoreConnect('users');

  // Obtém a lista de usuários do Firestore
  const users = useSelector(state => state);
  console.log(users)

  // Renderiza a lista de usuários
  return (
    <ul>
        pi
      {/* {users && users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))} */}
    </ul>
  );
}