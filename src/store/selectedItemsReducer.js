const selectedItemsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, ...action.payload };
    case 'REMOVE':
      const newState = { ...state };
      delete newState[action.payload];
      console.log('NEW STATE', newState);
      return newState;
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export default selectedItemsReducer;
