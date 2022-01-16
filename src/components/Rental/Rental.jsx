import React, { useState, useEffect} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './Rental.css'

const Rental = ({match}) => {
    const carId = match.params.carid
    
    const [car, setCar] = useState();
    const [user, setUser] = useState("");
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [miles, setMiles] = useState();
    const [coupon, setCoupon] = useState();
    const [insurance, setInsurance] = useState();
    const [ageDiscount, setAgeDiscount] = useState();
    const [totalDays, setTotalDays] = useState("");

    useEffect(() => {
        getCar(carId);
    }, [])

    useEffect(() => {
        getUserId();
    }, [])

    useEffect(() => {
        if (from && to){
            getDifferenceInDays(from, to)  
            if(parseInt(user.age) >= 25){
                setAgeDiscount(true)
            }           
        }
    }, [to])

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
        else if(event.target.name === "miles"){         
            setMiles(event.target.value)
        }
        else if(event.target.name === "coupon"){         
            setCoupon(event.target.value)
        }
        else if(event.target.name === "insurance"){         
            setInsurance(event.target.value)
        }
    }

    function getDifferenceInDays(date1, date2) {
        date1 = new Date(date1)
        date2 = new Date(date2)
        let differenceInDays = Math.floor((date2 - date1) / (1000*60*60*24))
        return setTotalDays(differenceInDays);
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
                        <br></br>
                        <div className="rental-options">
                            <h4>Rental Options</h4>
                            <label>From:</label>
                            <input type="date" name="from" className="form-control" onChange={handleChange}/>
                            <label>To:</label>
                            <input type="date" name="to" className="form-control" onChange={handleChange}/>
                            <label>Miles:</label>
                            <input type="number" name="miles" className="form-control" placeholder="Enter if more than 15" onChange={handleChange}/>
                            <label>Coupon Code:</label>
                            <input type="text" name="coupon" className="form-control" placeholder="Enter if applicable" onChange={handleChange}/>
                            <input type="checkbox" name="insurance" className="form-check-input" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">Opt-in For Car Insurance</label>
                            <button type="submit" className="btn btn-dark">Confirm Rental</button>
                        </div>
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