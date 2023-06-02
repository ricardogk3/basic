import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ADD_BOOKS = 'ADD_BOOKS';
export const GET_BOOKS = 'GET_BOOKS';
export const DELETE_ALL = 'DELETE_ALL';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const postBook = (newBook, colecaoFirebase) => async (dispatch) => {
  const docRef = await addDoc(collection(db, colecaoFirebase), newBook);
  const newBookWithId = {
    ...newBook,
    id: docRef.id,
  };
  dispatch({
    type: ADD_BOOKS,
    payload: newBookWithId
  })
}

// export const postBook = (newBook, colecaoFirebase, subcolecaoFirebase) => async (dispatch) => {
//     const novaColecaoRef = collection(db, colecaoFirebase);
//     const novaSubcolecaoRef = collection(novaColecaoRef.doc().path, subcolecaoFirebase);

//     await addDoc(novaSubcolecaoRef, newBook);

//     dispatch({
//       type: ADD_BOOKS,
//       payload: newBook,
//     });
//   };


// export const getBooks=(collectionF)=>async(dispatch)=>{
//     const q = query(collection(db, collectionF));
//     const books = await getDocs(q);
//     if(books.docs.length > 0){
//         const booksArray = [];
//         for(var snap of books.docs){
//             const data = snap.data();
//             booksArray.push(data);
//         }
//         dispatch({
//             type: GET_BOOKS,
//             payload: booksArray
//         })
//     }
// }

export const getBooks = (collectionF, subcolecaoFirebase) => async (dispatch) => {
  subcolecaoFirebase = 'subcolecao'
  const q = query(collection(db, collectionF));
  const books = await getDocs(q);

  if (books.docs.length > 0) {
    const booksArray = [];

    for (var snap of books.docs) {
      const data = snap.data();

      // Acessar a subcoleção desejada
      const subcolecaoRef = collection(snap.ref, subcolecaoFirebase);
      const subcolecaoDocs = await getDocs(subcolecaoRef);

      const bookData = {
        id: snap.id, // Adicionar o ID do documento
        ...data,
        subcolecao: subcolecaoDocs.docs.map((doc) => doc.data()),
      };

      booksArray.push(bookData);
    }

    dispatch({
      type: GET_BOOKS,
      payload: booksArray,
    });
  }
};

export const deleteAll = () => async (dispatch) => {
  const q = query(collection(db, 'Books'));
  const books = await getDocs(q);
  for (var snap of books.docs) {
    await deleteDoc(doc(db, 'Books', snap.id));
  }
  dispatch({
    type: DELETE_ALL
  })
}

export const deleteBook = (id) => async (dispatch) => {
  const q = query(collection(db, 'Books'));
  const books = await getDocs(q);
  for (var snap of books.docs) {
    // const data = snap.data();
    const documentId = snap.id;
    if(documentId === id){
        await deleteDoc(doc(db, 'Books', snap.id))
    }
  }
  dispatch({
      type: DELETE_BOOK,
      payload: id
  })

}

export const updateBook = (editedBook, collectionF) => async (dispatch) => {
  const q = query(collection(db, collectionF));
  const books = await getDocs(q);
  for (var snap of books.docs) {
    // const data = snap.data();
    const documentId = snap.id;
    if (documentId === editedBook.id) {
      const bookRef = doc(db, collectionF, snap.id);
      await updateDoc(bookRef, editedBook)
    }
  }
  dispatch({
    type: UPDATE_BOOK,
    payload: editedBook
  })
}


// export const updateBook = (editedBook, collectionF, subcolecaoFirebase) => async (dispatch) => {
//   const q = query(collection(db, collectionF));
//   const books = await getDocs(q);

//   for (var snap of books.docs) {
//     const data = snap.data();

//     if (data.isbn === editedBook.previousIsbn) {
//       const bookRef = doc(db, collectionF, snap.id);
//       const subcolecaoRef = collection(bookRef.path, subcolecaoFirebase);

//       await updateDoc(bookRef, {
//         isbn: editedBook.isbn,
//         author: editedBook.author,
//         title: editedBook.title,
//       });

//       // Adicionar um documento à subcoleção
//       await addDoc(subcolecaoRef, {
//         // Dados da subcoleção
//       });
//     }
//   }

//   dispatch({
//     type: UPDATE_BOOK,
//     payload: editedBook,
//   });
// };