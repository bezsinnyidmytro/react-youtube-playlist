const ActionTypes = {
    ADD_HISTORY_ITEM: "ADD_HISTORY_ITEM",
    REMOVE_HISTORY_ITEM: "REMOVE_HISTORY_ITEM",
    SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
    SEARCH_MORE: "SEARCH_MORE",
};

const ActionCreators = {
    addHistoryItem,
    removeHistoryItem,
    setSearchResult,
    searchMore,
};

function addHistoryItem(payload) {
    return ({
        type: ActionTypes.ADD_HISTORY_ITEM,
        payload
    });
}

function removeHistoryItem(payload) {
    return ({
        type: ActionTypes.REMOVE_HISTORY_ITEM,
        payload
    });
}

function setSearchResult(payload) {
    return ({
        type: ActionTypes.SET_SEARCH_RESULT,
        payload
    });
}

function searchMore() {
    return ({
        type: ActionTypes.SEARCH_MORE
    });
}

export {
    addHistoryItem,
    removeHistoryItem,
    setSearchResult,
    searchMore,
    ActionTypes
};
export default ActionCreators;
