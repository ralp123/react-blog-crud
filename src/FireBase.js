import React, {Component} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';
import Img from 'react-image';
import Home from './Home';
import ImageCrop from './ImageCrop';


import { deletePost } from './DataModels1';

import SimpleReactValidator from "simple-react-validator";

import SweetAlert from "react-bootstrap-sweetalert";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Pagination from "react-js-pagination";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

//import { Pagination } from 'react-bootstrap';

//require("bootstrap/less/bootstrap.less");
//import SimpleReactValidator from 'simple-react-validator';

const axios = require('axios');



//import { AlertButton } from "./AlertButton.jsx";

//import SweetAlert from 'sweetalert2-react';

//import SweetAlert from 'react-bootstrap-sweetalert';

class FireBase extends Component {
	constructor(props){
		super(props);

		this.state = {
			postDetail: '',
			isLoading: 0,
			title_value: '',
			content_value: '',
			postId: '',
			isSaved: false,
			pictures: [],
			imgSrc: './images/img-placeholder.png',
			updatePost: false,
			isPublished: true,
			showSweetAlert: false,
			deletePost: false,
			listPostId: '',
			isLoadingDel: false,

			isOpen: false,
			imgLightBox: '',
			
			currentPage: 1,
			totalItemCount: '',
			itemsPerPage: 4,

			testing: false,
			data123: '',
			postDetail101: '',

			test: '',
			comment: ''
			// src: null,
			// crop: {
			// 	unit: "%",
			// 	width: 30,
			// 	aspect: 16 / 9
			// }
		}

		//this.validator = new SimpleReactValidator();
		this.validator = new SimpleReactValidator({
			element: message => <div className="custom-invalid-feedback">{message}</div>
		});

		//this.state1 = { isSaved: false }

		this.handleTitleVal = this.handleTitleVal.bind(this);
		this.handleContentVal = this.handleContentVal.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.handlePublished = this.handlePublished.bind(this);

		this.handlePageChange = this.handlePageChange.bind(this);

		//this.onCropChange = this.onCropChange.bind(this);

		//this.onImageLoaded = this.onImageLoaded.bind(this);
	}

	// handlePageChange(pageNumber) {
	// 	console.log(`active page is ${pageNumber}`);
	// 	this.setState({activePage: pageNumber});
	// }

	// handleSelect(number) {
	// 	console.log('handle select', number);
	// 	this.setState({currentPageNumber: number});
	// }
	// handleClick(event) {
	// 	this.setState({
	// 	  currentPage: Number(event.target.id)
	// 	});
	// }

	handlePageChange(pagenumber) {
		this.setState({
			currentPage: pagenumber
		});
	}

	onDrop(img) {
        this.setState({
			pictures: this.state.pictures.concat(img),
		});
	}

	// getCroppedImg(image, crop, fileName) {
	// 	const canvas = document.createElement("canvas");
	// 	const scaleX = image.naturalWidth / image.width;
	// 	const scaleY = image.naturalHeight / image.height;
	// 	canvas.width = crop.width;
	// 	canvas.height = crop.height;
	// 	const ctx = canvas.getContext("2d");
	
	// 	ctx.drawImage(
	// 	  image,
	// 	  crop.x * scaleX,
	// 	  crop.y * scaleY,
	// 	  crop.width * scaleX,
	// 	  crop.height * scaleY,
	// 	  0,
	// 	  0,
	// 	  crop.width,
	// 	  crop.height
	// 	);
	
	// 	return new Promise((resolve, reject) => {
	// 	  canvas.toBlob(blob => {
	// 		if (!blob) {
	// 		  //reject(new Error('Canvas is empty'));
	// 		  console.error("Canvas is empty");
	// 		  return;
	// 		}
	// 		blob.name = fileName;
	// 		window.URL.revokeObjectURL(this.fileUrl);
	// 		this.fileUrl = window.URL.createObjectURL(blob);
	// 		resolve(this.fileUrl);
	// 	  }, "image/jpeg");
	// 	});
	// }

	//componentDidMount(){
		//root for your database
		// const rootRef = firebase.database().ref().child('react');
		// const speedRef = rootRef.child('speed');
		// speedRef.on('value', snap => {
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });

		
		
		//console.log('test '+speedRef);

		// speedRef.on('value', snap => {
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });
		// /this.PostDetails()
		//console.log('component '+this.PostDetails())
		//this.PostDetails();
		//this.PostDetails();
	//}

	componentDidMount() {
		// For Firebase Realtime Update
		this.PostDetails();
		// For Firebase Realtime Update
		//console.log('dsfdsf')
	}


	componentWillUnmount() {
		//this.PostDetails();
	}

	// For Firebase Realtime Update
	PostDetails1 = () =>{
		//let rootRef = firebase.database().ref();
		const rootRef = firebase.database().ref().child('post');
		const speedRef = rootRef.child('post');
		rootRef.on('value', snap => {	
			let val = snap.val();
			
			this.setState({
				isLoading: 1,
				postDetail: val,
				totalItemCount: val.length
			})
		})		
	} 
	
	PostDetails = () =>{
		axios.get('https://reactjs-test-a2133.firebaseio.com/post.json').then(response => {
			this.setState({
				isLoading: 1,
				postDetail: response.data,
				totalItemCount: response.data.length,
			});
		}).catch(error => {
			console.log(error)
		}).finally(val => {
			//console.log(val)
		})
	} 

	tableDetails = () => {
		let isLoading = this.state.isLoading;
		let tableDetail;
		let tableD = this.state.postDetail;
		
		if(isLoading === 0){	
			tableDetail = <div class="spinner-border"></div>;
		}else{
			if(tableD === undefined){
				tableDetail = <tr>No data to display.</tr>
			}else{
				const { currentPage, itemsPerPage } = this.state;
				
				//Formula of get the First Post and Last 
				const LastPost = currentPage * itemsPerPage;
				const FirstPost = LastPost - itemsPerPage;
	
				const currentPost = tableD.slice(FirstPost, LastPost);
	
				let count = 1;
				tableDetail = currentPost.map((value, i) => 
					<tr key={i}>
						<td>{count++}</td>
						<td><a href="#"><Img src={require(''+value.img_path+'')} onClick={() => this.setState({ isOpen: true, imgLightBox: value.img_path })} style={{width:'75px', height:'50px'}}/></a></td>
						<td>{value.title}</td>
						<td>{value.content}</td>
						<td>
							<button onClick={(e) => this.editPost(value.id,e)} className="btn btn-info btn-sm mr-1">edit</button>
							<button type="submit" onClick={(e) => this.removePost(value.id,e)} className="btn btn-danger btn-sm mr-1">remove</button>			
						</td>
					</tr>
				)
			}
		}

		return tableDetail;
	}

	handleTitleVal(event) {
		this.setState({
			title_value: event.target.value,
		});
	}

	handleContentVal(event) {
		this.setState({
			content_value: event.target.value,
		});
	}

	handlePublished(event) {
		const target = event.target;
    	const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
			[name]: value,
		});
	}

	confirmedAlert = () => {
		this.setState({
			deletePost: true
		});

		setTimeout(
			() => { 
				if(this.state.deletePost === true){
					//console.log(firebase.database().ref('post/'+ 2).remove());
					//firebase.database().ref('post/'+ listPostId).remove()
					this.setState({ isLoadingDel: true });

					const listPostId = this.state.listPostId;
					const url = 'https://reactjs-test-a2133.firebaseio.com/post/'+listPostId+'.json'
					axios.delete(url)
						.then(response =>  {
							if(response.status === 200){
								//this.setState({ isLoadingDel: true });
								this.PostDetails();
							}
					  	})
					  	.catch(error =>  {
							console.log(error);
					  	}).finally(val => {
							this.setState({ isLoadingDel: false, deletePost: false, showSweetAlert: false })
						});
				} 
			}, 1000);
	}

	cancelledAlert = () => {
		this.setState({
			showSweetAlert: false
		});
	}

	removePost = (id,e) => {
		e.preventDefault();

		this.setState({ showSweetAlert: true, listPostId: id })
	}

	// removePost1 = (id,e) => {
	// 	firebase.database().ref('post/'+ id).remove()
	// }

	editPost = (i,e) => {
		let tableD = this.state.postDetail;

		this.setState({ postId : tableD[i].id }) 
		this.setState({ title_value : tableD[i].title }) 
		this.setState({ content_value : tableD[i].content }) 

		this.setState({ updatePost : true }) 
		this.setState({ imgSrc: tableD[i].img_path })
	}

	submitForm(e) {
		e.preventDefault();

		if (this.validator.allValid()) {
			let postId = this.state.postId;
			let tableD = this.state.postDetail;
			const title = this.state.title_value;
			const content = this.state.content_value;
			const author = 'Pando Crowbarjones';
			const dateToday = new Date();
			const comment = tableD[postId].comment;
			const isPublished = this.state.isPublished;
			const file = this.state.pictures;
			let postData = {};
			let paramId;
			let published;

			let timeDateToday = dateToday.toDateString() + ' ' + dateToday.toLocaleTimeString()

			/* To increment the ID */
			let id = tableD.length - 1;
			id += 1;
			/* */

			/* To get the last push image in the array */
			let image_path = './images/'+file[file.length - 1].name;
			/* */

			if(isPublished === true){
				published = 1;
			}else{
				published = 0;
			}

			if(Number.isInteger(postId)){
				postData = {
					id: postId,
					title: title,
					content: content,
					img_path: image_path,
					author: author,
					date: timeDateToday,
					like: 0,
					comment: comment,
					published : published
				};
				paramId = postId;	
			}else{
				postData = {
					id: id,
					title: title,
					content: content,
					img_path: image_path,
					author: author,
					date: timeDateToday,
					like: 0,
					comment: '',
					published : published
				};
				paramId = id;
			}

			// var newPostKey = firebase.database().ref().child('react').push().key;
			//updates['/post/' + paramId] = postData;
			firebase.database().ref('post/' + paramId).update(postData, 
				(error) => {
				if (error) {
					console.log('failed');
				} else {
					//console.log('Saved successfully!');
					this.resetForm(e)
					this.setState({ isSaved: true });
					this.setState({ updatePost: false })
					this.PostDetails();
				}
			});
		}else{
			this.validator.showMessages();
			// To Force display the message for the first click of submition
			this.forceUpdate();
		}
	}

	resetForm = (e) => {
		e.preventDefault(); 

		this.setState({
			title_value: '',
			content_value: '',
			postId: ''
		});
	}

	imageUploader = () => {
		const isSaved = this.state.isSaved;
		let ImgUploader;

		if(isSaved === false){
			ImgUploader = <ImageUploader
				withIcon={true}
				buttonText='Choose images'
				onChange={this.onDrop}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				withPreview={true}
				fileSizeError='File size is too Big.' 
				singleImage={true}
			/>	
		}else{
			ImgUploader = <ImageUploader
				withIcon={true}
				buttonText='Choose images'
				onChange={this.onDrop}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				withPreview={true}
				fileSizeError='File size is too Big.' 
				singleImage={true}
				defaultImages= {[]}
			/>	

			setTimeout(
				() => this.setState({ isSaved: false }),
				1000
			);
		}

		return ImgUploader;
	}

	render() {
		const isOpen  = this.state.isOpen;
		let tableDetails = this.tableDetails();
		let updatePost = this.state.updatePost;
		let prevImg;

		//this.PostDetails;

		if(updatePost === true){
			prevImg = 
			<div className="form-group">
				<h3>Photos</h3>
				<img src={require(''+this.state.imgSrc+'')} style={{width:'100px', height:'100px'}}/>
			</div>
		}

		let postDetail = this.state.postDetail;
		let pageDisplayed = Math.ceil(postDetail.length / this.state.itemsCountPerPage)
	
		const tablePagination = 		
			<Pagination
				hideNavigation
				activePage={this.state.currentPage}
				pageRangeDisplayed={pageDisplayed}
				itemsCountPerPage={this.state.itemsPerPage}
				totalItemsCount={this.state.totalItemCount}
				onChange={this.handlePageChange}

				innerClass="pagination"
				itemClass="page-item"
				linkClass="page-link"
			/>;

		//console.log(this.state.postDetail);

		// console.log(typeof this.state.postDetail)
		// fetch('https://api.thecatapi.com/v1/images')
		// .then(response => response.json())
		// .then(json => console.log(json))

		// fetch('https://reactjs-test-a2133.firebaseio.com/react.json', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		name: 'foo',
		// 		email: 'bar',
		// 		id: 67
		// 	}),
		// 	// headers: {
		// 	// 	"Content-type": "application/json; charset=UTF-8"
		// 	// }
		// })
		// .then(response => response.json())
		// .then(json => console.log(json))

		/* For Adding Value to Database*/
		// let id = 4;
		// var postData = {
		// 	id: id,
		// 	name: 'foo',
		// 	email: 'bar'
		// };

		// var newPostKey = firebase.database().ref().child('react').push().key;
		// var updates = {};
		// updates['/react/' + id] = postData;
		// firebase.database().ref().update(updates);

		/* For Deleting Value to Database */
		//firebase.database().ref('react/'+ 4).remove()

		/* Updating the data */
		// let id = 4;
		// var postData = {
		// 	id: id,
		// 	name: 'foo1',
		// 	email: 'bar1'
		// };
		//let totalPages = Math.ceil(this.state.totalItemsCount / this.state.numItemsPerPage);
		//const { todos, currentPage, todosPerPage } = this.state;
		
		// Logic for displaying todos
		// const indexOfLastTodo = currentPage * todosPerPage;
    	// const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		// const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
		
		// const renderTodos = currentTodos.map((todo, index) => {
		// 	return <li key={index}>{todo}</li>;
		// });

		// Logic for displaying page numbers
		// const pageNumbers = [];
		// let postDetail = this.state.postDetail;
		// let active = 2;

		// for (let i = 1; i <= Math.ceil(postDetail.length / todosPerPage); i++) {
		// 	pageNumbers.push(
		// 		<Pagination.Item key={i} active={i === active}>
		// 			{i}
		// 		</Pagination.Item>,
		// 	);
		// }
		
			

		// const renderPageNumbers = pageNumbers.map(number => {
		// 	return (
		// 		// <li
		// 		// 	key={number}
		// 		// 	id={number}
		// 		// 	onClick={this.handleClick}
		// 		// >
		// 		// 	{number}
		// 		// </li>

		// 		<Pagination
		// 			hideNavigation
		// 			pageRangeDisplayed={3}
		// 			itemsCountPerPage={3}
		// 			totalItemsCount={10}
		// 			onChange={this.handleClick}
		// 			id={number}
		// 		/>
		// 	);
		// });

		return (
            <div className="container-fluid">
				<form onSubmit={(e) => { this.submitForm(e) }}>
					<div className="form-group">
                    	<label htmlFor="name" className="text-left">Title:</label>
                    	<input type="text" className="form-control" name="title_value" value={this.state.title_value} onChange={this.handleTitleVal}/>
						
						{this.validator.message('title', this.state.title_value, 'required|min:5|max:120')}
					</div>
					<div className="form-group">
                    	<label htmlFor="name"  className="text-left">Content:</label>
                    	{/* <input type="text" className="form-control" name="post_value" value={this.state.content_value} onChange={this.handleContentVal} /> */}
						<textarea className="form-control" name="content_value" value={this.state.content_value} onChange={this.handleContentVal}/>

						{this.validator.message('content', this.state.content_value, 'required|min:5|max:500')}
					</div>
					<div className="form-group">
						{this.imageUploader()}

						{this.validator.message('Image', this.state.pictures, 'required')}
					</div>
					{prevImg}
					<div className="form-group">
						<input name="isPublished" type="checkbox" checked={this.state.isPublished} onChange={this.handlePublished} /> Published
					</div>
					<button type="submit" className="btn btn-success">Post</button>
				</form>
				<br />
				<table className="table table-striped">
		 			<thead>
		 				<tr>
		 					<th>#</th>
							<th>Img</th>
		 					<th>Title</th>
		 					<th>Content</th>
							<th>Action</th>
		 				</tr>
		 			</thead>
		 			<tbody>		
		 				{tableDetails}
		 			</tbody>
					
		 		</table>
				<>
					{tablePagination}
				</>

				{/* <Pagination
					activePage={this.state.activePage}
					itemsCountPerPage={3}
					totalItemsCount={this.state.totalItemCount}
					pageRangeDisplayed={5}
					onChange={() => this.handlePageChange(2)}
				/> */}

				{/* <Pagination
                    bsSize="medium"
                    items={totalPages}
					activePage={1}
					activePage={this.state.currentPageNumber}
                    onSelect={this.handleSelect.bind(this)}
				/> */}
				{/* <ul>
					{renderTodos}
				</ul>
				<ul id="page-numbers">
					{renderPageNumbers}
				</ul>	 */}

				<SweetAlert
					show={this.state.showSweetAlert}
					warning
					showCancel
					confirmBtnText="Yes, delete it!"
					confirmBtnBsStyle="danger"
					cancelBtnBsStyle="info"
					title="Delete Post?"
					onConfirm={this.confirmedAlert}
					onCancel={this.cancelledAlert}
					>	
					{this.state.isLoadingDel ? <div class="spinner-border"></div> : 'You will not be able to recover this imaginary file!'}
				</SweetAlert>

				{/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
					Open Lightbox
				</button> */}

				{isOpen && (
					<Lightbox
						mainSrc={require(''+this.state.imgLightBox+'')}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}

				{/* <ReactCrop src="./images/corn.jpg" crop={this.state.crop} /> */}
            </div>			
		);
	}	
}

export default FireBase;
