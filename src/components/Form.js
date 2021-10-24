// npm install --save --save-exact react-scripts@3.4.0


import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import "../style/Form.css";
import "../style/App.css";


const requiredsample = '*';




const Form = ({ lat, lng, list, updateInput, addItem,setList, deleteItem }) => {

  const [feature_address, setfeature_address] = useState('')

  const [feature_name, setfeature_name] = useState('')

  
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

  
  const handleFieldChange=(value, type)=>{
    if (type=='name'){setfeature_name(value);}
    if (type=='address'){setfeature_address(value);}
  }
  const handleFieldSubmit=()=>{
   alert ('data name:'+feature_name+
          '\ndata address :'+feature_address +
          '\ndata coordinate list:'+list)
  }



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
              <input type="text" required  value={feature_name} onChange={item => { handleFieldChange(item.target.value, 'name'); }}></input><br></br>
              <label>العنوان : <span className="required">{requiredsample}</span></label><br></br>
              <input type="text" required value={feature_address} onChange={item => { handleFieldChange(item.target.value, 'address'); }}></input><br></br>

              <div id='morepoints'></div>
              {/* <button type="button" id='addpoint'  onClick={this.sayHello} >إضافة احداثيات اخري</button> */}
              <br></br><br></br>
              <button type="submit" id='submit' onClick={handleFieldSubmit}>submit</button>
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
export default Form;