const redux = require('redux');
const createStore = redux.createStore;

console.log("Hello Redux from index.js");

const CAKE_ORDERED = 'CAKE_ORDERED';

//action creator
function orderCake() {
    //returning action object
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

//initial state
const initialState = {
    numOfCakes: 10,
    numOfFlavours: 4,
}

// Reducers
// (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}

//Store
const store = createStore(reducer);
console.log('Initial state', store.getState());

const unSubscribe = store.subscribe(() => console.log('Update state', store.getState()))
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

unSubscribe();