import { combineReducers } from 'redux'
import filesreducer from './filesreducer'
import userreducer from './userreducer'
import userlogreducer from './userlogreducer'

export default combineReducers({
    filesreducer,
    userreducer,
    userlogreducer
})