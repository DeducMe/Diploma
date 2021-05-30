import React, { useEffect } from "react";
import { connect } from 'react-redux'
import '../../css/leaflet.css'
import '../../css/geosearch.css'
import L from "leaflet";
import { MapContainer , TileLayer, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import leafletKnn from 'leaflet-knn'
import {testCities} from './testCities'
// import marker icons
delete L.Icon.Default.prototype._getIconUrl;
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
});

function DisplayPosition({onChangeMapPosition}) {
    const map = useMap()
    console.log(searchControl.searchElement.input.value)
    
    const onMove = () => {
        const pos = map.getCenter()
        let gj = L.geoJson(testCities);
        const name = searchControl.searchElement.input.value === '' ? leafletKnn(gj).nearestLayer([pos.lng, pos.lat],1)[0].layer.feature.properties.name : searchControl.searchElement.input.value
        onChangeMapPosition({
            name: name,
            lat:pos.lat,
            lng:pos.lng
        })
        
    }
  
    useEffect(() => {
      map.on('move', onMove)
      map.on('geosearch_showlocation', function (result) {
        L.marker([result.x, result.y]).addTo(map)
      });
      return () => {
        map.off('move', onMove)
      }
    }, [map])

    return ''
  }
  

function findStartPosition(data, map){
    // provider.search({ query: "99 Southwark St, London SE1 0JF, UK" })
    // .then(value => {})
    let lat = data.lat;
    let lng = data.lng;
    let label = data.name;
    let marker = L.marker([lat, lng]).addTo(map)
    marker.bindPopup(label).openPopup();
    map.setView([lat, lng], 13)
}


function LocationMarker() {
    let marker = null
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom())
        if (marker){
          map.removeLayer(marker)
        }
        marker = L.marker(e.latlng).addTo(map)
        marker.bindPopup('Вы здесь').openPopup();
      },
    })
    return ''

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

    const center = (address && address!=='') ? [address.lat, address.lng] : [0, 0];
    console.log(center)
    return (
        <MapContainer 
            style={{ height: "30vh" }}
            center={center}
            zoom="10"
            whenCreated={map=>{
                initMap(map)
                if (address && address!=='') findStartPosition(address, map, onChangeMapPosition)
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

