import React, { useEffect, useState } from'react'
import GoogleMapReact from 'google-map-react';
import { GuaderDriver } from './guaderDriver';

interface ICoords{
    lat: number;
    lng: number;
}
const defaultCoords = {lat: 37.51320598135089,lng: 127.101950169125}    

export const DashBoard = () => {
    const [guaderCoords, setGuaderCoords] = useState<ICoords>(defaultCoords);
    const [customerCoords, setCustomerCoords] = useState<ICoords>(defaultCoords);
    const [map, setMap] = useState<google.maps.Map>();
    const [maps, setMaps] = useState<any>();
    const Success = ({coords: {latitude, longitude}}: GeolocationPosition) => {
        setGuaderCoords({lat:latitude, lng: longitude})
        console.log(guaderCoords)
    }
    const Error = (error: GeolocationPositionError) => {
        console.log(error)
    }
    useEffect(() =>{
        navigator.geolocation.watchPosition(Success, Error,{
            enableHighAccuracy: true
        })
    },[])
    useEffect(() => {
        if(map && maps) {
            map.panTo(new google.maps.LatLng(guaderCoords.lat, guaderCoords.lng))
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
                {location: new google.maps.LatLng(guaderCoords.lat, guaderCoords.lng)},
                (result, status) => {
                    console.log(result, status)
                }
            )
        }
    }, [guaderCoords.lat, guaderCoords.lng]);
    const ApiLoaded = ({map, maps}: {map: any, maps: any}) => {
        map.panTo(new google.maps.LatLng(guaderCoords.lat, guaderCoords.lng))
        setMap(map);
        setMaps(maps);
    }

    const onGetRouteClick = () => {
        if(map){
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsService.route({
                origin:{
                    location: new google.maps.LatLng(guaderCoords.lat, guaderCoords.lng)
                },
                destination:{
                    location: new google.maps.LatLng(customerCoords.lat, customerCoords.lng)
                },
                travelMode: google.maps.TravelMode.TRANSIT //????????? ????????? ?????? ?????? ????????? ?????? ????????? ?????????
            },
            (result) => {
                directionsRenderer.setDirections(result)
            }
          )
        }
    }   

    return(
        <>
            <div
            className='rounded-lg overflow-hidden'
            style={{height: "58vh", width: "100%"}}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBbRtmQhCFlTdRBjJduovbO0qgdXAfbCNg"}}
                defaultCenter={defaultCoords}
                defaultZoom={18}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={ApiLoaded}
                >
                    <GuaderDriver
                    lat={guaderCoords.lat}
                    lng={guaderCoords.lng}
                    />
                </GoogleMapReact>
            </div>
                
        </>
    )
}