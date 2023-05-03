// const initialState = [];

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_TODOS':
//       console.log("aquii")
//       return action.payload;

//     case 'ADD_TODO':
//       return [...state, action.payload];

//     case 'UPDATE_TODO':
//       return state.map(todo =>
//         todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
//       );

//     case 'DELETE_TODO':
//       return state.filter(todo => todo.id !== action.payload);

//     default:
//       return state;
//   }
// };


// export default reducer;


import { ADD_BOOKS, DELETE_ALL, GET_BOOKS } from "./action";

const initialState=[];

const reducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_BOOKS:
            return action.payload;

        case ADD_BOOKS:
            return [...state, action.payload];

        case DELETE_ALL:
            return [];

        default:
            return state;
    }
}

export default reducer;
