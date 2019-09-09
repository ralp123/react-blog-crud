import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
//import * as serviceWorker from './serviceWorker';


var config = {
    apiKey: "AIzaSyDsklUyz_6VSvZAWrfmhiT8Cdcw0kyddXQ",
    authDomain: "reactjs-test-a2133.firebaseapp.com",
    databaseURL: "https://reactjs-test-a2133.firebaseio.com",
    projectId: "reactjs-test-a2133",
    storageBucket: "reactjs-test-a2133.appspot.com",
    messagingSenderId: "921785744042",
    appId: "1:921785744042:web:098683e71ba556d4"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
