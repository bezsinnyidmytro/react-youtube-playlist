import {ActionTypes} from "./actions";

function rootReducer(state = {}, action) {
    switch (action.type) {

        case ActionTypes.ADD_HISTORY_ITEM:
            const { item } = action.payload;
            const newHistory = [
                item,
                ...state.history.filter((elem) => elem.videoId !== item.videoId)
            ];

            localStorage.setItem('playerHistory', JSON.stringify(newHistory));

            return (Object.assign({}, state, {
                history: newHistory
            }));

        case ActionTypes.REMOVE_HISTORY_ITEM:
            const filteredHistory = state.history.filter((item) => item.videoId !== action.payload.id);

            localStorage.setItem('playerHistory', JSON.stringify(filteredHistory));

            return (Object.assign({}, state, {
                history: [
                    ...filteredHistory
                ]
            }));

        case ActionTypes.SET_SEARCH_RESULT:
            return (Object.assign({}, state, {
                query: action.payload.query,
                searchResult: action.payload.searchResult,
                searchNextPage: action.payload.nextPage,
                searching: false,
            }));

        case ActionTypes.SEARCH_MORE:
            return (Object.assign({}, state, {
                searching: true,
            }));

        default:
            return (state);
    }
}

export {
    rootReducer
};
export default rootReducer;