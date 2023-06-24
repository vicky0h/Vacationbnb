import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import IndexPage from "./components/page/IndexPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/page/RegisterPage";
import LoginPage from "./components/page/LoginPage";
import { UserContextProvider } from "./components/UserContext";
import ProfilePage from "./components/page/ProfilePage";
import PlacesPage from "./components/page/PlacesPage";
import PlacesFormPage from "./components/page/PlacesFormPage";
import PlacePage from "./components/page/PlacePage";
import BookingsPage from "./components/page/BookingsPage";
import BookingPage from "./components/page/BookingPage";

// baseURL: http://localhost:4000
// baseURL: https://vacationbnb.onrender.com
axios.defaults.baseURL = "https://vacationbnb.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
