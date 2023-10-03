import { FETCH_CATEGORIES, FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = {
  products: [],
  categories: [],
};

const productReducer = (state = initState, action) => {

  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
