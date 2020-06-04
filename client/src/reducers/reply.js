import {
  GET_REPLIES,
  ERROR_REPLIES,
  ERROR_REPLY,
  GET_REPLY,
} from "../actions/types"

const initialState = {
  replies: [],
  reply: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_REPLIES:
      return { ...state, replies: payload, loading: false }

    case ERROR_REPLIES:
      return { ...state, replies: [], loading: false }

    case GET_REPLY:
      return { ...state, reply: payload, loading: false }

    case ERROR_REPLY:
      return { ...state, reply: null, loading: false }

    default:
      return state
  }
}
