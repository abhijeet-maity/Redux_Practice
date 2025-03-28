// const redux = require('redux');
// const thunkMiddleware = require('redux-thunk').default;
// const axios = require('axios');
// const createStore = redux.createStore;
// const applyMiddleware = redux.applyMiddleware;


// const initialState = {
//   loading: false,
//   users: [],
//   error: "",
// };

// //Action types
// const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
// const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
// const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// // Action creators
// const fetchUserrequest = () => {
//   return {
//     type: FETCH_USERS_REQUESTED,
//   };
// };

// const fetchUserSuccess = (users) => {
//   return {
//     type: FETCH_USERS_SUCCEEDED,
//     payload: users,
//   };
// };

// const fetchUserFailure = (error) => {
//   return {
//     type: FETCH_USERS_FAILED,
//     payload: error,
//   };
// };

// //Reducer Function
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_USERS_REQUESTED:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_USERS_SUCCEEDED:
//       return {
//         loading : false,
//         users: action.payload,
//         error: ""
//       };
//     case FETCH_USERS_FAILED: 
//       return {
//         loading : false,
//         users: [],
//         error: action.payload,
//       }
//     default: return state
//   }
// };

// const fetchUsers = () => {
//     return function(dispatch){
//         dispatch(fetchUserrequest);
//         axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
//             const users = response.data.map((user) => user.id)
//             dispatch(fetchUserSuccess(users))
//         }).catch((error) => {
//             dispatch(fetchUserFailure(error.message))
//         })
//     }
// }

// const store = redux.createStore(reducer, applyMiddleware(thunkMiddleware));  
// store.subscribe(() => {console.log(store.getState())}) 
// store.dispatch(fetchUsers());



const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const { createStore, applyMiddleware } = redux;

// Initial State
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Action Types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// Action Creators
const fetchUserRequest = () => {
  return { type: FETCH_USERS_REQUESTED };
};

const fetchUserSuccess = (users) => {
  return { type: FETCH_USERS_SUCCEEDED, payload: users };
};

const fetchUserFailure = (error) => {
  return { type: FETCH_USERS_FAILED, payload: error };
};

// Reducer Function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCEEDED:
      return { loading: false, users: action.payload, error: "" };
    case FETCH_USERS_FAILED:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

// Async Action Creator using Thunk
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest()); // Invoke the function
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

// Create Store with Middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState())); 

// Dispatch Async Action
store.dispatch(fetchUsers());
