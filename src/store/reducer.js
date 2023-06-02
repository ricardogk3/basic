import { ADD_BOOKS, DELETE_ALL, DELETE_BOOK, GET_BOOKS, UPDATE_BOOK } from "./action";

const initialState=[];

const reducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_BOOKS:
            return action.payload;

        case ADD_BOOKS:
            return [...state, action.payload];

        case DELETE_ALL:
            return [];

        case DELETE_BOOK:
            const filteredBooks = state.filter((book)=>book.id!==action.payload);
            return filteredBooks;

        case UPDATE_BOOK:
            const updatedBooks=[];
            const data = action.payload;
            state.map((book)=>{
                if(book.id===data.id){
                    book = data
                }
                updatedBooks.push(book);
            });
            return updatedBooks;
            
        default:
            return state;
    }
}

export default reducer;
