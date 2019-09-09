import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import Img from 'react-image';

class Profile extends Component {

	constructor(props){
		super(props);

		this.state={
			title: 'React Crud',
			act: 0,
			index: '',
			datas: [],
			clicks: 0,
			update: 0,
			update_post: 0,
			title_value: '',
			post_key: '',
			content_value: '',
			pictures: [],
			imgSrc: './images/img-placeholder.png'
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(pic) {
        this.setState({
			pictures: this.state.pictures.concat(pic),
		});
    }

	componentDidMount(){
		//console.log('componentDidMount');
		
	}

	componentDidUpdate(){
		//console.log('componentDidUpdate');
		//console.log(this.state.pictures);
	}

	handleTitleChange(event) {
		this.setState({
			title_value: event.target.value,
		});
	}

	handleContentChange(event) {
		this.setState({
			content_value: event.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let datas = this.state.datas;
		const title = this.state.title_value;
		const content = this.state.content_value;
		const file = this.state.pictures;
		const post_updated = this.state.update_post;
		const post_key = this.state.post_key;
		
		
		let image = './images/'+file[file.length - 1].name;

		let data = {
			title, content, image
		}

		if(post_updated === 1){
			const postData = JSON.parse(localStorage.getItem('postData'));
			
			postData[post_key].title = title;
			postData[post_key].content = content;
	
			console.log(postData);
			localStorage.setItem('postData', JSON.stringify(postData))
		}else{	
			datas.push(data);
			localStorage.setItem('postData', JSON.stringify(datas))
		}
		this.setState({update: 1})
	}

	resetForm = (e) => {
		e.preventDefault(); 

		this.setState({
			...this.state,
			title_value: '',
			content_value: '',
			update_post: 0,
		})
	}

	fRemove = (i,e) => {
		e.preventDefault();

		const postData = JSON.parse(localStorage.getItem('postData'));

		postData.splice(i, 1);

		localStorage.setItem('postData', JSON.stringify(postData))
		this.setState({ update : 1 })
	}

	fEdit = (i,e) => {
		e.preventDefault();
		
		const postData = JSON.parse(localStorage.getItem('postData'));

		this.setState({ update_post : 1 });
		this.setState({ post_key : i });

		this.setState({ title_value : postData[i].title }) 
		this.setState({ content_value : postData[i].content}) 

		this.setState({ imgSrc : postData[i].image}) 
	}

	loadData = () => {
		const postData = JSON.parse(localStorage.getItem('postData'));

		let tableDetails;

		if(postData){
			tableDetails = postData.map((value, i) => 
			<tr key={i}>
				<td>{i+1}</td>
				<td><Img src={require(''+value.image+'')} style={{width:'75px', height:'50px'}}/></td>
				<td>{value.title}</td>
				<td>{value.content}</td>
				<td>
					<button onClick={(e) => this.fEdit(i,e)} className="btn btn-info btn-sm mr-1">edit</button>
					<button type="submit" onClick={(e) => this.fRemove(i,e)} className="btn btn-danger btn-sm mr-1">remove</button>
				</td>
			</tr>
		);
		}else{
			tableDetails = "No Record Found."
		}

		return tableDetails;
	} 

	render() {
		//const datas = this.state.datas
		//let postData = JSON.parse(localStorage.getItem(''));
		//const postData = JSON.parse(localStorage.getItem('postData'));
		const tableDetails = this.loadData();
		const postTitle = this.state.title_value;
		const updatePost = this.state.update_post;
		let imguploader;
		let prevImg;

		//console.log('test-'+updatedPost)

		if(postTitle){
			imguploader = <ImageUploader
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
			imguploader = <ImageUploader
				withIcon={true}
				buttonText='Choose images'
				onChange={this.onDrop}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				fileSizeError='File size is too Big.' 
				singleImage={true}
				defaultImages= {[]}
			/>
		}

		if(updatePost === 1){
			prevImg = <img src={require(''+this.state.imgSrc+'')} style={{width:'100px', height:'100px'}}/>
		}
		
		return (
            <>
                {/* <form ref="myForm" className="" >
                    <div className="form-group">
                        <label htmlFor="name" className="text-left">Title:</label>
                        <input type="text" ref="title" placeholder="Title" className="form-control" value={this.state.title_value} id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Content:</label>
                        <input type="text" ref="content"  placeholder="Content" className="form-control" id="address"/>
                    </div>
                        <button onClick={(e) => this.fSubmit(e)} className="btn btn-primary">Post</button>
                </form> */}

                <form name="myForm" onSubmit={(e) => { this.resetForm(e); this.handleSubmit(e)}}>
                    <div className="form-group">
                    <label htmlFor="name" className="text-left">Title:</label>
                    	<input type="text" className="form-control" name="title_value" value={this.state.title_value} onChange={this.handleTitleChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="name"  className="text-left">Content:</label>
                    	<input type="text" className="form-control" name="post_value" value={this.state.content_value} onChange={this.handleContentChange} />
                    </div>
					<div className="form-group">
						{/* <input type="file" name="myImage" onChange={this.onDrop} multiple /> */}
						{imguploader}
					</div>	
					<div className="form-group">
						{prevImg}	
					</div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            
            <br/>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
							<th>Image</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>		
                        {tableDetails}
                    </tbody>
                </table>
            </>
		);
	}	
}

export default Profile;
