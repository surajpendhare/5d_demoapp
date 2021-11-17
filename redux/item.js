export const ADD_TO_FAV = 'ADD_TO_FAV';

const initialState = [];

const FavCharacter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return [...state, action.payload];
  }
  return state;
};

export default FavCharacter;
