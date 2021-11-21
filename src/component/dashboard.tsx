import React from'react'
import GoogleMapReact from 'google-map-react';

export const DashBoard = () => {
    return(
        <div
        className='overflow-hidden rounded-lg mb-10 lg:-mb-10'
        style={{ height: '52vh', width:"100%"}}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key:"AIzaSyBbRtmQhCFlTdRBjJduovbO0qgdXAfbCNg"}}
          defaultZoom={16}
          defaultCenter={{lat: 37.20032462807351, lng: 127.20767714423788}}
        >
        </GoogleMapReact>
      </div>
    )
}