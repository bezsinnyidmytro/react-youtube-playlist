import React, {Component} from 'react';

import './App.css';
import MainPage from "./pages/MainPage";
import store from "./store";

class App extends Component {
    componentDidMount() {
        console.log(store.getState());
        this.unsubscribe = store.subscribe(() => {
            console.log(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (<MainPage/>);
    }
}

export default App;
