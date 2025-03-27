const redux = require('redux');
const initialState = {
  name: "Abhijeet",
  address: {
    street: "Linking road",
    city: "NSP",
    state: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return {
        ...state,
        address: {
            ...state.address,
            street: action.payload,
        }
      };
    default:
      return state;
  }
};

// const str = window.atob("SGV5IEFiaGlqaXQsIFRoaXMgbWVzc2FnZSBpcyBlbmNyeXB0ZWQ=");
// console.log(window.atob("SGV5IEFiaGlqaXQsIFRoaXMgbWVzc2FnZSBpcyBlbmNyeXB0ZWQ="));

const store = redux.createStore(reducer);
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState())
})
store.dispatch(updateStreet('Apex Tower, 1176'))
unsubscribe()