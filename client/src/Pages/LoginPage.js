import { React, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Login.css';
// backend href
const backHref = "https://makentu-backend.pcwu2022.repl.co/";
sessionStorage.setItem("backHref", backHref);

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
            "Access-Control-Allow-Origin": "*",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameState,
                password: passwordState
            })
        })
        .then((data) => {data.json()
            .then((data) => {
                jsonData = data;
                
                // data processing
                if (jsonData.success === false){
                    alert("Message:" + jsonData.message);
                } else {
                    
                }

                // add image path
                for (let element of jsonData.deviceData){
                    if (element.image.indexOf("/image/") !== -1 && element.image.indexOf("http" === -1)){
                        element.image = (backHref + element.image).replace("//image", "/image");
                    }
                }

                // go to main page
                if (jsonData.success === true){
                    sessionStorage.setItem("device", jsonData.deviceName);
                    sessionStorage.setItem("data", JSON.stringify(jsonData.deviceData))
                    sessionStorage.setItem("username", usernameState);
                    navigate("/MainPage", {
                        state: {
                            username: usernameState
                        }
                    });
                }
            })
        })
        .catch((err) => {
            alert(`Cannot connect to server at ${backHref}`);
            console.error(err);
        });
        
        
    }
    return(
        <div className="Login">
            <span className="Login_header">LOGIN</span>
    
            <form className="Login_form">
                <br></br>
                <label className="input_header" htmlFor="username">Username:</label>
                {/* <br></br> */}
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    onChange = {e => setUsernameState(e.target.value)}
                />
                <br></br>
                <label className="input_header" htmlFor="password">Password:</label>
                {/* <br></br> */}
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    onChange = {e => setPasswordState(e.target.value)}
                />
                <br></br>
                <button className="btn btn-outline-success" onClick = {handleLogin}> LOGIN </button>
                {/* <Link to ="/MainPage">LOGIN</Link> */}
            </form>
        </div>
    )
}
export default LoginPage;