import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [demoUser, setDemoUser] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data.errors);
    } else {
        closeModal()
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data.errors);
    } else {
        closeModal()
    }
  }

  return (
    <div className='login-modal-container'>
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='form-label-container'>
          Email
          <input
            className='form-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='form-label-container'>
          Password
          <input
            className='form-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className={Object.values(errors).length ? 'errors': 'no-errors'}>
            {Object.values(errors).length ? "Invalid credentials" : ''}
          </p>
        <button
          className='login-button'
          type="submit">Log In</button>
      </form>
      <button
        className='demo-button'
        onClick={handleDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
