import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

// function getFlagEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  console.log(lat, lng);

  useEffect(() => {
    // if (!lat || !lng) return;

    async function fetchLocation() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        console.log("Geocoding Data:", data);
        if (!data.countryCode)
          throw new Error(
            "this location is not a city! please click somewhere else."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        // setCountryCode(getFlagEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
        console.log(error);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocation();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
          {/* {<span className="flag">{countryCode}</span>} */}
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}
