
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            auth: false,
            favorites: [],
		},
		actions: {
            signUp: async ( name, email, password ) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password
                        })
                    });
            
                    let data = await response.json();
            
                    if (response.status >= 200 && response.status < 300) {
                        await alert("User registered successfully.");
                        getActions().logIn();
                    } else {
                        alert("User already registered.");
                        console.log(data.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            logIn: async ( email, password ) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });

                    let data = await response.json();

                    if (response.status === 200) {
                        localStorage.setItem("token", data.access_token);
                        setStore({ auth: true })
                    }
                    else {
                        console.log(data.msg)
                    }

                } catch (error) {
                    console.log(error);
                }
            },

            getAllFavorites: async () => {
                let token = localStorage.getItem("token");
                console.log(token);
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/user/favorites', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    console.log(response);
                    let data = await response.json();
                    console.log(data);
        
                    if (response.status === 200) {
                        setStore({ favorites: data.favorite })
                    } else {
                        console.error(data.msg);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
		}
	};
};

export default getState;