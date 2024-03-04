import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from 'date-fns'
import PlaceGallery from "../components/place-gallery";
import AddressLink from "../components/address-link";
import BookingWidget from "../components/booking-widget";
import BookingEditWidget from "../components/booking-edit-widget";


export default function PlaceEditPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);


  if (!booking) {
    return '';
  }



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {booking.place.description}
          </div>
          Max number of guests: {booking.place.maxGuests}
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Your Info</h2>
          </div>
          
          Check-in: {format(new Date(booking.checkIn), 'MMM dd, yyyy')}<br />
          Check-out: {format(new Date(booking.checkOut), 'MMM dd, yyyy')}<br />
          Number of guests: {booking.numberOfGuests}
        </div>
        <div>
          <BookingEditWidget place={booking} />
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}