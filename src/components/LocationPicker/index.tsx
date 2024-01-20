import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { Component, useState } from 'react';
import LocationPicker from 'react-location-picker';


interface ILocation {
    coordinates: {
        lat: number
        lng: number
    }
    isLoaded: any
}

const containerStyle = {
    width: '100%',
    height: '300px'
};


function MyLocationPicker(props: ILocation) {
    const { isLoaded } = props

    return isLoaded && (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.coordinates}
                zoom={10}
            >
                <Marker position={props.coordinates} />

            </GoogleMap>
        </>
    )
}

export default React.memo(MyLocationPicker)