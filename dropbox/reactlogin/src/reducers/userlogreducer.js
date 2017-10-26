
import {GET_USERLOGS} from "../actions/index";


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {

    userLog:[]

};

const userlogdata = (state = initialState, action) => {
console.log(action.payload)
    switch (action.type) {

        case GET_USERLOGS :
            return {

                userLog:action.payload

            };

        default :
            return state;

    }
};

export default userlogdata;