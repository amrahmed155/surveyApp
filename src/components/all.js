// npm install --save --save-exact react-scripts@3.4.0
import React, { useEffect, useState,useRef ,useMemo } from "react";
import { MapContainer, WMSTileLayer ,TileLayer,LayersControl, Polygon} from "react-leaflet";
import { v4 } from "uuid";
import { Marker, Popup } from "react-leaflet";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import "../style/Form.css";
import "../style/App.css";
const requiredsample = '*';
const {BaseLayer}=LayersControl
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
const Mapcomp =({list,editObj})=> {

  

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

const Form = ({ lat, lng, list, updateInput, addItem,setList, deleteItem }) => {

    const [filename, setfilename] = useState('')
  
    const [filecontent, setfilecontent] = useState('')
  
    const getarrfromtext=e=>{
  
      // let arr=(e.split("\r\n"))
      // arr.forEach(Element=>{
      //     let latlng=Element.split(",");
      //     console.log(latlng)
      //     addItemimport(latlng[0],latlng[1])
      //     // addItem()
      // })
      // return(arr)
      let arr = e.split('\n'); 
      var jsonObj = [];
      var headers = arr[0].split(',');
      for(var i = 1; i < arr.length; i++) {
    if(arr[i].includes(",")){
        var data = arr[i].split(',');
        var obj = {};
        for(var j = 0; j < data.length; j++) {
           obj[headers[j].trim()] = data[j].trim();
        }
        obj['id']=v4();
        jsonObj.push(obj);
      }
      }
      JSON.stringify(jsonObj);
      console.log(jsonObj)
      setList([...jsonObj])
  
    }
    const handlefileChanges = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setfilename(file.name);
        setfilecontent(reader.result)
        
      }
      reader.onloadend=()=>{
        getarrfromtext(reader.result)
      }
      reader.onerror = () => {
        console.log('file error')
      }
  
    }
  
    useEffect(() => {
      // console.log('Listening form: ', list);
    }, [list]);
    // console.log(list)
  
    return (
      <div>
        <div className="testbox entry-form" dir='rtl'>
  
          <Container>
  
            <Row style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: '3rem',
              fontWeight: 'bolder',
            }}
            >
              <form>
                <label>الأسم : <span className="required">{requiredsample}</span></label><br></br>
                <input type="text" required></input><br></br>
                <label>العنوان : <span className="required">{requiredsample}</span></label><br></br>
                <input type="text" required></input><br></br>
  
                <div id='morepoints'></div>
                {/* <button type="button" id='addpoint'  onClick={this.sayHello} >إضافة احداثيات اخري</button> */}
                <br></br><br></br>
                <button type="submit" id='submit'>submit</button>
              </form>
            </Row>
  
            <hr />
            <Row className='coordinates'>
              <Col md={{ span: 12, offset: 4 }}>
  
                <InputGroup className="mb-3">
                  <FormControl
                    type="number"
                    step="any"
                    placeholder="إضافة خط العرض . . . "
                    size="lg"
                    value={lat}
                    onChange={item => updateInput(item.target.value, 'lat')}
                    aria-label="add something"
                    aria-describedby="basic-addon2"
                  />
                  <FormControl
                    type="number"
                    step="any"
                    placeholder="إضافة خط الطول . . . "
                    size="lg"
                    value={lng}
                    onChange={item => { updateInput(item.target.value, 'lng'); }}
                    aria-label="add something"
                    aria-describedby="basic-addon2"
                  />
                  <Button
                    variant="dark"
                    size="lg"
                    onClick={() => addItem()}
                  >
                    إضافة
                  </Button>
                </InputGroup>
  
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 12, offset: 4 }}>
                <ListGroup dir='rtl'>
                  {/* map over and print items */}
                  {list.map(item => {
                    return (
  
                      <ListGroup.Item variant="dark" action key={item.id}
                        onClick={() => deleteItem(item.id)}>
                        <div className='lat'>خط العرض : {item.lat}</div>
                        <div className='lon'>خط الطول : {item.lng} </div>
  
                      </ListGroup.Item>
  
  
                    )
                  })}
                </ListGroup>
  
              </Col>
            </Row>
            <br></br>
            <input type='file' className="custom-file-input" onChange={handlefileChanges}></input>
            <p>{filename}</p>
            <p>{filecontent}</p>
          </Container>
        </div>
      </div>
    );
  
  }
 
const App =()=>{


  // const [mapLayers, setMapLayers] = useState([]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  // const [list, setList] = useState([]);
  const [list, setList] = useState([])

  // Set a user input value
 function updateInput(value,type){
    if (type==='lat')
    {
      setLat (value)
    }
    else if (type==='lng')
    {
        setLng(value)
    }
  }
  
  // Add item if user input in not empty
  function addItem(){
    if(lat !== ''&&lng !== '' ){
      const userInput = {
  
        // Add a random id which is used to delete
        id :  v4(),
        // Add a user value to list
        lat : lat,
        lng : lng

      };
      const newList = [userInput, ...list];

      // Update list
      setList(newList)
      setLng('') 
      setLat('')
      // reset state

         }
  }
  


  function addItemimport(lat,lng){
    if(lat !== ''&&lng !== '' ){
      const userInput = {
  
        // Add a random id which is used to delete
        id :  v4(),
        // Add a user value to list
        lat : lat,
        lng : lng

      };
      const newList = [userInput, ...list];

      // Update list
      setList(newList)
         }
  }
  // Function to delete item from list use id to delete
  function deleteItem(id){
    const removedArr = [...list].filter(element => element.id !== id);

    setList(removedArr);
  
  }
  function editObj(id,lat,lng){
    let newlist= [...list];
    newlist.forEach(element=>{
      if (element.id===id)
      {element.lat=lat;element.lng=lng}
    })
    // console.log(newlist)
    setList(newlist)
    // console.log('id:'+id+'/lat:'+lat+'/lon:'+lng)
  }


  // function printlist(){
  //   console.log(list)
  //   setList(list)
  // }


  return (
    
      <div>
        {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}

        <Form   lat={lat}
                lng={lng} 
                list={list}
                updateInput={updateInput}
                addItem={addItem}
                setList={setList}
                deleteItem={deleteItem}
                > </Form>
      <Mapcomp list={list} editObj={editObj}    name = 'asd'/>
      
    </div>
      

      
);

}
export default App;