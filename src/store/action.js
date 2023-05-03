// import { getFirestore } from 'redux-firestore';
// import firebase from '../firebase';

// export const fetchTodos = () => {
//   return async (dispatch, getState, { getFirebase }) => {
//     // const firebase = getFirebase();
//     // const firestore = getFirestore();
//     const todos = [];
//     // const snapshot = await firestore.collection('todos').get();
//     const snapshot = await firebase.db.collection("ticket").get();
//     console.log(snapshot)

//     snapshot.forEach(doc => {
//       todos.push({ id: doc.id, ...doc.data() });
//     });

//     dispatch({ type: 'FETCH_TODOS', payload: todos });
//   };
// };

// export const addTodo = title => {
//   return async (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();
//     const docRef = await firestore.collection('todos').add({ title });

//     dispatch({ type: 'ADD_TODO', payload: { id: docRef.id, title } });
//   };
// };

// export const updateTodo = (id, title) => {
//   return async (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();
//     await firestore.collection('todos').doc(id).update({ title });

//     dispatch({ type: 'UPDATE_TODO', payload: { id, title } });
//   };
// };

// export const deleteTodo = id => {
//   return async (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();
//     await firestore.collection('todos').doc(id).delete();

//     dispatch({ type: 'DELETE_TODO', payload: id });
//   };
// };


import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import fs from '../firebase';

export const ADD_BOOKS = 'ADD_BOOKS';
export const GET_BOOKS = 'GET_BOOKS';
export const DELETE_ALL = 'DELETE_ALL';

export const postBook=(newBook)=>async(dispatch)=>{
    await addDoc(collection(fs, 'Books'),{
        isbn: newBook.isbn,
        author: newBook.author,
        title: newBook.title
    })
    dispatch({
        type: ADD_BOOKS,
        payload: newBook
    })
}

export const getBooks=()=>async(dispatch)=>{
    const q = query(collection(fs, 'Books'));
    const books = await getDocs(q);
    if(books.docs.length > 0){
        const booksArray = [];
        for(var snap of books.docs){
            const data = snap.data();
            booksArray.push(data);
        }
        dispatch({
            type: GET_BOOKS,
            payload: booksArray
        })
    }
}

export const deleteAll=()=>async(dispatch)=>{
    const q = query(collection(fs,'Books'));
    const books=await getDocs(q);
    for(var snap of books.docs){
        await deleteDoc(doc(fs,'Books',snap.id));
    }
    dispatch({
        type: DELETE_ALL
    })
}