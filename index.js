const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

console.log("Hello Redux from index.js");

//Action types
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK';

//action creator for ordering cake
function orderCake() {
    //returning action object
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

//action creator for re-stocking cake.
function restockCake(qty = 1) {
    //returning action object.
    return {
        type: CAKE_RESTOCK,
        payload: qty,
    }
}

function orderIcecream() {
    return {
        type: ICECREAM_ORDERED,
        payload: 1,
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty,
    }
}

//initial state combined
// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 6,
// }

//Separate States for each
const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIcecreams: 6,
}


// Reducers
// (previousState, action) => newState
const CakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCK: 
            return {
                ...state, 
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED: 
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1,
            }
        case ICECREAM_RESTOCK: 
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combinedReducers({
    cake: CakeReducer,
    iceCream: IceCreamReducer,
})

//Store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

//Listener for the store which listens when any store update takes place.
// const unSubscribe = store.subscribe(() => console.log('Update state', store.getState()))
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake())
// store.dispatch(restockCake(4))

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
actions.orderCake();
actions.restockCake();
actions.restockCake(4);
actions.orderIcecream();
actions.restockIcecream(4);
//To unsubscribe the changes in the store.
//Any dispatch after the unsubscribe will not run.
// unSubscribe();

// store.dispatch(orderCake())
//This will not run.

