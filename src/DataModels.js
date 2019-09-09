import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import Img from 'react-image';
import firebase from "firebase";
import { withState } from 'recompose';
import lifecycle from 'react-pure-lifecycle';
const axios = require('axios');

// this.state={
//     title: 'React Crud',
// }
// function postDetails(){
//     //const [val, setValues] = useState('');

//     //let rootRef = firebase.database().ref();
//     const rootRef = firebase.database().ref().child('post');
//     //const speedRef = rootRef.child('post');
//     rootRef.on('value', snap => {	
//         let val = snap.val();
        
//         this.setState({
//             isLoading: 1,
//             postDetail: val,
//         })
//     })		
// } 
// create your lifecycle methods
const componentDidMount = (props) => {
    console.log('I mounted! Here are my props: ', props);
}

const methods = {
    componentDidMount
}

const FunctionalComponent = ({children}) => {
    return (
        <div>
        {children}
        </div>
    );
};


function fpostD(){   
    let testing; 
    axios.get('https://reactjs-test-a2133.firebaseio.com/post.json')
    .then(response => {
        // handle success
        //console.log(response.data);
       //return response.data;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

const enhanced = withState("count", "handleCounter", 0);
const App = enhanced(({ count, handleCounter }) => {
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => handleCounter(x => x + 1)}>Increment</button>
      <button onClick={() => handleCounter(z => z - 1)}>Decrement</button>
    </div>
  );
});

function PostDetails(){
    const [val, setValues] = useState(0);
    return (
        <div>
            <p>You clicked {val} times</p>
            <button onClick={() => setValues(val + 1)}>
            Click me
            </button>
        </div>
    ); 
} 



function loadData1() {
    let test = "testing"
    return test;
} 
function loadDetails1() {
    let test = "testing1012"
    return test;
} 

export const loadData = loadData1()
export const loadDetails = loadDetails1()

//example export of recompose
export const Click = App

export const LoadD = 'test'
//export default lifecycle(methods)(FunctionalComponent);
//export const loadData = 'testing'
