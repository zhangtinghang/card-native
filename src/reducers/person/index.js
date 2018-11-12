import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  sildeImg1:null,
  sildeImg2:null,
  personList:null
}
const originalReducers = {}

originalReducers[type.FIRST_SILDER_IMG] = (state, action) => {
  return {
    ...state,
    sildeImg1: action.payload.sildeImg1
  }
}
originalReducers[type.SECOND_SILDER_IMG] = (state, action) => {
  return {
    ...state,
    sildeImg2: action.payload.sildeImg2
  }
}
originalReducers[type.PERSON_LIST] = (state, action) => {
  console.log(action)
  return {
    ...state,
    personList: action.payload.personList
  }
}

// originalReducers[type.CHAT_INCREASES + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
//   ...state,
//   num: state.num + 1
// })

// originalReducers[type.CHAT_REDUCE + type.FETCH_SUCCESS_SUFFIX] = (state, action) => ({
//   ...state,
//   num: state.num - 1
// })

const reducer = handleActions(originalReducers, initialState)

export default reducer