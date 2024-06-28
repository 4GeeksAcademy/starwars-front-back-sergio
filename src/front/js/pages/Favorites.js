import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store.auth) {
      alert("Access denied. Cannot access without log in.");
      navigate("/");
    } else {
      actions.getAllFavorites()
        .finally(() => setLoading(false));
    }
  }, [store.auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      {store.favorites.length > 0 && store.auth ? (
        <div>
          {store.favorites.map((item, index) => (
            <ul key={index}>
              <li>{item.info.name}</li>
              <li>{item.info.description}</li>
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <p>No favorites yet.</p>
        </div>
      )}
    </div>
  );
};