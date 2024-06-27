import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Favorites = () => {

	const { store, actions } = useContext(Context);

    useEffect(() => {

        actions.getAllFavorites();

    }, []);

    return (
		<div className="d-flex justify-content-center">

		</div>
    );
};