import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img from 'react-image';
import { loadData, loadDetails, Click, LoadD } from './DataModels';
import { getUsers, getPostById } from './DataModels1';
import Post from './Post';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { FaThumbsUp } from 'react-icons/fa';
import ReactDOM from "react-dom";

const axios = require('axios');


class Home extends Component {

	constructor(props){
		super(props);

		this.state = {
			isLoading: true,
			postDetails: '',

			isOpen: false,
			imgLightBox: '',

			isComment: false,
			isLike: '',
			isLoadingLike: true,

			getPostDetailsById: '',
			getPostLoading: true,

			commentField: '',
			getPostLoadingInComment: true,
			hasComments: '',

			afterCommentSpinner: '',
		}
		this.textComment = this.textComment.bind(this);
	}

	componentDidMount(){
		console.log('componentDidMount');
		this.postD();

		// let id = 2
		// getUsers(id)
        //  	.then((res) => {
		// 		console.log(res.data);
		// })

		// getPostById(2)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		if(res.status === 200){
		// 			this.setState({getPostDetailsById: res.data})
		// 		}
		// });
	}

	componentDidUpdate(){
		//console.log('componentDidUpdate');
	}

	textComment(event) {
		this.setState({
			commentField: event.target.value,
		});
	}

	postD = () =>{    
		axios.get('https://reactjs-test-a2133.firebaseio.com/post.json')
		.then(response => {
			// handle success
			let data = response.data;
			if(response.status === 200){
				this.setState({
					isLoading: false,
					postDetails: data.sort((a, b) => a - b).reverse()
				});
			}
		})
		.catch(error => {
			console.log(error);
		})
		.finally(val => {
			//always executed
		});
	} 

	onComment = (id) => {
		this.setState({ isComment: true });

		getPostById(id)
			.then(response => {
				if(response.status === 200){
					this.setState({
						getPostLoadingInComment: false,
						getPostDetailsById: response.data
					});
				}
			})
			.catch(error => {
				console.log(error);
			}).finally(val => {
				const commentField = this.refs[`comment-${id}`];
				commentField.className = "form-control mb-2";

				const commentFieldBtn= this.refs[`btn-comment-${id}`];
				commentFieldBtn.className = "btn btn-primary btn-sm float-right";
			});
	}

	onLike = (event, id) => {	
		this.setState({ isLoadingLike: false })

		getPostById(id)
			.then(response => {
				if(response.status === 200){
					this.setState({
						getPostLoading: false,
						getPostDetailsById: response.data
					})
					
				}
			})
			.catch(error => {
				console.log(error);
			})
			.finally(val => {
				//To override the Css of this specific span.
				const btnLike = this.refs[`ref-${id}`];
				btnLike.className = "btn btn-primary btn-sm  mr-1";
			
				//To override the Css of this specific button.
				const btn = this.refs[`btn-${id}`];
				btn.className = "hidden";
				
			});

		setTimeout(() => { 
			if(this.state.getPostLoading === false){
				const postDetail = this.state.getPostDetailsById;
				
				const postData = {
					id: postDetail.id,
					like: postDetail.like + 1
				};

				firebase.database().ref('post/' + postData.id).update(postData, 
					(error) => {
					if (error) {
						console.log('failed');
					} else {
						//on success;
						this.postD();
						this.setState({ 
							getPostLoading: true,
							isLoadingLike: true
						});

						const btn = this.refs[`btn-${id}`];
						btn.className = "btn btn-primary btn-sm  mr-1";
					}
				});
			}
		}, 1000);
	}

	submitComment = (e) =>{
		e.preventDefault();
		
		const {commentField} = this.state;
		const postDetail = this.state.getPostDetailsById;
		let commentTest;
		/* Override the class of comment button and textfield after clicking the comment button */
		const commentFieldBtn= this.refs[`btn-comment-${postDetail.id}`];
		commentFieldBtn.className = "btn btn-primary btn-sm float-right";
		commentFieldBtn.disabled = true;

		const getCommentField = this.refs[`comment-${postDetail.id}`];
		getCommentField.className = "form-control mb-2";
		getCommentField.disabled = true;

		this.setState({ afterCommentSpinner: <span className="spinner-grow spinner-grow-sm"></span> })
		
		if(typeof postDetail.comment === 'string'){
			commentTest = [];
			commentTest.push(commentField);
		}else{
			commentTest = postDetail.comment;
			commentTest.push(commentField);
		}

		const postData = {
			id: postDetail.id,
			comment: commentTest
		};

		firebase.database().ref('post/' + postData.id).update(postData, 
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

	tableDetail = () =>{    
		const {isLoading, isLoadingLike, isComment, getPostLoading, postDetails, commentField, hasComments, afterCommentSpinner, showMoreComments } = this.state;
		let tableDetail, commentbox, likeButton, testing;
		//postDetails.sort((a, b) => a - b).reverse()

		if(isLoading === true){
			tableDetail = <div className="spinner-border"></div>;
		}else{
			tableDetail = Object.keys(postDetails).map((i) => (
				<div className="post-padding-bottom-25 post-list" key={i}>
					<a href="#"><img className="img-fluid" src={require(''+postDetails[i].img_path+'')} onClick={() => this.setState({ isOpen: true, imgLightBox: postDetails[i].img_path })} /></a>
					<Link className="no-underline" to={'/post/'+postDetails[i].id}><h2>{ postDetails[i].title }</h2></Link>
					<Link className="no-underline" to="#"><h5>{ postDetails[i].author }, { postDetails[i].date }</h5></Link>
					<br />
					<p>{ postDetails[i].content }</p>
					<span>{postDetails[i].like} <FaThumbsUp /></span>
					
					<div className="mt-2 mb-2">
						{(isLoadingLike === false) ? (	
							<button ref={`ref-${postDetails[i].id}`} className="btn btn-primary hidden" disabled>
								<span className="spinner-grow spinner-grow-sm"></span> Like
							</button>
						) : (null)}
					
						<button ref={`btn-${postDetails[i].id}`} id={postDetails[i].id} className="btn btn-sm btn-primary mr-1" onClick={(event, id) => this.onLike(event, postDetails[i].id)}><FaThumbsUp /> Like</button>	
						<button className="btn btn-sm btn-primary" onClick={() => this.onComment(postDetails[i].id)}>Comment</button>
					</div>

					{isComment ? (
						<div class="mb-5">
							<form action="GET" >
								<textarea ref={`comment-${postDetails[i].id}`} className="form-control hidden" name="content_value" value={this.state.commentField} onChange={this.textComment}  />
								<button type="submit" ref={`btn-comment-${postDetails[i].id}`} className="btn btn-primary float-right hidden" onClick={(e) => this.submitComment(e)}>
									{afterCommentSpinner}
									Save
								</button>
							</form>
						</div>
					) : null }
					
					{(typeof postDetails[i].comment === 'object') ? (
						/* To display the nested comment */	
						(postDetails[i].comment.length <= 3) ? (	
							<>
							{postDetails[i].comment.map((comments,key) => (
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
							{postDetails[i].comment.slice(0,3).map((comments,key) => (
								<div class="card bg-info mb-1" key={key}>
									<div class="card-body p-2">
									<strong>User 1</strong> <br/>
										<p class="card-text">{comments}</p>
									</div>
							   	</div>	
							))}
							<Link className="no-underline" to={'/post/'+postDetails[i].id}><button class="btn btn-sm btn-primary">More</button></Link>
							</>
						)
					) : 
						null
					}
				</div>
			))
		}
		
		return (
			<>
				{tableDetail}
			</>
		);
	} 

	render() {
		const tableDetail = this.tableDetail();
		const { isOpen }  = this.state.isOpen;

		return (
            <>
				<div className="container-fluid">
					<Carousel showThumbs={false} showStatus={false}  showArrows={true} >
						<div>
							<img src={require('./images/spices1200x800-1.jpg')} />
							
						</div>
						<div>
							<img src={require('./images/spices1200x800-2.jpg')} />
							
						</div>
						<div>
							<img src={require('./images/spices1200x800-3.jpg')} />
							
						</div>
					</Carousel>
				</div>
				
				<div class="container">
					<br />
					<>
						<h2 className="text-center">Latest Post</h2>
						{tableDetail}
					</>

					{isOpen && (
						<Lightbox
							mainSrc={require(''+this.state.imgLightBox+'')}
							onCloseRequest={() => this.setState({ isOpen: false })}
						/>
					)}
				</div>
            </>			
		);
	}	
}

export default Home;
