export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const UPDATE_REVIEWS = "UPDATE_REVIEWS";
export const ADD_REVIEWS = "ADD_REVIEWS";

export const fetchReviews = reviews => {
    return dispatch => {
        dispatch({
            type: FETCH_REVIEWS,
            payload: reviews
        });
    }
}

export const updateReviews = reviews => {
    return dispatch => {
        dispatch({
            type: UPDATE_REVIEWS,
            payload: reviews
        });
    }
}

export const addReviews = reviews => {
    return dispatch => {
        dispatch({
            type: ADD_REVIEWS,
            payload: reviews
        });
    }
}
