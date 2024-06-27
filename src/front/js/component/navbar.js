import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const logOut = () => {
		console.log(store.auth);
        localStorage.removeItem("token");
        store.auth = false;
		location.reload()
      }

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{!store.auth ? 
					(<div>
						<Link to="/signup">
							<span className="navbar-brand mb-0 h1">Sign Up</span>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary">Log In</button>
						</Link>
					</div>
					) : (
					<Link to="/">
						<button className="btn btn-primary" onClick={logOut}>Log Out</button>
					</Link>	
					)}
			</div>
		</nav>
	);
};
