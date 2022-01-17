import React, { useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './Profile.css'

const Profile = () => {
    const [user, setUser] = useState();
    const [rentals, setRentals] = useState();

    useEffect(() => {
        getUserId();
    }, [])

    useEffect(() => {
        getRentals();
    }, [user])

    const getUserId = () => {
        const jwt = localStorage.getItem('token');
        try{
            let currentUser = jwtDecode(jwt);
            setUser(currentUser._id);
        }catch(error){
            console.log(error)
        }
    }

    const getRentals = async () => {
        const id = user
        try {
            let response = await axios.get(`http://localhost:5000/api/getrentals/${id}`)
            console.log(response.data)
            setRentals([response.data])
        } catch (error) {
            console.log(error);
        }
    }

    if(rentals){
        return (
            <div>
                {rentals[0].map(rental =>{
                    return (
                        <div className="rental-card">
                            <img src={`http://localhost:5000/${rental.car.carImage}`} id="rentalImg"/>
                            <div key={rental._id}>
                            <p>{rental.car.model} ({rental.car.year})</p>
                            <p>Transaction Id : {rental.transactionId}</p>
                            <p>From: {rental.rentalDates.from}</p>
                            <p>To: {rental.rentalDates.to}</p>
                            <p>Total days : {rental.totalDays}</p>
                            <p>Miles traveled : {rental.milesTraveled}</p>
                            <p>Total amount : ${rental.rentalFee}</p>
                            <p>{Date(rental.createdAt)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }else{
        return (
            <h1>No Rentals To Show</h1>
        )
    }
}

export default Profile