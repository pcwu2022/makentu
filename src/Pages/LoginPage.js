import { React, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () =>{
    const handleLogin = () =>{//目前不會處理
        <Link to="/MainPage">
        </Link>
    }
    return(
        <div className="Login">
            <h1>Login</h1>
            {/* <UsernameInput />
            <PasswordInput />
            <SubmitLoginButton /> */}
            <form>
                <label for="username">Username:</label>
                <br></br>
                <input type="text" id="username" name="username" />
                <br></br>
                <label for="pwd">Password:</label>
                <br></br>
                <input type="password" id="pwd" name="pwd" />
                <br></br>
                {/* <button onClick={handleLogin()}> LOGIN </button> */}
                <Link to ="/MainPage">LOGIN</Link>
            </form>
        </div>
    )
}
export default LoginPage;