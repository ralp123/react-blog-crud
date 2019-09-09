import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import {getPostById} from './DataModels1'

import { FaThumbsUp } from 'react-icons/fa';

const axios = require('axios');

class Post extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoading: true,
			postDetails: '',

			isOpen: false,
			imgLightBox: '',

			postID: props.postId,
			isComment: false,
			afterCommentSpinner: '',
			isLoadingLike: false,
			showMoreBtn: 3
		}
		
		this.textComment = this.textComment.bind(this);
	}

	componentDidMount(){
		this.postD();
	}

	componentDidUpdate(){
		console.log('componentDidUpdate');
	}

	textComment(event) {
		this.setState({
			commentField: event.target.value,
		});
	}

	showMoreBtn = () => {
		this.setState({ 
			showMoreBtn: this.state.showMoreBtn + 6 
		});
	}

	onComment = () => {
		this.setState({ isComment: true });
	}

	onLike = () => {	
		this.setState({
			isLoadingLike: true
		});

		const {postID, postDetails} = this.state;
		const postData = {
			id: postID,
			like: postDetails.like + 1
		};

		console.log(postData);
		
		firebase.database().ref('post/' + postID).update(postData, 
			(error) => {
			if (error) {
				console.log('failed');
			} else {
				//on success;
				this.postD();
				this.setState({
					isLoadingLike: false
				});
			}
		});
	}

	onSubmitComment = (e,id) => {
		e.preventDefault();

		const {commentField, postDetails} = this.state;
		let comment;

		this.setState({ afterCommentSpinner: <span className="spinner-grow spinner-grow-sm"></span> })

		if(typeof postDetails.comment === 'string'){
			comment = [];
			comment.push(commentField);
		}else{
			comment = postDetails.comment;
			comment.push(commentField);
		}

		const postData = {
			id: id,
			comment: comment
		};

		firebase.database().ref('post/' + id).update(postData, 
			(error) => {
			if (error) {
				console.log('failed');
			} else {
				//on success;
				this.postD();
				
				this.setState({ 
					getPostLoadingInComment: true,
					isComment: false,
					commentField: '',
					afterCommentSpinner: ''
				});
			}
		});
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
		//let postDetails = this.state.postDetails;
		const {postDetails, isLoading, isComment, afterCommentSpinner, isLoadingLike, showMoreBtn} = this.state;
		let tableDetail;

		if(isLoading === true){
			tableDetail = <div class="spinner-border"></div>;
		}else{
            tableDetail = 
                <>
					<Link className="no-underline" to={'/post/'+postDetails.id}><h2>{ postDetails.title }</h2></Link>
					<img src={require(''+postDetails.img_path+'')} />
					<p><b>{ postDetails.author }, { postDetails.date }</b></p>
					<p>{ postDetails.content }</p>
					<span>{postDetails.like} <FaThumbsUp /></span>

					<div className="mt-2 mb-2">
						{isLoadingLike ? (
							<button className="btn btn-sm btn-primary mr-1" disabled>
								<span className="spinner-grow spinner-grow-sm"></span> Like
							</button>
						) : (
							<button className="btn btn-sm btn-primary mr-1" onClick={() => this.onLike()}><FaThumbsUp /> Like</button>
						)}

						<button className="btn btn-sm btn-primary" onClick={()=> this.onComment()}>Comment</button>
					</div>

					{isComment ? (
						<div class="mb-5">
							<form action="GET" >
								<textarea className="form-control" name="content_value" value={this.state.commentField} onChange={this.textComment}  />
								<button type="submit" className="btn btn-primary mt-2 float-right" onClick={(e) => this.onSubmitComment(e, postDetails.id)}>
									{afterCommentSpinner}
									Save
								</button>
							</form>
						</div>
					) : null }

					{(typeof postDetails.comment === 'object') ? (
						/* To display the nested comment */	
						(postDetails.comment.length <= 3) ? (	
							<>
							{postDetails.comment.map((comments,key) => (
								<div class="card bg-info mb-1" key={key}>
									<div class="card-body p-2">
									<strong>User 1</strong> <br/>
										<p class="card-text">{comments}</p>
									</div>
							   	</div>
							))}
							</>
						) : ( 
							<>
							{postDetails.comment.slice(0,showMoreBtn).map((comments,key) => (
								<div class="card bg-info mb-1" key={key}>
									<div class="card-body p-2">
									<strong>User 1</strong> <br/>
										<p class="card-text">{comments}</p>
									</div>
							   	</div>	
							))}

							<button class="btn btn-sm btn-primary" onClick={() => this.showMoreBtn()}>More</button>
							</>
						)
					) : 
						null
					}
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
            </>			
		);
	}	
}

export default Post;
