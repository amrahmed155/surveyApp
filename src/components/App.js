// npm install --save --save-exact react-scripts@3.4.0


import React,{useState} from "react";
import { v4 } from "uuid";
// import Container from 'react-bootstrap/Container';
import "../style/Form.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './Form';
import Mapcomp from './Map';

 
const App =()=>{


  // const [mapLayers, setMapLayers] = useState([]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  // const [list, setList] = useState([]);
  const [list, setList] = useState([])
  // const points = [...list];

  // const updatecoordinates = (id, lat, lng) => {
  //   points.forEach((coordinate) => {
  //     if (coordinate.id === id) {
  //       coordinate.lat = lat;
  //       coordinate.lng = lng;
  //       setList(points);
  //     }
  //   });
  // };
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