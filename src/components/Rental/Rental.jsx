import React, { useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './Rental.css'

const Rental = ({match}) => {
    const carId = match.params.carid
    
    const [car, setCar] = useState();
    const [user, setUser] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        getCar(carId);
    }, [])

    useEffect(() => {
        getUserId();
    }, [])

    const getUserId = () => {
        const jwt = localStorage.getItem('token');
          try{
              let currentUser = jwtDecode(jwt);
              console.log(currentUser)
              getUserById(currentUser._id);
          }catch(error){
              console.log(error)
            }
    }

    const getUserById = async (id) => {
        try {
            let response = await axios.get(`http://localhost:5000/api/user/${id}`);
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCar = async (carId) => {
        try{
            let response = await axios.get(`http://localhost:5000/api/cars/${carId}`);
            setCar(response.data);
            console.log(response.data)
        }catch (error){
            console.log("Couldnt get car..")
        }
    }

    const handleChange = (event) => {
        if(event.target.name === "from"){
            setFrom(event.target.value)
        }
        else if(event.target.name === "to"){         
            setTo(event.target.value)
        }
    }

    if(car){
        return (
            <div>
                <div className="card-rental">
                <img src={`http://localhost:5000/${car.carImage}`} alt="rentalImg"/>
                <div className="card-rental-body">
                    <h4>Car Info</h4>
                    <p>{car.model}({car.year})</p>
                    <p>Type: {car.carType}</p>
                    <p>Seating: {car.numberOfSeats}</p>
                    <p>Transmission: {car.transmission}</p>
                    <p>Daily Rental Rate: ${car.dailyRentalRate}</p>
                    <h4>Rental Options</h4>
                    <label>From:</label>
                    <input type="date" name="from" className="form-control" onChange={handleChange}/>
                    <label>To:</label>
                    <input type="date" name="to" className="form-control" onChange={handleChange}/>

                </div>
                </div>
            </div>
        )
    }else{
        return (
            <h1>loading</h1>
        )
    }
}

export default Rental