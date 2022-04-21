import React, { useState } from "react";
import axios from "axios";
import './Login.css'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        if(event.target.name === "email"){
            setEmail(event.target.value)
        }
        else if(event.target.name === "password"){         
            setPassword(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            'email': email,
            'password': password
        }
        loginUser(user);
    } 

    const loginUser = async (user) => {
        try {
            let response = await axios.post("http://localhost:5000/api/user/login", user);
            localStorage.setItem('token', response.data);
            window.location = '/home';
        } catch (error) {
            console.log(`Couldn't Retrieve Token! ${error}`);
        }
    }

    return(
        <div className="login">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Enter email" className="form-control" autoComplete="off" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password </label>
                            <input type="password" name="password" placeholder="Enter password" className="form-control" onChange={handleChange}/>
                        </div>
                        <center>
                        <p className="forgot-password text-right">
                        New Customer? <a href="/Register">Register</a>
                        </p>
                        <button type="submit" className="btn btn-dark">Sign in</button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;