import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
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

  const getAddress = async (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].address.includes(address)) {
        result.push(data[i]);
      }
    }
    setSearchedPlaces(result);
  }

  const getByGuestsNunber = async(data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (numberOfGuests <= data[i].maxGuests) {
        result.push(data[i]);
      }
    }
    setSearchedPlaces(result);
  }

  const getByTime = async(data) => {
    let result = [];
    getUnavailable();
    for (let i = 0; i < data.length; i++) {
      if (unavailableTime.indexOf(data[i]._id) != -1) {
        continue;
      }
      result.push(data[i]);
    }
    setSearchedPlaces(result);
  }

  const getByAddressAndGuests = async(data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].address.includes(address) && numberOfGuests <= data[i].maxGuests) {
        result.push(data[i]);
      }
    }
    setSearchedPlaces(result);
  }

  const getByAddressAndTime = async(data) => {
    let result = [];
    getUnavailable();
    for (let i = 0; i < data.length; i++) {
      if (unavailableTime.indexOf(data[i]._id) != -1) {
        continue;
      }
      if (data[i].address.includes(address)) {
        result.push(data[i]);
      }
    }
    setSearchedPlaces(result);
  }

  const getByAddressTimeAndGuests = async(data) => {
    let result = [];
    getUnavailable();
    for (let i = 0; i < data.length; i++) {
      if (unavailableTime.indexOf(data[i]._id) != -1) {
        continue;
      }
      if (data[i].address.includes(address) && numberOfGuests <= data[i].maxGuests) {
        result.push(data[i]);
      }
    }
    setSearchedPlaces(result);
  }

  const handleSearch = async () => {
    axios.get("places").then(({ data }) => {
      let result = [];
      if (address && !checkInInput && !checkOutInput && !numberOfGuests) {
        getAddress(data);
        return;
      } else if (
        !address &&
        !checkInInput &&
        !checkOutInput &&
        numberOfGuests
      ) {
        getByGuestsNunber(data);
        return;
      } else if (!address && checkInInput && checkOutInput && !numberOfGuests) {
        if (checkOutInput <= checkInInput) {
          alert("Please check your check in and check out time");
          return;
        }
        getByTime(data);
        return;
      } else if (
        !address &&
        !checkInInput &&
        !checkOutInput &&
        !numberOfGuests
      ) {
        setSearchedPlaces(data);
        return;
      } else if (address && !checkInInput && !checkOutInput && numberOfGuests) {
        getByAddressAndGuests(data);
        return;
      } else if (address && checkInInput && checkOutInput && !numberOfGuests) {
        getByAddressAndTime(data);
        return;
      } else if (address && checkInInput && checkOutInput && numberOfGuests) {
        getByAddressTimeAndGuests(data);
        return;
      }
    });
  };


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
