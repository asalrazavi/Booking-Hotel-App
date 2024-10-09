import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

export default function Bookmark() {
  const { bookmarks, currentBookmark } = useBookmark();
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div
                key={item.id}
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
