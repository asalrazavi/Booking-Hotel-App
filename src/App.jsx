import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
