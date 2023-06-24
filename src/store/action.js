import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Actions Types
export const GET_DADOSCOLECAO = 'GET_DADOSCOLECAO';
export const ADD_DADOCOLECAO = 'ADD_DADOCOLECAO';
export const UPDATE_DADOCOLECAO = 'UPDATE_DADOCOLECAO';
export const DELETE_DADOCOLECAO = 'DELETE_DADOCOLECAO';
export const ADD_SUBCOLLECTION = 'ADD_SUBCOLLECTION';
export const UPDATE_SUBCOLLECTION = 'UPDATE_SUBCOLLECTION';
export const DELETE_SUBCOLLECTION = 'DELETE_SUBCOLLECTION';
export const GET_SUBCOLLECTION = 'GET_SUBCOLLECTION';


export const getDadosColecao = (collectionF) => async (dispatch) => {
  const q = query(collection(db, collectionF));
  const dadosColecao = await getDocs(q);
  if (dadosColecao.docs.length > 0) {
    const dadosColecaoArray = [];
    for (var snap of dadosColecao.docs) {
      const data = snap.data();
      const bookData = {
        id: snap.id, // Adicionar o ID do documento
        ...data,
      };
      dadosColecaoArray.push(bookData);
    }
    dispatch({
      type: GET_DADOSCOLECAO,
      payload: dadosColecaoArray
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
    const enviaIdSub = { [originalId]: subcolecaoArray }
    dispatch({
      type: GET_SUBCOLLECTION,
      payload: enviaIdSub,
    });
  }
  return true
};

export const getAllSubcollection = (collectionF, subcolecaoFirebase) => async (dispatch) => {

  const q = query(collection(db, collectionF));
  const dadosColecao = await getDocs(q);
  if (dadosColecao.docs.length > 0) {
    const bookIds = dadosColecao.docs.map((snap) => snap.id); // Obter apenas os IDs dos documentos
    bookIds.map(async (originalId) => {
      const originalDocRef = doc(db, collectionF, originalId);

      const subcolecaoRef = collection(originalDocRef, subcolecaoFirebase);
      const subcolecaoDocs = await getDocs(subcolecaoRef);

      if (subcolecaoDocs.docs.length > 0) {
        const subcolecaoArray = subcolecaoDocs.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, originalId, ...data }; // Adiciona o ID da coleção aos dados da subcoleção
        });
        const enviaIdSub = { [originalId]: subcolecaoArray }
        dispatch({
          type: GET_SUBCOLLECTION,
          payload: enviaIdSub,
        });
      }
    })
    // dispatch({
    //   type: GET_BOOKS,
    //   payload: bookIds,
    // });
  }
  // const colecaoRef = collection(db, collectionF);

  // const query = query(collectionGroup(colecaoRef, subcolecaoFirebase));

  // const subcolecaoDocs = await getDocs(query);

  // if (subcolecaoDocs.docs.length > 0) {
  //   const subcolecaoArray = subcolecaoDocs.docs.map((doc) => {
  //     const data = doc.data();
  //     return { id: doc.id, ...data }; // Não é necessário adicionar o ID da coleção original
  //   });

  //   dispatch({
  //     type: GET_SUBCOLLECTION,
  //     payload: subcolecaoArray,
  //   });
  // }

  // return true;
};




export const addDadoColecao = (collectionF, bookData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, collectionF), bookData);
    const dadoColecao = { id: docRef.id, ...bookData };

    dispatch({
      type: ADD_DADOCOLECAO,
      payload: dadoColecao,
    });
  } catch (error) {
    console.log('Error adding dadoColecao:', error);
  }
};

export const updateDadoColecao = (collectionF, editedBook) => async (dispatch) => {
  try {
    const bookRef = doc(db, collectionF, editedBook.id);
    await updateDoc(bookRef, editedBook);

    dispatch({
      type: UPDATE_DADOCOLECAO,
      payload: editedBook,
    });
  } catch (error) {
    console.log('Error updating dadoColecao:', error);
  }
};

export const deleteDadoColecao = (collectionF, id) => async (dispatch) => {
  try {
    const bookRef = doc(db, collectionF, id);
    await deleteDoc(bookRef);

    dispatch({
      type: DELETE_DADOCOLECAO,
      payload: id,
    });
  } catch (error) {
    console.log('Error deleting dadoColecao:', error);
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

