import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import styles from './Blog.module.css';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => {
	return import('./NewPost/NewPost');
});

class Blog extends Component {
	state = {
		isAuth: false
	};

	render() {
		return (
			<div className={styles.Blog}>
				<header>
					<nav>
						<ul>
							<li>
								<NavLink to='/posts/' exact activeClassName={styles.active}>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: '/new-post',
										hash: '#submit',
										search: '?quick-submit=true'
									}}
									activeClassName={styles.active}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>

				{/* <Route path='/' exact render={() => <h1>Home</h1>} />
				<Route path='/' render={() => <h1>Home 2</h1>} /> */}

				<Switch>
					{this.state.isAuth ? <Route path='/new-post' component={AsyncNewPost} /> : null}
					<Route path='/posts' component={Posts} />
					<Route render={() => <h1>Not found!</h1>} />
					{/* <Redirect from='/' to='/posts' /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;
