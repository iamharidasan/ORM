import {
  GET_REVIEWS,
  ERROR_REVIEWS,
  GET_REVIEW,
  ERROR_REVIEW,
} from "../actions/types"

const initialState = {
  reviews: [],
  review: null,
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_REVIEWS:
      return { ...state, reviews: payload, loading: false }

    case ERROR_REVIEWS:
      return { ...state, reviews: [], loading: false }

    case GET_REVIEW:
      return { ...state, review: payload, loading: false }

    case ERROR_REVIEW:
      return { ...state, review: null, loading: false }

    default:
      return state
  }
}
