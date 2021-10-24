// npm install --save --save-exact react-scripts@3.4.0

import React from "react";
import { MapContainer, WMSTileLayer ,TileLayer,LayersControl, Polygon} from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";

import "../style/App.css";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";

import DraggableMarker from './DraggableMarker'
import { Container } from "react-bootstrap";
const {BaseLayer}=LayersControl




const Mapcomp =({list,editObj})=> {

  
  // const _onCreate = (e) => {
  //   console.log(e);

  //   const { layerType, layer } = e;
  //   // if (layerType === "polygon") {
  //     const { _leaflet_id } = layer;

  //     setMapLayers((layers) => [
  //       ...layers,
  //       { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
  //     ]);
  //   // }
  // };

  // const _onEdited = (e) => {
  //   console.log(e);
  //   const {
  //     layers: { _layers },
  //   } = e;

  //   Object.values(_layers).map(({ _leaflet_id, editing }) => {
  //     setMapLayers((layers) =>
  //       layers.map((l) =>
  //         l.id === _leaflet_id
  //           ? { ...l, latlngs: { ...editing.latlngs[0] } }
  //           : l
  //       )
  //     );
  //   });
  // };

  // const _onDeleted = (e) => {
  //   console.log(e);
  //   const {
  //     layers: { _layers },
  //   } = e;

  //   Object.values(_layers).map(({ _leaflet_id }) => {
  //     setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
  //   });
  // };

  return (
    <div>

    <MapContainer center={[30.077042, 31.299364]} zoom={9}>
     <LayersControl>
     <BaseLayer checked name='here' >
        <TileLayer 
          url="https://2.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png?apiKey=x13yMxvFSo8FIKFDDTnQaJ57Gakt11ZaIyqIctoSD3Y" 
          attribution='&copy; <a href="http://here.org/copyright">here</a> contributors'
        />
       </BaseLayer>
       <BaseLayer  name=' nasa' >
        <TileLayer 
          url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg" 
          attribution='&copy; <a href="http://here.org/copyright">here</a> contributors'
          maxNativeZoom={8}
        />
       </BaseLayer>
       <BaseLayer  name=' arc' >
        <TileLayer 
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" 
          attribution='&copy; <a href="http://here.org/copyright">here</a> contributors'
          maxNativeZoom={8}
        />
       </BaseLayer>
       <BaseLayer  name='mainmap'>
        <WMSTileLayer 
          url="http://10.100.100.47/erdas-apollo/vector/BASEMAP?" 
          layers={'waterbody_poly,agri_area,bridge_tunnel_line,elevation_point,geodesic_point,ports_airports_line,ports_airports_poly,railway_point,topography_poly,transportation_point,transportation_poly,building,contour,agri_line,agri_point,landmark_point,railway_line,railway_poly,roads_line,fence_line,utilities_line,utilities_point,utilities_poly,waterbody_line,waterbody_point'}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
       </BaseLayer>
       </LayersControl>
       {/* <FeatureGroup>
                <EditControl
                  // position="topright"
                  // onCreated={_onCreate}
                  // onEdited={_onEdited}
                  // onDeleted={_onDeleted}
                  draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                  }}
                />
              </FeatureGroup> */}

      <Container>
        
        <Polygon color={'green'} positions={list} />
        
          {list.map(({ lat, lng ,id}, index) => (
            <DraggableMarker key={index} lat={lat} lng={lng} id={id} index={index} list={list} editObj={editObj} />
          ))}
        </Container>
        

    </MapContainer>
</div>
  
  );

}
export default Mapcomp;