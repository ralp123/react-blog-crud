import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';
const base_url1 = 'https://reactjs-test-a2133.firebaseio.com';
//const base_url2 = 'https://reactjs-test-a2133.firebaseio.com/post/2.json'
export const getUsers = (id) => {
    return axios.get(base_url + '/users/' + id)
}


const getPosts = () => {
	return axios.get(base_url1 + '/posts')
}

export const getPostById = (id) => {
    return axios.get(base_url1 + '/post/'+id+'.json')
    //return base_url1 + '/post/'+id+'.json';
}

// const deletePosts = (id) => {
// 	return axios.delete(base_url + 'posts/' + id)
// }


//export const getUSers1 = getUSers();
//export const deletePost = deletePosts();

//https://reactjs-test-a2133.firebaseio.com/post/2/.json