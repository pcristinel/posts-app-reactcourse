import React, { Component } from 'react';
import axios from 'axios';

import styles from './FullPost.module.css';

class FullPost extends Component {
	state = {
		loadedPost: null
	};

	componentDidMount() {
		console.log(this.props);
		this.loadData();
	}

	componentDidUpdate(prevProps, prevState) {
		this.loadData();
	}

	loadData() {
		if (this.props.match.params.id) {
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)
			) {
				axios.get('/posts/' + this.props.match.params.id).then((response) => {
					// console.log(response);
					this.setState({ loadedPost: response.data });
				});
			}
		}
	}

	deletePostHandler = () => {
		axios.delete('/posts/' + this.props.match.params.id).then((response) => {
			console.log(response);
		});
	};

	render() {
		let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

		if (this.props.match.params.id) {
			post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
		}

		if (this.state.loadedPost) {
			post = (
				<div className={styles.FullPost}>
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className={styles.Edit}>
						<button onClick={this.deletePostHandler} className={styles.Delete}>
							Delete
						</button>
					</div>
				</div>
			);
		}

		return post;
	}
}

export default FullPost;
