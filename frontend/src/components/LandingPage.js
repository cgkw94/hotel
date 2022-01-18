import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LandingPage = (props) => {

    const [locationInput, setLocationInput] = useState('')
    const [inDateInput, setInDateInput] = useState('2022-01-20')
    const [outDateInput, setOutDateInput] = useState('2022-01-20')
    const [roomTypeInput, setRoomTypeInput] = useState('')
    
    const handleOnClick = (event) => {
        event.preventDefault();

        console.log(locationInput)
        props.setLocation(locationInput)
        props.setInDate(inDateInput)
        props.setOutDate(outDateInput)
        props.setRoomType(roomTypeInput)

        console.log("clicked")
        //props.setFetching(true)
    }

    const handleLocationChange = (event) => {
        setLocationInput(event.target.value)
    }

    const handleInDateChange = (event) => {
        console.log(event.target.value)
        setInDateInput(event.target.value)
    }

    const handleOutDateChange = (event) => {
        setOutDateInput(event.target.value)
    }

    const handleRoomTypeChange = (event) => {
        setRoomTypeInput(event.target.value)
    }

    return (
            <div className='header'>
                <h1 className="header-title">Welcome!</h1>
                <h2 className="header-title2">Have a warm and welcoming stay with us.</h2>

                <form>
                <select className="userInput" name="location" onChange={handleLocationChange}>
                    <option value="Orchard" selected>--Please choose a location--</option>
                    <option value="Orchard">Orchard</option>
                    <option value="Marina Bay">Marina Bay</option>
                    <option value="Jurong East">Jurong East</option>
                </select> 
                <input type="date" name="inDate" className='userInput'
                value={inDateInput} min="2022-01-20" max="2023-12-31" onChange={handleInDateChange}>
                </input>
                <input type="date" name="outDate" className='userInput'
                value={outDateInput} min="2022-01-20" max="2023-12-31" onChange={handleOutDateChange}>
                </input>
                <select className="userInput" name="roomType" onChange={handleRoomTypeChange}>
                    <option value="Deluxe" selected>--Please choose a room type--</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Grand Deluxe">Grand Deluxe</option>
                    <option value="Suite">Suite</option>
                </select>
                <Link to={{
                    pathname: `/${props.location}`,
                }}> 
                <input type="submit" id='searchButton' onClick={handleOnClick}></input>
                </Link>
                </form>
            </div>
    )
}

export default LandingPage;
