import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Actions Types
export const GET_BOOKS = 'GET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ADD_SUBCOLLECTION = 'ADD_SUBCOLLECTION';
export const UPDATE_SUBCOLLECTION = 'UPDATE_SUBCOLLECTION';
export const DELETE_SUBCOLLECTION = 'DELETE_SUBCOLLECTION';
export const GET_SUBCOLLECTION = 'GET_SUBCOLLECTION';


export const getBooks = (collectionF) => async (dispatch) => {
  const q = query(collection(db, collectionF));
  const books = await getDocs(q);
  if (books.docs.length > 0) {
    const booksArray = [];
    for (var snap of books.docs) {
      const data = snap.data();
      const bookData = {
        id: snap.id, // Adicionar o ID do documento
        ...data,
      };
      booksArray.push(bookData);
    }
    dispatch({
      type: GET_BOOKS,
      payload: booksArray
    })
  }
  return true
}


export const getSubcollection = (collectionF, subcolecaoFirebase, originalId) => async (dispatch) => {
  const originalDocRef = doc(db, collectionF, originalId);

  const subcolecaoRef = collection(originalDocRef, subcolecaoFirebase);
  const subcolecaoDocs = await getDocs(subcolecaoRef);

  if (subcolecaoDocs.docs.length > 0) {
    const subcolecaoArray = subcolecaoDocs.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, originalId, ...data }; // Adiciona o ID da coleção aos dados da subcoleção
    });
    const enviaIdSub = {[originalId]:subcolecaoArray}
    dispatch({
      type: GET_SUBCOLLECTION,
      payload: enviaIdSub,
    });
  }
  return true
};


export const addBook = (collectionF, bookData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, collectionF), bookData);
    const book = { id: docRef.id, ...bookData };

    dispatch({
      type: ADD_BOOK,
      payload: book,
    });
  } catch (error) {
    console.log('Error adding book:', error);
  }
};

export const updateBook = (collectionF, editedBook) => async (dispatch) => {
  try {
    const bookRef = doc(db, collectionF, editedBook.id);
    await updateDoc(bookRef, editedBook);

    dispatch({
      type: UPDATE_BOOK,
      payload: editedBook,
    });
  } catch (error) {
    console.log('Error updating book:', error);
  }
};

export const deleteBook = (collectionF, id) => async (dispatch) => {
  console.log(collectionF, id)
  try {
    const bookRef = doc(db, collectionF, id);
    await deleteDoc(bookRef);

    dispatch({
      type: DELETE_BOOK,
      payload: id,
    });
  } catch (error) {
    console.log('Error deleting book:', error);
  }
};

export const addSubcollection = (collectionF, originalId, subcolecaoFirebase, subcollectionData) => async (
  dispatch
) => {
  try {
    const bookRef = doc(db, collectionF, originalId);
    const subcollectionRef = collection(bookRef, subcolecaoFirebase); // substitua 'subcolecao' pelo nome da sua subcoleção
    const docRef = await addDoc(subcollectionRef, subcollectionData);
    const subcollection = { id: docRef.id, ...subcollectionData };
    const enviaIdSub = { [originalId]: subcollection };
// payload: { id, subcollection },
dispatch({
  type: ADD_SUBCOLLECTION,
        payload: enviaIdSub,
    });
  } catch (error) {
    console.log('Error adding subcollection:', error);
  }
};


export const updateSubcollection = (
  collectionF,
  originalId,
  subcolecaoFirebase,
  subcollectionData
) => async (dispatch) => {
  try {
    const bookRef = doc(db, collectionF, originalId);
    const subcollectionRef = doc(bookRef, subcolecaoFirebase, subcollectionData.id); // substitua 'subcolecao' pelo nome da sua subcoleção
    const id = subcollectionData.id;
    await updateDoc(subcollectionRef, subcollectionData);

    dispatch({
      type: UPDATE_SUBCOLLECTION,
      payload: { originalId, id, ...subcollectionData },
    });
  } catch (error) {
    console.log('Error updating subcollection:', error);
  }
};


export const deleteSubcollection = (
  collectionF,
  originalId,
  subcolecaoFirebase,
  subcollectionId
) => async (dispatch) => {
  try {
    const bookRef = doc(db, collectionF, originalId);
    const subcollectionRef = doc(bookRef, subcolecaoFirebase, subcollectionId);
    await deleteDoc(subcollectionRef);

    dispatch({
      type: DELETE_SUBCOLLECTION,
      payload: { originalId, subcollectionId },
    });
  } catch (error) {
    console.log('Error deleting subcollection:', error);
  }
};

