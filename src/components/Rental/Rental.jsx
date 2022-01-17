import React, { useState, useEffect} from "react";
import StripeCheckout from "react-stripe-checkout";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './Rental.css'

const Rental = ({match}) => {
    const carId = match.params.carid
    const [car, setCar] = useState();
    const [user, setUser] = useState("");
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [miles, setMiles] = useState(15);
    const [coupon, setCoupon] = useState();
    const [insurance, setInsurance] = useState(false);
    const [ageDiscount, setAgeDiscount] = useState();
    const [totalDays, setTotalDays] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

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

    useEffect(() =>{
        let defaultMiles = 15;
        if (car) {
            setTotalAmount(totalDays * car.dailyRentalRate);
            if (!ageDiscount){
                setTotalAmount(totalAmount + 50 * totalDays)
            }
            if (miles > defaultMiles) {
                let milesDiff = miles - defaultMiles
                console.log(milesDiff)
                setTotalAmount(totalAmount + .25 * milesDiff)
            }
            if (coupon === "firstCar10" )
                setTotalAmount(totalAmount - Math.round(totalAmount * .10))
        }
    }, [totalDays, miles, insurance, coupon, ageDiscount])

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
            setMiles(parseFloat(event.target.value))
        }
        else if(event.target.name === "coupon"){         
            setCoupon(event.target.value)
        }
    }

    function getDifferenceInDays(date1, date2) {
        date1 = new Date(date1)
        date2 = new Date(date2)
        let differenceInDays = Math.floor((date2 - date1) / (1000*60*60*24))
        return setTotalDays(differenceInDays);
    }

    function insuranceCheck() {
        let checkBox = document.getElementById("insurance")
        console.log(checkBox)
        if (checkBox.checked === true){
            setTotalAmount(totalAmount + 50)
        }else{
            setTotalAmount(totalAmount - 50)
        }
    }

    const rentCar = async (rentalReq) => {
        console.log(rentalReq)
        try {
            let response = await axios.post('http://localhost:5000/api/rentcar/', rentalReq);
            console.log(response.data)
            console.log("Car rental was successful")
        } catch (error) {
            console.log(error);
        }
    }

    function onToken(token){
        const rentalReq = {
            token,
            user: user._id,
            car: carId,
            rentalDates: {
                from,
                to,
            },
            milesTraveled: miles,
            totalDays: totalDays,
            rentalFee: totalAmount,
            renterAgeDiscount: ageDiscount,
            insurance: insurance,
        }
        rentCar(rentalReq);
    }

    if(car){
        return (
            <div>
                <div className="card-rental">
                <img src={`http://localhost:5000/${car.carImage}`} alt="rentalImg"/>
                    <div className="card-rental-body">
                        <h3>Car Info</h3>
                        <p>{car.model}({car.year})</p>
                        <p>Type: {car.carType}</p>
                        <p>Seating: {car.numberOfSeats}</p>
                        <p>Transmission: {car.transmission}</p>
                        <p>Daily Rental Rate: ${car.dailyRentalRate}</p>
                        <br></br>
                        <div className="rental-options">
                            <h3>Rental Options</h3>
                            <label>From:</label>
                            <input type="date" name="from" className="form-control" onChange={handleChange}/>
                            <label>To:</label>
                            <input type="date" name="to" className="form-control" onChange={handleChange}/>
                            <label>Miles:</label>
                            <input type="text" name="miles" className="form-control" placeholder="Enter if more than 15" onChange={handleChange}/>
                            <label>Coupon Code:</label>
                            <input type="text" name="coupon" className="form-control" placeholder="Enter if applicable" onChange={handleChange}/>
                            <label>Full Coverage Insurance ($50)</label>
                            <input type="checkbox" name="insurance" id="insurance" className="form-check-input" onChange={insuranceCheck}/>
                            {from && to &&(
                                <div className="rental-summary">
                                <h5>
                                    Total Days: {totalDays} <br/>
                                    Total Miles: {miles} <br/>
                                    Rent Per Day : ${car.dailyRentalRate} <br/>
                                </h5>
                                <h3>
                                    Total Amount: ${totalAmount} <br/>
                                </h3>
                                <StripeCheckout
                                    shippingAddress
                                    token = {onToken}
                                    currency = "USD"
                                    amount = {totalAmount * 100}
                                    stripeKey ="pk_test_51KIMk3ITDzjTFxsQYtTxlaJx6ZZ9AFiHF9HRBk6u5KGSPdjLNjITHBfPlH6DN0160MS1MKtUvUkua7N9VMxCJG7C00V0gJkeOL"
                                >
                                <button type="submit" className="btn btn-dark">Confirm Rental</button>
                                </StripeCheckout>
                                </div>
                            )}
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