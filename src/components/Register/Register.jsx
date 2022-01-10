import axios from "axios";
import React, { useState } from "react";
import "./Register.css"

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        if(event.target.name === "email"){
            setEmail(event.target.value);
        }else if(event.target.name === "firstName"){
            setFirstName(event.target.value);
        }else if(event.target.name === "lastName"){
            setLastName(event.target.value);
        }else if(event.target.name === "age"){
            setAge(event.target.value);
        }else if(event.target.name === "password"){
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: email,
            name: firstName + " " + lastName,
            age: age,
            password: password,
        }
        console.log(user);
        registerUser(user);
    }

    const registerUser = async (user) => {
        try {
            let response = await axios.post("http://localhost:5000/api/user/register", user);
            console.log(response);
            window.location = '/Login';
        } catch (error) {
            console.log("Couldn't Register User");
        }
    }

    return(
        <div className="register">
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" className="form-control" placeholder="Enter first name" onChange={handleChange}/>
                        <label>Last Name</label>
                        <input type="text" name="lastName" className="form-control" placeholder="Enter last name" onChange={handleChange}/>
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange}/>
                        <label>Age</label>
                        <input type="text" name="age" className="form-control" placeholder="Enter age" onChange={handleChange}/>
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                    </div>
                    <center>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/Login">Log in</a>
                    </p>
                    <button type="submit" className="btn btn-dark">Sign Up</button>
                    </center>
                </form>
            </div>
        </div>
  </div>

    );
}

export default Register;