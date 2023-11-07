import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import RecipeForm from '../RecipeForm';

function Navigation({ isLoaded }){
	const user = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<span>
				<NavLink exact to="/">Whip It Up</NavLink>
			</span>
			<div className='nav-profile-share'>
				{user &&<OpenModalButton
					buttonText='Share Recipe'
					modalComponent={<RecipeForm formType='create'/>}
				/>}
				{isLoaded && (
					<span>
						<ProfileButton user={user} />
					</span>
				)}
			</div>
		</div>
	);
}

export default Navigation;
