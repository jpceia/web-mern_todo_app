import { GET, POST, DELETE } from '../constants/actionTypes';

const reducer = (todos = {}, action) => {
    switch (action.type) {
        case GET:
            return action.payload;
        case POST:
            return [
                ...todos,
                action.payload
            ];
        case DELETE:
            return todos.filter(todo => todo._id !== action.payload._id);
        default:
            return todos;
    }
}

export default reducer;
