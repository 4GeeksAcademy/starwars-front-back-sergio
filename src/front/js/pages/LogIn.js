import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LogIn = () => {
	
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	const handleLogIn = async (e) => {
		e.preventDefault();
	
		try {
			await actions.logIn(email, password);
		} catch (error) {
			console.error("Login failed:", error);
		}

		setEmail("");
		setPassword("");

		navigate("/favorites");
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
				<div className="form-group mt-3">
					<button type="submit" className="btn btn-primary me-3" onClick={handleLogIn}>Submit</button>
					<Link to="/">
						<button className="btn btn-warning">Back</button>
					</Link>
				</div>
			</form>
		</div>
    );
};
