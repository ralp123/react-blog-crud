import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import {getPostById} from './DataModels1'



const axios = require('axios');

class Post extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoading: true,
			postDetails: '',

			isOpen: false,
			imgLightBox: '',

			postID: props.postId
        }
	}

	componentDidMount(){
		this.postD();
	}

	componentDidUpdate(){
		console.log('componentDidUpdate');
	}

	postD = () =>{    
		const postId = this.state.postID;

		getPostById(postId)
			.then(response => {
			// handle success
			let data = response.data;
			if(response.status === 200){
                //console.log(data);
				this.setState({
					isLoading: false,
					postDetails: response.data
				});
			}
		})
		.catch(error => {
			console.log(error);
		})
		.finally(val => {
			//always executed
			//console.log(val);
		});
	} 

	postDetail = () =>{    
		let postDetails = this.state.postDetails;
		let isLoading = this.state.isLoading;
		let tableDetail;

		if(isLoading === true){
			tableDetail = <div class="spinner-border"></div>;
		}else{
            tableDetail = 
                <>
                <Link className="nav-link" to={'/post/'+postDetails.id}><h2>{ postDetails.title }</h2></Link>
                <img src={require(''+postDetails.img_path+'')} />
				<p><b>{ postDetails.author }, { postDetails.date }</b></p>
                <p>{ postDetails.content }</p>
                </>
		}
		
		return (
			<>
				{tableDetail}
			</>
		);
	} 

	render() {
		let postDetail = this.postDetail();


		return (
            <>
				<div className="container-fluid">
                    {postDetail}
                </div>
                {/* <h1>Testing</h1> */}
            </>			
		);
	}	
}

export default Post;
