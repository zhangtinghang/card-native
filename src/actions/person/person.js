import { createAction } from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/person'


const setOneImgUri = createAction(type.FIRST_SILDER_IMG, actions.setOneImgUri)
const setTwoImgUri = createAction(type.SECOND_SILDER_IMG, actions.setTwoImgUri)

const personList = createAction(type.CHANGE_PERSON_DATA, actions.personList)


const actionCreators = {
  setOneImgUri,
  setTwoImgUri,
  personList
}

export default { actionCreators }