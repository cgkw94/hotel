import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const DisplayPage = (props) => {

    let searchTitle=''
    let hotelDisplay = (<div></div>)

    //const [loading, setLoading] = useState(false);
    const [hotelData, setHotelData] = useState([])

    const fetchHotels = async (url) => {
    
        //setLoading(true)
    
        try {
          const res = await fetch(url);
          if (res.status !== 200) {
            throw new Error('something went wrong');
          }
    
          const hotelResults = await res.json();

          console.log(hotelResults)
          setHotelData(hotelResults)
    
         // setLoading(false);
    
        } catch (err) {
            console.log(err);
        }
    
      }


      useEffect(() => {
        const url = `http://127.0.0.1:5005/hotel?location=${props.location}&inDate=${props.inDate}&outDate=${props.outDate}&roomType=${props.roomType}`
        
        if (props.fetchedResults) {
          fetchHotels(url);
        }
    
      }, [props.fetchedResults])


      if (props.fetchedResults) {

        searchTitle = <h4 id="search-title">Search Results</h4>
        
        console.log(hotelData)
        hotelDisplay = hotelData?.map((hotel, index) => {
            return (
                <div className="card">
                    <Link className="link" to={{
                        pathname: `/${hotel.hotelId}`,
                        }}>
                        <div key={index} id={hotel.hotelId}>{hotel.hotelName}</div>
                    <img src={`${hotel.hotelImg}`} alt=''></img>
                    <div>{hotel.address}</div>
                    <div>{hotel.hotelRating}</div>
                    </Link>
                </div>
            )
        })

    }

    return (
        <>
        <div className="header">
        <h1 className="header-title">Welcome!</h1>
        <h2 className="header-title2">Have a warm and welcoming stay with us.</h2>
  
        <form>
          <select
            className="userInput"
            name="location"
            // onChange={handleLocationChange} 
            value={props.location}> 

            <option value="Orchard">Orchard</option>
            <option value="Marina Bay">Marina Bay</option>
            <option value="Jurong East">Jurong East</option>
          </select>
          <input
            type="date"
            name="inDate"
            className="userInput"
            value={props.inDate}
            min="2022-01-20"
            max="2023-12-31"
            // onChange={handleInDateChange}
          ></input>
          <input
            type="date"
            name="outDate"
            className="userInput"
            value={props.outDate}
            min="2022-01-20"
            max="2023-12-31"
            // onChange={handleOutDateChange}
          ></input>
          <select
            className="userInput"
            name="roomType"
            value={props.roomType}
            // onChange={handleRoomTypeChange}
            >
            <option value="Deluxe">Deluxe</option>
            <option value="Grand Deluxe">Grand Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
            <Button >Submit</Button>
        </form>
        </div>
        <div className="container">
            {searchTitle}
            <div className="container2">
            {hotelDisplay}
        </div>
        </div>
        </>
    )
}

export default DisplayPage