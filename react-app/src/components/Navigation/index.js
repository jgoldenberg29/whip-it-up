import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const user = useSelector(state => state.session.user);

	return (
		<div>
			<span>
				<NavLink exact to="/">Home</NavLink>
			</span>
			{user &&<NavLink exact to='/recipes/new'>Share Recipe</NavLink>}
			{isLoaded && (
				<span>
					<ProfileButton user={user} />
				</span>
			)}
		</div>
	);
}

export default Navigation;
