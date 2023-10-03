export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchCategories = categories => {
  return dispatch => {
    dispatch({
      type: FETCH_CATEGORIES,
      payload: categories
    })
  }
};

// fetch products
export const fetchProducts = products => {
  return dispatch => {
    dispatch(fetchProductsSuccess(products));
  };
};
