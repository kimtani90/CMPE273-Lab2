import {ADD_GROUP} from "../actions/index";
import {DELETE_GROUP} from "../actions/index";
import {ADD_MEMBER} from "../actions/index";
import {DELETE_MEMBER} from "../actions/index";
import {GET_GROUPS} from "../actions/index";

const initialState = {

    groups :[]
};

const groupdata = (state = initialState, action) => {

    console.log(action.payload);
    switch (action.type) {


        case ADD_GROUP :
            return {
                groups:[
                    ...state.groups,
                    action.payload
                ]
            }


        case GET_GROUPS :
            return {
                groups:action.payload

            }
        case DELETE_GROUP :
            return {
                groups:[
                    ...state.groups.slice(0, action.payload),
                    ...state.groups.slice(action.payload + 1)
                ]
            }

        case ADD_MEMBER :
            return {
                groups: {
                    ...state.groups,
                    members: [
                        ...state.members,
                        action.payload
                    ]

                }
            }

/*
        case GET_MEMBERS :
            return {
                groups: {
                    ...state.groups,
                    members: [
                        ...state.members,
                        action.payload
                    ]

                }

            }*/
        case DELETE_MEMBER :
            return {
                groups: {
                    ...state.groups,
                    members: [
                    ...state.members.slice(0, action.payload),
                    ...state.members.slice(action.payload + 1)
                    ]
                }
            }


        default :
            return state;

    }
};

export default groupdata;