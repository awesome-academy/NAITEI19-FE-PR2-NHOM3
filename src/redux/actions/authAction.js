export const FETCH_USER = "FETCH_USER";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_RECENTLY_VIEW = "UPDATE_RECENTLY_VIEW"

export const fetchUser = user => {
  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: user
    });
  }
}

// export const getCurrentUser = () => {
//   return dispatch({
//     type: GET_CURRENT_USER,
//   });
// }

export const removeUser = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_USER,
    })
  }
}

export const updateUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_USER,
      payload: user
    })
  }
}

export const updateRecentlyView = id => {
  return dispatch => {
    dispatch({
      type: UPDATE_RECENTLY_VIEW,
      payload: id
    })
  }
}

