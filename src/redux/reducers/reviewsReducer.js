import { FETCH_REVIEWS, UPDATE_REVIEWS, ADD_REVIEWS } from "../actions/reviewsAction";

const initState = {
    reviews: [],
};

const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };
        case UPDATE_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };
        case ADD_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };
        default:
            return state;
    }
};

export default reviewsReducer;
