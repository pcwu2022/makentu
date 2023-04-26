import { React, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// backend href
const backHref = "http://localhost:3001/";

const LoginPage = () =>{
    // set state username, password
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // check if user is logged in
    useEffect(() => {
        if (location.state !== null){   
            if (location.state.username !== null){
                navigate("/MainPage", {state: location.state});
            }
        }
    });

    const handleLogin = (e) =>{
        e.preventDefault();
        // check if password exists
        let jsonData = {};
        fetch(backHref + "postdata/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameState,
                password: passwordState
            })
        })
        .then(data => data.json())
        .then((data) => {
            jsonData = data;
            
            // data processing
            if (jsonData.success === false){
                alert("Message:" + jsonData.message);
            } else {

            }
            // go to main page
            if (jsonData.success === true){
                navigate("/MainPage", {
                    state: {
                        username: usernameState, 
                        device: jsonData.deviceName, 
                        data: jsonData.deviceData
                    }
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
        
        
    }
    return(
        <div className="Login">
            <h1>Login</h1>
            {/* <UsernameInput />
            <PasswordInput />
            <SubmitLoginButton /> */}
            <form>
                <label htmlFor="username">Username:</label>
                <br></br>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    onChange = {e => setUsernameState(e.target.value)}
                />
                <br></br>
                <label htmlFor="password">Password:</label>
                <br></br>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    onChange = {e => setPasswordState(e.target.value)}
                />
                <br></br>
                <button onClick = {handleLogin}> LOGIN </button>
                {/* <Link to ="/MainPage">LOGIN</Link> */}
            </form>
        </div>
    )
}
export default LoginPage;