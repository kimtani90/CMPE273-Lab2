import {ADDFILE} from "../actions/index";
import {DELETE_FILE} from "../actions/index";
import {GET_FILES} from "../actions/index";


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {

    files :[]
};

const filedata = (state = initialState, action) => {
    console.log("filessss");
    console.log(action.payload);
    switch (action.type) {


        case ADDFILE :
            return {
                files:[
                    ...state.files,
                    action.payload
                ]
            }


        case GET_FILES :
            return {
                files:action.payload

            }
        case DELETE_FILE :
            return {
                files:[
                    ...state.files.slice(0, action.payload),
                    ...state.files.slice(action.payload + 1)
                ]
            }


        default :
            return state;

    }
};

export default filedata;