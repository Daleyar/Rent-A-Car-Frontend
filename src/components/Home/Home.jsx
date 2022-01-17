import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"

const Home = (props) => {
    const [cars, setCars] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    useEffect(() => {
        getCars();
    }, [])

    const getCars = async () => {
        try{
            let response = await axios.get('http://localhost:5000/api/cars');
            setCars([response.data]);
            console.log(response.data)
        }catch (error){
            console.log("Couldnt get cars..")
        }
    }

    const handleChange = (event) => {
        if(event.target.name === "from"){
            setFrom(event.target.value)
        }
        else if(event.target.name === "to"){         
            setTo(event.target.value)
        }
        else if(event.target.name === "zipcode"){         
            setTo(event.target.value)
        }
    }

    if(cars){
        return (
            <div>
                <div className="dateWrap">
                    <h3>Search by ZipCode or Available Dates</h3>
                    <input type="text" name="zipcode" className="form-control" id="zipcode" placeholder="Enter Zip Code" onChange={handleChange}/>
                    <input type="date" name="from" className="form-control" id="from" onChange={handleChange}/>
                    <input type="date" name="to" className="form-control" id="to" onChange={handleChange}/>
                </div>
                <div className="carType">
                    <h5>Filter by Type</h5>
                    <select className="form-select" id="select1">
                        <option>All</option>
                        <option>Economy</option>
                        <option>Luxury</option>
                        <option>Standard</option>
                        <option>SUV</option>
                    </select>
                </div>
                
                {cars[0].map(car => {
                    return (
                        <div className="card-car">
                            <div key={car._id}>
                                <img src={`http://localhost:5000/${car.carImage}`} alt="carImg"/>
                                <div className="card-car-body">
                                    <h3>{car.model}({car.year})</h3>
                                    <p> Daily Rental Rate: ${car.dailyRentalRate}</p>
                                    <Link to={`/rental/${car._id}`}><button className="btn btn-dark">Rent</button></Link>
                                </div>
                            </div>
                        </div>
                    ); 
                })}
            </div>
        )
    }else{
        return(
            <h1>Loading..</h1>
        )
    }


}

export default Home