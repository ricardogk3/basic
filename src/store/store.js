// // import { createStore, applyMiddleware } from 'redux';
// // import thunk from 'redux-thunk';
// // import reducer from './reducer';

// // const store = createStore(reducer, applyMiddleware(thunk));

// // export default store;
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// // import { reduxFirestore, getFirebase } from 'react-redux-firebase';
// import {getFirebase } from 'react-redux-firebase';
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import firebase from '../firebase';
// import rootReducer from './reducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middleware = [
//     thunk.withExtraArgument({ getFirestore }),
//     // This is where you add other middleware like redux-observable
//   ];

// const store = createStore(
//   rootReducer,
//   composeEnhancers(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//     reduxFirestore(firebase)
//   )
// );

// // const store = () => createStore(
// //     rootReducer,
// //     compose(
// //       applyMiddleware(...middleware),
// //       reduxFirestore(firebase),
// //     ),
// //   );


// export default store;

// // export default store;

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;