import { useEffect, useState } from "react";
import AccountNav from "../components/account-nav";
import Perks from "../components/perks";
import PhotosUploader from "../components/photos-uploader";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getItem } from "../helpers/persistance-storage";



export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`places/${id}`).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);


  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    const token = getItem('token')
    const authorization = token ? `Bearer ${token}` : ''
    if (id) {
      // update
      try {
        const response = await axios.put('/places/places', {
            id,
            ...placeData
        }, {
            headers: {
                'Authorization': authorization
            }
        });
        console.log('Place updated:', response.data);
    } catch (error) {
        console.error('Error updating place:', error);
    }
      setRedirect(true);
    } else {
      await axios.post('/places/add', placeData,{
        headers: {
            'Authorization': authorization
        }
    });
      setRedirect(true);
    }
  }
  
  if (redirect) {
    return <Navigate to={'/account/places'} />
  }
  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" placeholder="title, for example: My lovely apt" defaultValue={title} onChange={e=>setTitle(e.target.value)}/>
        {preInput('Address', 'Address to this place')}
        <input type="text" placeholder="address" defaultValue={address} onChange={e=>setAddress(e.target.value)}/>
        {preInput('Photos','more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','description of the place')}
        <textarea defaultValue={description} onChange={e=>setDescription(e.target.value)}  />
        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks}  onChange={setPerks}  />
        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea defaultValue={extraInfo} onChange={e=>setExtraInfo(e.target.value)} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
              defaultValue={checkIn}
              onChange={e=>setCheckIn(e.target.value)}
              placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
              defaultValue={checkOut}
              onChange={e=>setCheckOut(e.target.value)}
              placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" defaultValue={maxGuests} onChange={e=>setMaxGuests(e.target.value)} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" defaultValue={price} onChange={e=>setPrice(e.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}


function inputHeader(text) {
  return (
    <h2 className="text-2xl mt-4">{text}</h2>
  );
}
function inputDescription(text) {
  return (
    <p className="text-gray-500 text-sm">{text}</p>
  );
}

function preInput(header,description) {
  return (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );
}