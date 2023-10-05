import {
  FETCH_USER,
  REMOVE_USER,
  UPDATE_USER,
  UPDATE_RECENTLY_VIEW,
} from "../actions/authAction";

const initState = {
  currentUser: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        currentUser: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UPDATE_RECENTLY_VIEW:
      if (state.currentUser) {
        if (!state.currentUser.recentlyViewIds.includes(action.payload)) {
          let newRecentlyViewIds = state.currentUser.recentlyViewIds;
          newRecentlyViewIds.unshift(action.payload);
          if (newRecentlyViewIds.length > 4) newRecentlyViewIds.pop();
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              recentlyViewIds: newRecentlyViewIds,
            },
          };
        } else return state;
      } else return state;
    default:
      return state;
  }
};

export default authReducer;
