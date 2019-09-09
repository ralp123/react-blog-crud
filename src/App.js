import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { Router, Link } from "@reach/router";
import Home from './Home';
import Profile from './Profile';
import FireBase from './FireBase';
import Posts from './Post';

function App() {
	return (
	  	<Router>
			<div className="container-fluid">
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
					
					<Link className="navbar-brand" to="/">Food Blog</Link>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/firebase" component={FireBasePage}>Profile</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/firebase" component={FireBasePage}>About</Link>
						</li>
						{/* <li className="nav-item">
							<Link className="nav-link" to="/firebase" component={FireBasePage}>Test</Link>
						</li> */}
					</ul>
				</nav>
			</div>
			{/* <div className="container"> */}
			<>
				<Route exact path="/" component={HomePage} />
				{/* <Route path="/profile" component={ProfilePage} /> */}
				<Route path="/firebase" component={FireBasePage} />
			
				<Route path="/post/:id" component={Post} />
				{/* <Route path="post/:id" component={Post} /> */}
			</>
	  	</Router>
	);
  }
  
function HomePage() {
	return (
		<>
			<Home />
		</>
	);
}

function ProfilePage() {
	return (
		<>
			<Profile />
		</>
	);
}

function FireBasePage() {
	return (
		<>
			<FireBase />
		</>
	);
}
  
function About() {
	return (
	  <div>
		<h2>About</h2>
	  </div>
	);
}

function Post(match) {
	return (
		<>
			<Posts postId={match.match.params.id}/>
		</>
	);
}

export default App;
