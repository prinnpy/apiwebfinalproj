import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;  // action.payload is the user model
                                             // if user not logged in then we return false (a bit of trickery here)
                                             // either the user is logged in, or we return false
        default:
            return state;
    }
}

// state is null while we decide if user is logged in or not
// when we hear back from fetch_user action will we return the user model or false