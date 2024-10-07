import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelProvider";
import { useEffect } from "react";

export default function SingleHotel() {
  const { id } = useParams();
  //   const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_Location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}
