import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"

const Home = (props) => {
    const [cars, setCars] = useState();

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

    if(cars){
        return (
            <div>
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