import React, { Component, useState } from 'react';
import LocationPicker from 'react-location-picker';


interface ILocation{
    address:string
    position:{
        lat:number
        lng:number
    }
}

/* Default position */
const defaultPosition = {
    lat: 27.9878,
    lng: 86.9250
};


function MyLocationPicker() {
    const [address, setAddress] = useState<ILocation>({
        address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
        position: {
            lat: 0,
            lng: 0
        }
    })



function handleLocationChange({ position, address }:ILocation) {

    // Set new location
    setAddress({ position, address });
}

    return (
        <div>
            <h1>{address.address}</h1>
            <div>
                <LocationPicker
                    containerElement={<div style={{ height: '100%',width:'100%' }} />}
                    mapElement={<div style={{ height: '300px' }} />}
                    defaultPosition={defaultPosition}
                    onChange={handleLocationChange}
                />
            </div>
        </div>
    )
}

export default MyLocationPicker