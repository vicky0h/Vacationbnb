import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [checkInInput, setCheckInInput] = useState("");
  const [checkOutInput, setCheckOutInput] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [address, setAddress] = useState("");
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [unavailableTime, setUnavailableTime] = useState([]);
  useEffect(() => {
    axios.get(`/places`).then(({ data }) => {
      setSearchedPlaces(data);
    });
  }, []);

  const getUnavailable = async () => {
    axios.get("all-bookings").then(({ data }) => {
      let tmp = [];
      for (let i = 0; i < data.length; i++) {
        if (
          (data[i].checkOut >= checkOutInput &&
            data[i].checkIn <= checkOutInput) ||
          (data[i].checkIn <= checkOutInput &&
            data[i].checkOut <= checkOutInput)
        ) {
          tmp.push(data[i].place);
        }
      }
      setUnavailableTime(tmp);
      return;
    });
  };


  const handleSearch = async () => {
    axios.get("places").then(({ data }) => {
      let result = [];
      if (address && !checkIn && !checkOut && !numberOfGuests) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].address.includes(address)) {
            result.push(data[i]);
          }
        }
        setSearchedPlaces(result);
        return;
      } else if (
        !address &&
        !checkInInput &&
        !checkOutInput &&
        numberOfGuests
      ) {
        result = [];
        for (let i = 0; i < data.length; i++) {
          if (numberOfGuests <= data[i].maxGuests) {
            result.push(data[i]);
          }
        }
        setSearchedPlaces(result);
        return;
      } else if (
        !address &&
        !checkInInput &&
        !checkOutInput &&
        !numberOfGuests
      ) {
        result = [];
        for (let i = 0; i < data.length; i++) {
          if (numberOfGuests <= data[i].maxGuests) {
            result.push(data[i]);
          }
        }
        setSearchedPlaces(result);
        return;
      } else if (!address && checkInInput && checkOutInput && !numberOfGuests) {
        result = [];
        getUnavailable();
        console.log(unavailableTime);
        for (let i = 0; i < data.length; i++) {
          if (unavailableTime.indexOf(data[i]._id) != -1) {
            continue;
          }
          result.push(data[i]);
        }
        setSearchedPlaces(result);
        return;
      } else if (
        !address &&
        !checkInInput &&
        !checkOutInput &&
        !numberOfGuests
      ) {
        setSearchedPlaces(data);
        return;
      }
    });
  };

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        ready,
        checkInInput,
        setCheckInInput,
        checkOutInput,
        setCheckOutInput,
        numberOfGuests,
        setNumberOfGuests,
        address,
        setAddress,
        searchedPlaces,
        setSearchedPlaces,
        handleSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
