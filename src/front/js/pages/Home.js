import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {

    return (
		<div className="d-flex justify-content-center">
            <a className="m-5" href="/signup">Sign up</a>
            <a className="m-5" href="/login">Log in</a>
		</div>
    );
};