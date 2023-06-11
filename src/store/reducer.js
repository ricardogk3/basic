import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK, ADD_SUBCOLLECTION, UPDATE_SUBCOLLECTION, DELETE_SUBCOLLECTION, GET_SUBCOLLECTION } from "./action";

// Reducer
const initialState = {
    books: [],
    subcollection: {},
};

const reducer = (state = initialState, action) => {
    const chave = !!action.payload ? Object.keys(action.payload)[0] : {};
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case GET_SUBCOLLECTION:
            // const chave = Object.keys(action.payload)[0]
            state.subcollection[chave] = Object.values(action.payload)[0]
            return { ...state }
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                ),
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            };
        case ADD_SUBCOLLECTION:
            const novoItem = Object.values(action.payload)[0];

            if (state.subcollection[chave]) {
                // A chave já existe na subcoleção, adicione o novo item
                state.subcollection[chave].push(novoItem);
            } else {
                // A chave não existe na subcoleção, crie uma nova entrada com o novo item
                state.subcollection[chave] = [novoItem];
            }

            return { ...state };


        case UPDATE_SUBCOLLECTION:
            return {
                ...state,
                subcollection: {
                    ...state.subcollection,
                    [action.payload.originalId]: state.subcollection[action.payload.originalId].map((item) =>
                        item.id === action.payload.id ? action.payload : item
                    ),
                },
            };

        // case DELETE_SUBCOLLECTION:
        //     return {
        //         ...state,
        //         books: state.books.map((book) =>
        //             book.id === action.payload.id
        //                 ? {
        //                     ...book,
        //                     subcolecao: book.subcolecao.filter(
        //                         (subcollection) =>
        //                             subcollection.id !== action.payload.subcollectionId
        //                     ),
        //                 }
        //                 : book
        //         ),
        //     };
        case DELETE_SUBCOLLECTION:
            return {
                ...state,
                subcollection: {
                    ...state.subcollection,
                    [action.payload.originalId]: state.subcollection[action.payload.originalId].filter(
                        (item) => item.id !== action.payload.subcollectionId
                    ),
                },
            };

        default:
            return state;
    }
};

export default reducer;