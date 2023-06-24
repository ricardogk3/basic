import { ADD_DADOCOLECAO, DELETE_DADOCOLECAO, GET_DADOSCOLECAO, UPDATE_DADOCOLECAO, ADD_SUBCOLLECTION, UPDATE_SUBCOLLECTION, DELETE_SUBCOLLECTION, GET_SUBCOLLECTION } from "./action";

// Reducer
const initialState = {
    dadosColecao: [],
    subcollection: {},
};

const reducer = (state = initialState, action) => {
    const chave = !!action.payload ? Object.keys(action.payload)[0] : {};
    switch (action.type) {
        case GET_DADOSCOLECAO:
            return {
                ...state,
                dadosColecao: action.payload,
            };
        case GET_SUBCOLLECTION:
            state.subcollection[chave] = Object.values(action.payload)[0]
            return { ...state }
        case ADD_DADOCOLECAO:
            return {
                ...state,
                dadosColecao: [...state.dadosColecao, action.payload],
            };
        case UPDATE_DADOCOLECAO:
            return {
                ...state,
                dadosColecao: state.dadosColecao.map((dadoColecao) =>
                    dadoColecao.id === action.payload.id ? action.payload : dadoColecao
                ),
            };
        case DELETE_DADOCOLECAO:
            return {
                ...state,
                dadosColecao: state.dadosColecao.filter((dadoColecao) => dadoColecao.id !== action.payload),
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