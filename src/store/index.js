import {safeJsonParse} from "../utilities/json";
import { createStore } from 'redux'
import rootReducer from "./reducer";

const initialHistory = localStorage.getItem('playerHistory');
const initialSearchRes = localStorage.getItem('storedSearchResult');
const nextSearchPageToken = localStorage.getItem('nextSearchPageToken');
const searchQuery = localStorage.getItem('searchQuery');

const initialState = {
    history: safeJsonParse(initialHistory, [
        { title: 'Sum 41 - Some Say', videoId: 'D9cHP4KrdWI' }
    ]),
    query: searchQuery || '',
    searchResult: safeJsonParse(initialSearchRes, []),
    searchNextPage: nextSearchPageToken,
    searching: false,
};

const store = createStore(rootReducer, initialState);

export default store;
