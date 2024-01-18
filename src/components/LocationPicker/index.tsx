import { GoogleMap } from '@react-google-maps/api';
import React, { Component, useState } from 'react';
import LocationPicker from 'react-location-picker';


interface ILocation {
    address: string
    position: {
        lat: number
        lng: number
    }
}

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 40.4093,
    lng: 49.8671
};

function MyLocationPicker(props: { isLoaded: any }) {
    const { isLoaded } = props

    return isLoaded && (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
            </GoogleMap>
        </>
    )
}

export default React.memo(MyLocationPicker)