import { SHOW_ERROR, REMOVE_ERROR } from "../actions/types"

const initialState = []
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SHOW_ERROR:
      return [...state, payload]

    case REMOVE_ERROR:
      return state.filter((alert) => alert.id !== payload)

    default:
      return state
  }
}
