import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || !currentBookmark) {
    return <Loader />;
  }
  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        {" "}
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div key={currentBookmark.id} className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
      </div>
    </div>
  );
}
