import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, email, password));
			if (data) {
				setErrors(data?.errors);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className='signup-modal-container'>
			<h1>Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<p className={errors?.message ? 'errors': 'no-errors'}>
					{errors?.message ? errors?.message : ''}
				</p>
				<label className='form-label-container'>
					First Name
					<input
						className='form-input'
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<p className={errors?.first_name ? 'errors': 'no-errors'}>
					{errors?.first_name ? errors?.first_name : ''}
				</p>
				<label className='signup-label-container'>
					Last Name
					<input
						className='form-input'
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<p className={errors?.last_name ? 'errors': 'no-errors'}>
					{errors?.last_name ? errors?.last_name : ''}
				</p>
				<label className='signup-label-container'>
					Email
					<input
						className='form-input'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<p className={errors?.email ? 'errors': 'no-errors'}>
					{errors?.email ? errors?.email : ''}
				</p>
				<label className='signup-label-container'>
					Username
					<input
						className='form-input'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<p className={errors?.username ? 'errors': 'no-errors'}>
					{errors?.username ? errors?.username : ''}
				</p>
				<label className='signup-label-container'>
					Password
					<input
						className='form-input'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<p className={errors?.password ? 'errors': 'no-errors'}>
					{errors?.password ? errors?.password : ''}
				</p>
				<label className='signup-label-container'>
					Confirm Password
					<input
						className='form-input'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button
					className='submit-button signup-button'
					type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
