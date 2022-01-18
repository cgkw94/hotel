import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
            
        <div className="container">
            {searchTitle}
            <div className="container2">
            {hotelDisplay}
        </div>
            </div>
        )

}

export default DisplayPage