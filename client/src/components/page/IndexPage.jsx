import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from '../Image';
import { UserContext } from '../UserContext';


export default function IndexPage() {
  const {
    searchedPlaces,
    setSearchedPlaces,
  } = useContext(UserContext);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {searchedPlaces?.length > 0 && searchedPlaces.map(place => (
            <Link to={'/place/' + place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                        <Image 
                            className="rounded-2xl object-cover aspect-square"
                            src={place.photos?.[0]}
                            alt="" 
                        />
                    )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                </div>
            </Link>
        ))}
    </div>
  );
}
