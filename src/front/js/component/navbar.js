import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const logOut = () => {
        localStorage.removeItem("token");
		store.favorites = [];
		console.log(store.favorites);
        store.auth = false;
		navigate("/")
      }

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{store.auth ? 
					(<div>
						<Link to="/">
							<button className="btn btn-primary" onClick={logOut}>Log Out</button>
						</Link>	
					</div>
					) : (
					<div>
						<Link to="/signup">
							<span className="navbar-brand mb-0 h1">Sign Up</span>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary">Log In</button>
						</Link>
					</div>
					)}
			</div>
		</nav>
	);
};
