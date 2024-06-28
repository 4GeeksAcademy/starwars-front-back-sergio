import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Favorites = () => {

	const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [deny, setDeny] = useState(true);

    useEffect(() => {

      if(!store.auth) {
        navigate("/")
      } else {
        actions.getAllFavorites().finally(() => setDeny(false));
      }

    }, [store.auth]);

    if (deny) {
      alert("Access denied. Cannot access without log in.")
    }

    return (
      <div className="d-flex justify-content-center">

        {store.favorites.length > 0 && store.auth ? 
					(<div>
            {store.favorites.map((item, index) => (
              <ul key={index}>
                <li>{item.info.name}</li>
                <li>{item.info.description}</li>
              </ul>
            ))}
          </div>
					) : (
					<div>
            <p>No hay favoritos todavía.</p>
					</div>
					)}

      </div>
    );
};