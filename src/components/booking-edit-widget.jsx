import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingEditWidget({place}) {
  const {user} = useContext(UserContext);
 

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // eslint-disable-next-line react/prop-types
  const [checkIn,setCheckIn] = useState(place.checkIn);
  const [checkOut,setCheckOut] = useState(place.checkOut);
  const [numberOfGuests,setNumberOfGuests] = useState(place.numberOfGuests);
  const [name,setName] = useState(place.name);
  const [phone,setPhone] = useState(place.phone);
  const [redirect,setRedirect] = useState('');

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))+1;
  }

  async function bookThisPlace() {
    await axios.put(`/bookings/${place._id}`, {
      checkIn,checkOut,numberOfGuests,name,phone,
      place:place.place._id,
      price:numberOfNights * place.place.price,
    });
    setRedirect(`/account/bookings/${place._id}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-2 flex-1">
            <label>Check in:</label>
            <input type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)} 
              className="w-[80%]"/>
          </div>
          <div className="py-3 px-2 border-l flex-1">
            <label>Check out:</label>
            <input type="date" value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)} 
              className="w-[80%]"/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.place.price}</span>
        )}
      </button>
    </div>
  );
}