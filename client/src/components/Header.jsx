import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {
    user,
    address,
    checkInInput,
    checkOutInput,
    numberOfGuests,
    setCheckInInput,
    setCheckOutInput,
    setNumberOfGuests,
    setAddress,
    handleSearch,
  } = useContext(UserContext);
  const [updateSearch, setUpdateSearch] = useState(false);

  function search() {
    setUpdateSearch(!updateSearch);
  }

  function reset() {
    setAddress('');
    setCheckInInput('');
    setCheckOutInput('');
    setNumberOfGuests('');
    handleSearch();
  }

  return (
    <div>
      <header className="flex justify-between">
        <Link to={"/"} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 -rotate-90 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl text-primary">Vacationbnb</span>
        </Link>
        <div className="relative cursor-pointer flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div onClick={search}>
            {address ? "Location: " + address : "Anywhere"}
          </div>
          <div className="border-l border-gray-300"></div>
          <div onClick={search}>
            {checkInInput && checkOutInput
              ? "from " + checkInInput + " to " + checkOutInput
              : "Any week"}
          </div>
          <div className="border-l border-gray-300"></div>
          <div onClick={search} className="cursor-pointer">
            {numberOfGuests ? "Guests: " + numberOfGuests : "Add guests"}
          </div>
          {updateSearch && (
            <div className="absolute -left-36 top-12 border rounded-2xl bg-white">
              <div className="flex">
                <div className="py-3 px-4 w-40">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                  />
                </div>
                <div className="py-3 px-4">
                  <label>Check in:</label>
                  <input
                    type="date"
                    value={checkInInput}
                    onChange={(ev) => setCheckInInput(ev.target.value)}
                  />
                </div>
                <div className="py-3 px-4 border-l">
                  <label>Check out:</label>
                  <input
                    type="date"
                    value={checkOutInput}
                    onChange={(ev) => setCheckOutInput(ev.target.value)}
                  />
                </div>
                <div className="p-2 w-40 border-l">
                  <label>Number of guests:</label>
                  <input
                    type="number"
                    value={numberOfGuests}
                    onChange={(ev) => setNumberOfGuests(ev.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleSearch}
            className="bg-primary text-white p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <button onClick={reset} className="bg-gray-500 text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-3 border border-gray-300 rounded-full py-2 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && <div>{user.name}</div>}
        </Link>
      </header>
    </div>
  );
}
