const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            auth: false,
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
                        alert("User registered successfully.");
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

		}
	};
};

export default getState;