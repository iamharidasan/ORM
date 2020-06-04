import {
  LOGIN_USER,
  REGISTER_USER,
  USER_LOAD,
  USER_ERROR,
} from "../actions/types"

const initialState = {
  loading: true,
  token: null,
  isAuthenticated: false,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOAD:
      const token = localStorage.getItem("token")
      return {
        ...state,
        token: token,
        loading: false,
        user: payload,
        isAuthenticated: true,
      }

    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
      }

    case USER_ERROR:
      localStorage.removeItem("token")
      return { ...state, token: null, loading: false, isAuthenticated: false }

    default:
      return state
  }
}
