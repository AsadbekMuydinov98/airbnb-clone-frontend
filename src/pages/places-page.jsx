import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../components/account-nav";
import PlaceImg from "../components/place-img";
import { getItem } from "../helpers/persistance-storage";
export default function PlacesPage() {

  function deletePlace(id){
    axios.delete(`/places/${id}`)
  }
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    const token = getItem('token')
    const authorization = token ? `Bearer ${token}` : ''
    axios.get('/places/user-places', {
      headers: {
          'Authorization': authorization
      }
  })
  .then(({ data }) => {
      setPlaces(data);
  })
  .catch(error => {
      console.error('Error fetching user places:', error);
  });
  }, [places]);
  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 && places.map(place => (
            // eslint-disable-next-line react/jsx-key
            <div key={place._id} className="relative">
              <Link to={'/account/places/'+place._id} className="flex my-3 cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink w-full">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
              <button className=" z-10 flex items-center justify-center absolute w-10 h-10 right-0 top-0 rounded-xl bg-red-400 text-white" onClick={()=>deletePlace(place._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            </div>
          ))}
        </div>
    </div>
  );
}