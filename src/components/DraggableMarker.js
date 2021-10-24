
import { Marker, Popup } from "react-leaflet";
import React, { useRef ,useMemo} from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


const DraggableMarker = ({ lat, lng, id, index, editObj }) => {
    // const [position, setPosition] = useState({lat: lat,lng: lng, key: index})
    const markerRef = useRef(null)


    const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current
            if (marker != null) {
                
                console.log()
                console.log(marker._icon)

                console.log(marker.options.id+'-'+marker.getLatLng().lat+'-'+marker.getLatLng().lng)
                editObj(marker.options.id, marker.getLatLng().lat, marker.getLatLng().lng)
  
            }
          },
        }),
        [editObj],
      )
    
    return (
        <Marker draggable={true}
            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={[lat, lng]}
            key={id}
            id={id}
        >
            <Popup>
                <span >
                    {index + 1} is for position with lat: {lat} and lng {lng}
                </span>

            </Popup>
        </Marker>

    );

}
export default DraggableMarker;