import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () =>{
    // set state username, password
    const [usernameState, setUsernameState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    const handleLogin = (e) =>{//目前不會處理
        // <Link to="/MainPage">
        // </Link>
        e.preventDefault();
        console.log(usernameState, passwordState);
    }
    return(
        <div className="Login">
            <h1>Login</h1>
            {/* <UsernameInput />
            <PasswordInput />
            <SubmitLoginButton /> */}
            <form >
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