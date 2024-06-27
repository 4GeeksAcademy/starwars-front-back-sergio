import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (e) => {
		e.preventDefault();
		
		actions.logIn(email, password);

		setEmail("");
		setPassword("");
		navigate("/");
    }

    return (
		<div className="modal-body w-100 px-5">
			<form>
				<div className="form-group">
					<label htmlFor="inputEmail">Email address</label>
					<input type="email" className="form-control" id="inputEmail" onChange={e => setEmail(e.target.value)}/>
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword">Password</label>
					<input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
				</div>
				<button type="submit" className="btn btn-primary" onClick={handleLogIn}>Submit</button>
			</form>
		</div>
    );
};
