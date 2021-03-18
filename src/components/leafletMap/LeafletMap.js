import React, { useEffect } from "react";
import { connect } from 'react-redux'

import { useState } from 'react';
import '../../css/leaflet.css'
import '../../css/geosearch.css'
import L from "leaflet";
import { MapContainer , TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


// import marker icons
delete L.Icon.Default.prototype._getIconUrl;
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
});

const provider = new OpenStreetMapProvider();


function DisplayPosition({onChangeMapPosition}) {
    const map = useMap()
    
    const onMove = () => {
        const pos = map.getCenter()
        onChangeMapPosition({
            name:searchControl.searchElement.input.value,
            lat:pos.lat,
            lng:pos.lng
        })
    }
  
    useEffect(() => {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }, [map, onMove])

    return null
  }
  

function findStartPosition(data, map){
    // provider.search({ query: "99 Southwark St, London SE1 0JF, UK" })
    // .then(value => {})
    var lat = data.lat;
    var lng = data.lng;
    var label = data.name;
    var marker = L.marker([lat, lng]).addTo(map)
    marker.bindPopup(label).openPopup();
    map.setView([lat, lng], 13)

}

function selectPosition() {
    // onSelectPosition()
}

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Вы здесь</Popup>
        <button onClick={selectPosition}>выбрать позицию</button>
      </Marker>
    )
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

function MapComp ({address, onChangeMapPosition}) {
    console.log(address)
    
    function initMap(map){
        map.addControl(searchControl);
    }

    const center = Object.keys(address).length !== 0 ? [address.lat, address.lng] : [0, 0];
    return (
        <MapContainer 
            style={{ height: "30vh" }}
            center={center}
            zoom="10"
            whenCreated={map=>{
                initMap(map)
                if (Object.keys(address).length !== 0) findStartPosition(address, map)
            }}
        >
            <TileLayer
            attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            <LocationMarker></LocationMarker>
            <DisplayPosition onChangeMapPosition={onChangeMapPosition}></DisplayPosition>
        </MapContainer >
    
    );
  
}


const mapStateToProps = (state, ownProps) =>{
    return {
        address:ownProps.address
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLeafletMapInit: (m) => {
            dispatch({type : 'INIT_LEAFLET_MAP', payload:m})
        },
        onChangeMapPosition: (position) => {
            dispatch({type : 'CHANGE_LEAFLET_MAP_POSITION', payload:position})
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComp);

