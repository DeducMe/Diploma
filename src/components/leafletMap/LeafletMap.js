import React, { Component, useCallback, useEffect } from "react";
import { connect } from 'react-redux'

import { useState } from 'react';
import '../../css/leaflet.css'
import '../../css/geosearch.css'
import '../../scripts/geosearch.umd'

import L from "leaflet";
import '../../scripts/leaflet-src'
import '../../scripts/leaflet'
import { MapContainer , TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { find } from "esri-leaflet";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
});

const provider = new OpenStreetMapProvider();


// function DisplayPosition ({map, position, oldPosition, onChangeMapPosition}) {   //перписать под класс коллбэк в константу, эффект в didupdate?
//     map.setView(position, 13)
//     position = map.getCenter()


//     const onClick = useCallback(() => {
//         map.setView(oldPosition, 13)
//     }, [map])

 
// }

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
      </Marker>
    )
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

class MapComp extends Component {
    componentDidUpdate() {
        this.props.map.addControl(searchControl);
        this.props.map.on('move', this.onMove)

        console.log(searchControl);   
    }

    onMove = () => {
        const pos = this.props.map.getCenter()

        this.props.onChangeMapPosition({
          name:searchControl.searchElement.input.value,
          lat:pos.lat,
          lng:pos.lng
        })
    }


    componentWillUnmount(){
        this.props.map.off('move', this.onMove)
    }

    render() {
        const center = this.props.leafletMap.data ? [this.props.leafletMap.lat, this.props.leafletMap.lng] : [0,0];
        return (
            
            <MapContainer 
                style={{ height: "30vh" }}
                center={center}
                zoom="10"
                whenCreated={ m => {
                    this.props.onLeafletMapInit(m);
                    findStartPosition(this.props.leafletMap.data, m)
                } }
                >
                <TileLayer
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
                url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <div className="pointer" />
                <LocationMarker></LocationMarker>
                {/* {this.props.map ?
                <DisplayPosition 
                    map={this.props.map}
                    position={this.props.leafletMap.position}
                    oldPosition={this.props.leafletMap.oldPosition}
                    onChangeMapPosition={this.props.onChangeMapPosition}
                ></DisplayPosition> : ''} */}
            </MapContainer >
        
        );
    }
  
}


const mapStateToProps = (state) =>{
    return {
        leafletMap:state.buf.leafletMap,
        map:state.buf.leafletMap.map
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

